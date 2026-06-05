import { ItemView, WorkspaceLeaf } from "obsidian";
import { convertChemicalFormula } from "../core/chemicalFormula";
import { searchTemplates } from "../core/templates";
import { formatUnitExpression } from "../core/unitFormatter";
import type ScienceInputHelperPlugin from "../main";
import type { InsertMode, ScienceTemplate, TemplateCategory } from "../types";

export const VIEW_TYPE_SCIENCE_PANEL = "science-input-helper-panel";

export class SciencePanelView extends ItemView {
  private readonly plugin: ScienceInputHelperPlugin;

  constructor(leaf: WorkspaceLeaf, plugin: ScienceInputHelperPlugin) {
    super(leaf);
    this.plugin = plugin;
  }

  getViewType(): string {
    return VIEW_TYPE_SCIENCE_PANEL;
  }

  getDisplayText(): string {
    return "Science Panel";
  }

  getIcon(): string {
    return "flask-conical";
  }

  async onOpen(): Promise<void> {
    this.render();
  }

  async onClose(): Promise<void> {
    this.containerEl.empty();
  }

  private render(): void {
    const root = this.containerEl.children[1] as HTMLElement;
    root.empty();
    root.addClass("science-input-helper-panel");

    root.createEl("h2", { text: "Science Input Helper" });

    const modeSelect = this.createModeSelect(root);
    this.renderChemicalConverter(root, modeSelect);
    this.renderUnitFormatter(root, modeSelect);
    this.renderTemplateSearch(root, modeSelect);
  }

  private createModeSelect(root: HTMLElement): HTMLSelectElement {
    const row = root.createDiv({ cls: "science-input-helper-row" });
    row.createEl("span", { text: "插入" });

    const select = row.createEl("select");
    addOption(select, "inline", "行内");
    addOption(select, "block", "块");
    addOption(select, "raw", "Raw");
    select.value = this.plugin.settings.defaultInsertMode;

    return select;
  }

  private renderChemicalConverter(root: HTMLElement, modeSelect: HTMLSelectElement): void {
    root.createEl("h3", { text: "化学式" });

    const inputRow = root.createDiv({ cls: "science-input-helper-row" });
    const input = inputRow.createEl("input");
    input.type = "text";
    input.placeholder = "H2SO4, Ca2+ + CO3 2-";

    const insertButton = inputRow.createEl("button", { text: "插入" });
    insertButton.type = "button";

    const preview = root.createDiv({ cls: "science-input-helper-result-latex" });
    const updatePreview = () => {
      preview.setText(input.value.trim() ? convertChemicalFormula(input.value) : "");
    };

    input.addEventListener("input", updatePreview);
    insertButton.addEventListener("click", () => {
      const latex = convertChemicalFormula(input.value);
      this.plugin.insertIntoActiveEditor(latex, modeSelect.value as InsertMode);
    });
  }

  private renderUnitFormatter(root: HTMLElement, modeSelect: HTMLSelectElement): void {
    root.createEl("h3", { text: "单位" });

    const inputRow = root.createDiv({ cls: "science-input-helper-row" });
    const input = inputRow.createEl("input");
    input.type = "text";
    input.placeholder = "9.8m/s2, 6.02e23 mol-1";

    const insertButton = inputRow.createEl("button", { text: "插入" });
    insertButton.type = "button";

    const preview = root.createDiv({ cls: "science-input-helper-result-latex" });
    const updatePreview = () => {
      preview.setText(input.value.trim() ? formatUnitExpression(input.value) : "");
    };

    input.addEventListener("input", updatePreview);
    insertButton.addEventListener("click", () => {
      const latex = formatUnitExpression(input.value);
      this.plugin.insertIntoActiveEditor(latex, modeSelect.value as InsertMode);
    });
  }

  private renderTemplateSearch(root: HTMLElement, modeSelect: HTMLSelectElement): void {
    root.createEl("h3", { text: "模板" });

    const controls = root.createDiv({ cls: "science-input-helper-row" });
    const categorySelect = controls.createEl("select");
    addOption(categorySelect, "all", "全部");
    addOption(categorySelect, "physics", "物理");
    addOption(categorySelect, "chemistry", "化学");
    addOption(categorySelect, "biochemistry", "生物化学");
    categorySelect.value = this.plugin.settings.defaultTemplateCategory;

    const input = controls.createEl("input");
    input.type = "text";
    input.placeholder = "牛顿第二定律, pH, G6P";

    const resultsEl = root.createDiv();
    const renderResults = () => {
      const results = searchTemplates(input.value, {
        category: categorySelect.value as TemplateCategory | "all",
        limit: 10
      });
      this.renderTemplateResults(resultsEl, results, modeSelect.value as InsertMode);
    };

    input.addEventListener("input", renderResults);
    categorySelect.addEventListener("change", renderResults);
    renderResults();
  }

  private renderTemplateResults(resultsEl: HTMLElement, results: ScienceTemplate[], mode: InsertMode): void {
    resultsEl.empty();

    for (const template of results) {
      const item = resultsEl.createDiv({ cls: "science-input-helper-result" });
      item.createDiv({
        cls: "science-input-helper-result-title",
        text: template.title
      });
      item.createDiv({
        cls: "science-input-helper-result-latex",
        text: template.latex
      });

      const buttons = item.createDiv({ cls: "science-input-helper-buttons" });
      const insertButton = buttons.createEl("button", { text: "插入" });
      insertButton.type = "button";
      insertButton.addEventListener("click", () => {
        this.plugin.insertIntoActiveEditor(template.latex, mode);
      });
    }
  }
}

function addOption(select: HTMLSelectElement, value: string, label: string): void {
  const option = select.createEl("option", { text: label });
  option.value = value;
}
