import type { Editor } from "obsidian";
import { Notice } from "obsidian";
import { parseQuickInput, type QuickInputSuggestion } from "../core/quickInput";
import { wrapLatex } from "../core/insert";
import type ScienceInputHelperPlugin from "../main";
import type { InsertMode } from "../types";

export class QuickInputController {
  private readonly plugin: ScienceInputHelperPlugin;
  private rootEl: HTMLElement | null = null;
  private inputEl: HTMLInputElement | null = null;
  private labelEl: HTMLElement | null = null;
  private previewTitleEl: HTMLElement | null = null;
  private previewEl: HTMLElement | null = null;
  private suggestionEl: HTMLElement | null = null;
  private statusEl: HTMLElement;
  private editor: Editor | null = null;
  private suggestions: QuickInputSuggestion[] = [];
  private selectedSuggestionIndex = -1;
  private readonly focusHotkeyHandler = (event: KeyboardEvent) => this.handleFocusHotkey(event);

  constructor(plugin: ScienceInputHelperPlugin) {
    this.plugin = plugin;
    this.statusEl = plugin.addStatusBarItem();
    this.statusEl.addClass("science-input-helper-status");
    this.statusEl.hide();
  }

  isOpen(): boolean {
    return Boolean(this.rootEl);
  }

  toggle(editor: Editor): void {
    if (this.isOpen()) {
      this.close();
      return;
    }

    this.open(editor);
  }

  toggleFocus(): void {
    if (!this.inputEl || !this.editor) {
      return;
    }

    if (document.activeElement === this.inputEl) {
      this.editor.focus();
      this.statusEl.setText("Science Input: 正文");
      return;
    }

    this.inputEl.focus();
    this.statusEl.setText("Science Input: 输入框");
  }

  open(editor: Editor): void {
    this.close();
    this.editor = editor;
    const selectedText = editor.getSelection().trim();

    this.rootEl = document.body.createDiv({ cls: "science-input-helper-quick" });

    const headerEl = this.rootEl.createDiv({ cls: "science-input-helper-quick-header" });
    headerEl.createSpan({ text: "Science Input" });
    headerEl.createSpan({ text: "Enter 插入 · Tab 候选 · Esc 退出" });
    this.enableDragging(headerEl);

    this.inputEl = this.rootEl.createEl("input", {
      type: "text",
      cls: "science-input-helper-quick-input"
    });
    this.inputEl.placeholder = "输入理科表达式、中文符号或模板关键词";
    this.inputEl.value = selectedText;

    this.labelEl = this.rootEl.createDiv({ cls: "science-input-helper-quick-label" });
    this.previewTitleEl = this.rootEl.createDiv({
      cls: "science-input-helper-quick-preview-title",
      text: "插入前预览"
    });
    this.previewEl = this.rootEl.createDiv({ cls: "science-input-helper-quick-preview" });
    this.suggestionEl = this.rootEl.createDiv({ cls: "science-input-helper-quick-suggestions" });

    this.inputEl.addEventListener("input", () => {
      this.selectedSuggestionIndex = -1;
      this.renderPreview();
    });
    this.inputEl.addEventListener("keydown", (event) => this.handleKeyDown(event));
    document.addEventListener("keydown", this.focusHotkeyHandler, true);

    this.statusEl.setText("Science Input: 输入框");
    this.statusEl.show();
    this.positionRoot(editor);
    this.renderPreview();
    this.inputEl.focus();
    this.inputEl.select();
  }

  close(): void {
    document.removeEventListener("keydown", this.focusHotkeyHandler, true);
    this.rootEl?.remove();
    this.rootEl = null;
    this.inputEl = null;
    this.labelEl = null;
    this.previewTitleEl = null;
    this.previewEl = null;
    this.suggestionEl = null;
    this.editor = null;
    this.suggestions = [];
    this.selectedSuggestionIndex = -1;
    this.statusEl.hide();
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (event.key === "Escape") {
      event.preventDefault();
      this.close();
      return;
    }

    if (event.key === "Tab") {
      event.preventDefault();
      this.selectSuggestion(event.shiftKey ? -1 : 1);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      this.moveSuggestion(1);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      this.moveSuggestion(-1);
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      this.insert(event.ctrlKey || event.metaKey ? "block" : "inline");
    }
  }

  private handleFocusHotkey(event: KeyboardEvent): void {
    if (!this.isOpen() || !matchesHotkey(event, this.plugin.settings.quickInputFocusHotkey)) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    this.toggleFocus();
  }

  private insert(mode: InsertMode): void {
    if (!this.editor || !this.inputEl) {
      return;
    }

    const result = parseQuickInput(this.inputEl.value, this.plugin.settings);
    if (!result.latex.trim()) {
      new Notice("没有可插入的内容。");
      return;
    }

    this.plugin.insertLatexIntoEditor(
      this.editor,
      result.latex,
      result.outputFormat === "text" ? "raw" : mode
    );

    if (this.plugin.settings.quickInputKeepOpen) {
      this.inputEl.value = "";
      this.selectedSuggestionIndex = -1;
      this.renderPreview();
      this.inputEl.focus();
      return;
    }

    this.close();
  }

  private renderPreview(): void {
    if (!this.inputEl || !this.labelEl || !this.previewTitleEl || !this.previewEl || !this.suggestionEl) {
      return;
    }

    const result = parseQuickInput(this.inputEl.value, this.plugin.settings);
    this.suggestions = result.suggestions.slice(0, 5);
    if (this.suggestions.length === 0) {
      this.selectedSuggestionIndex = -1;
    } else if (this.selectedSuggestionIndex >= this.suggestions.length) {
      this.selectedSuggestionIndex = this.suggestions.length - 1;
    }

    this.labelEl.setText(result.label);
    this.previewTitleEl.setText(result.kind === "help" ? "前缀帮助" : "插入前预览");
    this.previewEl.setText(result.latex ? previewOutput(result.latex, result.outputFormat) : "");
    this.suggestionEl.empty();

    if (result.helpLines?.length) {
      for (const line of result.helpLines) {
        this.suggestionEl.createDiv({
          cls: "science-input-helper-quick-help-line",
          text: line
        });
      }
      return;
    }

    this.suggestions.forEach((suggestion, index) => {
      const item = this.suggestionEl!.createDiv({ cls: "science-input-helper-quick-suggestion" });
      if (index === this.selectedSuggestionIndex) {
        item.addClass("is-selected");
      }

      item.createSpan({ text: `${suggestion.title} · ${suggestion.detail}` });
      item.createSpan({ text: suggestion.latex });
      item.addEventListener("mousedown", (event) => {
        event.preventDefault();
        this.applySuggestion(index);
      });
    });
  }

  private moveSuggestion(delta: number): void {
    if (this.suggestions.length === 0) {
      return;
    }

    const current = this.selectedSuggestionIndex < 0 ? 0 : this.selectedSuggestionIndex;
    this.selectedSuggestionIndex = wrapIndex(current + delta, this.suggestions.length);
    this.renderPreview();
  }

  private selectSuggestion(delta: number): void {
    if (this.suggestions.length === 0) {
      return;
    }

    if (this.selectedSuggestionIndex < 0) {
      this.applySuggestion(delta > 0 ? 0 : this.suggestions.length - 1);
      return;
    }

    this.applySuggestion(this.selectedSuggestionIndex);
  }

  private applySuggestion(index: number): void {
    if (!this.inputEl) {
      return;
    }

    const suggestion = this.suggestions[index];
    if (!suggestion) {
      return;
    }

    this.inputEl.value = suggestion.replacement ?? suggestion.title;
    this.selectedSuggestionIndex = index;
    this.renderPreview();
    this.inputEl.focus();
  }

  private positionRoot(editor: Editor): void {
    if (!this.rootEl) {
      return;
    }

    const width = 460;
    const saved = this.plugin.settings.quickInputPosition;
    const rect = saved ?? getInitialPosition(editor, width);
    const left = clamp(rect.left, 16, window.innerWidth - width - 16);
    const top = clamp(rect.top, 48, window.innerHeight - 180);

    this.rootEl.style.left = `${left}px`;
    this.rootEl.style.top = `${top}px`;
    this.rootEl.style.width = `${width}px`;
  }

  private enableDragging(headerEl: HTMLElement): void {
    headerEl.addClass("is-draggable");

    headerEl.addEventListener("mousedown", (event) => {
      if (!this.rootEl) {
        return;
      }

      event.preventDefault();
      const startX = event.clientX;
      const startY = event.clientY;
      const startLeft = this.rootEl.offsetLeft;
      const startTop = this.rootEl.offsetTop;

      const onMouseMove = (moveEvent: MouseEvent) => {
        if (!this.rootEl) {
          return;
        }

        const left = clamp(startLeft + moveEvent.clientX - startX, 16, window.innerWidth - this.rootEl.offsetWidth - 16);
        const top = clamp(startTop + moveEvent.clientY - startY, 48, window.innerHeight - this.rootEl.offsetHeight - 16);
        this.rootEl.style.left = `${left}px`;
        this.rootEl.style.top = `${top}px`;
      };

      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);

        if (!this.rootEl) {
          return;
        }

        this.plugin.settings.quickInputPosition = {
          left: this.rootEl.offsetLeft,
          top: this.rootEl.offsetTop
        };
        void this.plugin.saveSettings();
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });
  }
}

function getInitialPosition(editor: Editor, width: number): { left: number; top: number } {
  const cursorRect = getEditorCursorRect(editor);
  return {
    left: clamp(cursorRect.left, 16, window.innerWidth - width - 16),
    top: clamp(cursorRect.bottom + 10, 64, window.innerHeight - 220)
  };
}

function previewOutput(value: string, outputFormat: string): string {
  return outputFormat === "text" ? value : wrapLatex(value, "inline");
}

function getEditorCursorRect(editor: Editor): DOMRect {
  const cm = (editor as unknown as { cm?: { coordsAtPos?: (pos: number) => DOMRect | null } }).cm;

  if (cm?.coordsAtPos) {
    const rect = cm.coordsAtPos(editor.posToOffset(editor.getCursor()));
    if (rect) {
      return rect;
    }
  }

  return new DOMRect(Math.max(16, window.innerWidth / 2 - 230), 120, 0, 24);
}

function matchesHotkey(event: KeyboardEvent, hotkey: string): boolean {
  if (!hotkey) {
    return false;
  }

  const parts = hotkey.split("+");
  const key = parts[parts.length - 1].toLowerCase();
  const wantsCtrl = parts.includes("Ctrl");
  const wantsShift = parts.includes("Shift");
  const wantsAlt = parts.includes("Alt");
  const wantsMeta = parts.includes("Meta");
  const actualKey = normalizeKey(event.key);

  return (
    actualKey === key &&
    event.ctrlKey === wantsCtrl &&
    event.shiftKey === wantsShift &&
    event.altKey === wantsAlt &&
    event.metaKey === wantsMeta
  );
}

function normalizeKey(key: string): string {
  if (key === " ") {
    return "space";
  }

  return key.toLowerCase();
}

function wrapIndex(index: number, length: number): number {
  return (index + length) % length;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(value, max));
}
