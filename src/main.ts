import { Editor, MarkdownView, Notice, Plugin } from "obsidian";
import {
  convertSlashToFraction,
  wrapAsSubscript,
  wrapAsSuperscript,
  wrapWithAbsoluteValue,
  wrapWithBraces,
  wrapWithBrackets,
  wrapWithNorm,
  wrapWithNthRoot,
  wrapWithOverrightarrow,
  wrapWithParentheses,
  wrapWithSqrt,
  wrapWithVector
} from "./converters/mathStructureConverter";
import { convertChemicalFormula } from "./core/chemicalFormula";
import { wrapLatex } from "./core/insert";
import { formatUnitExpression } from "./core/unitFormatter";
import { createScienceInputExtension } from "./editor/scienceExtension";
import { DEFAULT_SETTINGS, ScienceInputSettingTab } from "./settings";
import { SciencePanelView, VIEW_TYPE_SCIENCE_PANEL } from "./ui/SciencePanelView";
import { QuickInputController } from "./ui/QuickInputController";
import { TemplateSearchModal } from "./ui/TemplateSearchModal";
import { TextInputModal } from "./ui/TextInputModal";
import {
  cursorInsideFirstEmptyBraces,
  cursorInsideLastEmptyBraces,
  replaceSelectionWithGenerated
} from "./utils/selectionTransform";
import type { InsertMode, ScienceInputHelperSettings, TemplateCategory } from "./types";

type TextConverter = (input: string) => string;

export default class ScienceInputHelperPlugin extends Plugin {
  settings: ScienceInputHelperSettings = DEFAULT_SETTINGS;
  private quickInput: QuickInputController | null = null;

  async onload(): Promise<void> {
    await this.loadSettings();
    this.quickInput = new QuickInputController(this);

    this.registerView(
      VIEW_TYPE_SCIENCE_PANEL,
      (leaf) => new SciencePanelView(leaf, this)
    );

    this.registerEditorExtension(
      createScienceInputExtension(() => this.settings.defaultInsertMode)
    );

    this.addRibbonIcon("flask-conical", "Science Input Helper", () => {
      this.toggleQuickInputFromActiveEditor();
    });

    this.addCommands();
    this.addSettingTab(new ScienceInputSettingTab(this.app, this));

    if (this.settings.openPanelOnStartup) {
      this.app.workspace.onLayoutReady(() => {
        void this.activatePanel();
      });
    }
  }

  onunload(): void {
    this.quickInput?.close();
    this.app.workspace.detachLeavesOfType(VIEW_TYPE_SCIENCE_PANEL);
  }

  async loadSettings(): Promise<void> {
    this.settings = {
      ...DEFAULT_SETTINGS,
      ...(await this.loadData())
    };
  }

  async saveSettings(): Promise<void> {
    await this.saveData(this.settings);
  }

  insertIntoActiveEditor(latex: string, mode: InsertMode): void {
    const editor = this.getActiveEditor();

    if (!editor) {
      new Notice("未找到可插入的 Markdown 编辑器。");
      return;
    }

    this.insertLatexIntoEditor(editor, latex, mode);
  }

  insertLatexIntoEditor(editor: Editor, latex: string, mode: InsertMode): void {
    if (!latex.trim()) {
      new Notice("没有可插入的内容。");
      return;
    }

    editor.replaceSelection(wrapLatex(latex, mode));
    editor.focus();
  }

  async activatePanel(): Promise<void> {
    const existingLeaf = this.app.workspace.getLeavesOfType(VIEW_TYPE_SCIENCE_PANEL)[0];

    if (existingLeaf) {
      this.app.workspace.revealLeaf(existingLeaf);
      return;
    }

    const leaf = this.app.workspace.getRightLeaf(false);
    if (!leaf) {
      new Notice("无法打开 Science Panel。");
      return;
    }

    await leaf.setViewState({
      type: VIEW_TYPE_SCIENCE_PANEL,
      active: true
    });
    this.app.workspace.revealLeaf(leaf);
  }

  private addCommands(): void {
    this.addCommand({
      id: "toggle-science-input-mode",
      name: "Science Input Helper: Toggle quick input",
      hotkeys: [
        {
          modifiers: ["Ctrl", "Shift"],
          key: "Q"
        }
      ],
      editorCallback: (editor) => {
        this.quickInput?.toggle(editor);
      }
    });

    this.addCommand({
      id: "toggle-science-input-focus",
      name: "Science Input Helper: Toggle quick input focus",
      callback: () => {
        this.quickInput?.toggleFocus();
      }
    });

    this.addCommand({
      id: "open-science-panel",
      name: "Science Input Helper: Open Science Panel",
      callback: () => {
        void this.activatePanel();
      }
    });

    this.addCommand({
      id: "convert-chemical-inline",
      name: "Science Input Helper: Convert chemical formula to inline math",
      editorCallback: (editor) => {
        this.convertSelectionOrPrompt(
          editor,
          "转换化学式",
          "H2SO4 或 Ca2+ + CO3 2-",
          "插入行内公式",
          convertChemicalFormula,
          "inline"
        );
      }
    });

    this.addCommand({
      id: "convert-chemical-block",
      name: "Science Input Helper: Convert chemical formula to block math",
      editorCallback: (editor) => {
        this.convertSelectionOrPrompt(
          editor,
          "转换化学式",
          "H2SO4 或 Ca2+ + CO3 2-",
          "插入块公式",
          convertChemicalFormula,
          "block"
        );
      }
    });

    this.addCommand({
      id: "format-unit-inline",
      name: "Science Input Helper: Format unit to inline math",
      editorCallback: (editor) => {
        this.convertSelectionOrPrompt(
          editor,
          "格式化单位",
          "9.8m/s2 或 6.02e23 mol-1",
          "插入行内公式",
          formatUnitExpression,
          "inline"
        );
      }
    });

    this.addCommand({
      id: "format-unit-block",
      name: "Science Input Helper: Format unit to block math",
      editorCallback: (editor) => {
        this.convertSelectionOrPrompt(
          editor,
          "格式化单位",
          "9.8m/s2 或 6.02e23 mol-1",
          "插入块公式",
          formatUnitExpression,
          "block"
        );
      }
    });

    this.addTemplateCommand("search-template-inline", "Science Input Helper: Search template and insert inline math", "inline");
    this.addTemplateCommand("search-template-block", "Science Input Helper: Search template and insert block math", "block");
    this.addTemplateCommand(
      "search-physics-template",
      "Science Input Helper: Search physics formula template",
      "default",
      "physics"
    );
    this.addTemplateCommand(
      "search-chemistry-template",
      "Science Input Helper: Search chemistry formula template",
      "default",
      "chemistry"
    );
    this.addTemplateCommand(
      "search-biochemistry-template",
      "Science Input Helper: Search biochemistry expression template",
      "default",
      "biochemistry"
    );

    this.addMathStructureCommands();
  }

  private addMathStructureCommands(): void {
    this.addCommand({
      id: "wrap-selection-sqrt",
      name: "Science Input Helper: Wrap selection with square root",
      editorCallback: (editor) => {
        replaceSelectionWithGenerated(editor, (selection) => {
          const text = wrapWithSqrt(selection);
          return {
            text,
            cursorOffset: selection ? undefined : cursorInsideFirstEmptyBraces(text)
          };
        });
      }
    });

    this.addCommand({
      id: "wrap-selection-nth-root",
      name: "Science Input Helper: Wrap selection with nth root",
      editorCallback: (editor) => {
        replaceSelectionWithGenerated(editor, (selection) => {
          const text = wrapWithNthRoot(selection, "n");
          return {
            text,
            cursorOffset: "\\sqrt[".length
          };
        });
      }
    });

    this.addCommand({
      id: "wrap-selection-fraction-numerator",
      name: "Science Input Helper: Wrap selection as fraction numerator",
      editorCallback: (editor) => {
        replaceSelectionWithGenerated(editor, (selection) => {
          const text = `\\frac{${selection}}{}`;
          return {
            text,
            cursorOffset: selection ? cursorInsideLastEmptyBraces(text) : cursorInsideFirstEmptyBraces(text)
          };
        });
      }
    });

    this.addCommand({
      id: "convert-slash-expression-to-fraction",
      name: "Science Input Helper: Convert slash expression to fraction",
      editorCallback: (editor) => {
        const selected = editor.getSelection();
        const converted = convertSlashToFraction(selected);

        if (!selected.trim() || !converted) {
          new Notice("请先选中形如 A / B 的表达式。");
          return;
        }

        replaceSelectionWithGenerated(editor, () => ({ text: converted }));
      }
    });

    this.addMathUnaryCommand(
      "wrap-selection-parentheses",
      "Science Input Helper: Wrap selection with parentheses",
      wrapWithParentheses,
      (text) => cursorBeforeRightDelimiter(text)
    );
    this.addMathUnaryCommand(
      "wrap-selection-brackets",
      "Science Input Helper: Wrap selection with brackets",
      wrapWithBrackets,
      (text) => cursorBeforeRightDelimiter(text)
    );
    this.addMathUnaryCommand(
      "wrap-selection-braces",
      "Science Input Helper: Wrap selection with braces",
      wrapWithBraces,
      (text) => cursorBeforeRightDelimiter(text)
    );
    this.addMathUnaryCommand(
      "wrap-selection-absolute-value",
      "Science Input Helper: Wrap selection with absolute value",
      wrapWithAbsoluteValue,
      (text) => cursorBeforeRightDelimiter(text)
    );
    this.addMathUnaryCommand(
      "wrap-selection-norm",
      "Science Input Helper: Wrap selection with norm",
      wrapWithNorm,
      (text) => cursorBeforeRightDelimiter(text)
    );
    this.addMathUnaryCommand(
      "wrap-selection-vector",
      "Science Input Helper: Wrap selection with vector",
      wrapWithVector,
      cursorInsideFirstEmptyBraces
    );
    this.addMathUnaryCommand(
      "wrap-selection-overrightarrow",
      "Science Input Helper: Wrap selection with overrightarrow",
      wrapWithOverrightarrow,
      cursorInsideFirstEmptyBraces
    );
    this.addMathUnaryCommand(
      "wrap-selection-superscript",
      "Science Input Helper: Wrap selection as superscript",
      wrapAsSuperscript,
      cursorInsideFirstEmptyBraces
    );
    this.addMathUnaryCommand(
      "wrap-selection-subscript",
      "Science Input Helper: Wrap selection as subscript",
      wrapAsSubscript,
      cursorInsideFirstEmptyBraces
    );
  }

  private addMathUnaryCommand(
    id: string,
    name: string,
    converter: (input: string) => string,
    emptyCursorOffset: (text: string) => number
  ): void {
    this.addCommand({
      id,
      name,
      editorCallback: (editor) => {
        replaceSelectionWithGenerated(editor, (selection) => {
          const text = converter(selection);
          return {
            text,
            cursorOffset: selection ? undefined : emptyCursorOffset(text)
          };
        });
      }
    });
  }

  private addTemplateCommand(
    id: string,
    name: string,
    mode: InsertMode | "default",
    category?: TemplateCategory
  ): void {
    this.addCommand({
      id,
      name,
      editorCallback: (editor) => {
        const insertMode = mode === "default" ? this.settings.defaultInsertMode : mode;
        this.openTemplateSearch(editor, insertMode, category);
      }
    });
  }

  private openTemplateSearch(editor: Editor, mode: InsertMode, category?: TemplateCategory): void {
    new TemplateSearchModal(
      this.app,
      (template) => this.insertLatexIntoEditor(editor, template.latex, mode),
      category ?? this.settings.defaultTemplateCategory
    ).open();
  }

  private convertSelectionOrPrompt(
    editor: Editor,
    title: string,
    placeholder: string,
    submitLabel: string,
    converter: TextConverter,
    mode: InsertMode
  ): void {
    const selectedText = editor.getSelection();

    if (selectedText.trim()) {
      this.insertLatexIntoEditor(editor, converter(selectedText), mode);
      return;
    }

    new TextInputModal(this.app, {
      title,
      placeholder,
      submitLabel,
      onSubmit: (value) => this.insertLatexIntoEditor(editor, converter(value), mode)
    }).open();
  }

  private getActiveEditor(): Editor | null {
    return this.app.workspace.getActiveViewOfType(MarkdownView)?.editor ?? null;
  }

  private toggleQuickInputFromActiveEditor(): void {
    const editor = this.getActiveEditor();

    if (!editor) {
      new Notice("未找到可插入的 Markdown 编辑器。");
      return;
    }

    this.quickInput?.toggle(editor);
  }
}

function cursorBeforeRightDelimiter(text: string): number {
  const index = text.indexOf("\\right");
  return index >= 0 ? index : text.length;
}
