import { App, SuggestModal } from "obsidian";
import { searchTemplates } from "../core/templates";
import type { ScienceTemplate, TemplateCategory } from "../types";

export class TemplateSearchModal extends SuggestModal<ScienceTemplate> {
  private readonly category: TemplateCategory | "all";
  private readonly onChoose: (template: ScienceTemplate) => void;

  constructor(
    app: App,
    onChoose: (template: ScienceTemplate) => void,
    category: TemplateCategory | "all" = "all"
  ) {
    super(app);
    this.category = category;
    this.onChoose = onChoose;
    this.setPlaceholder("输入关键词，例如：牛顿第二定律、pH、ATP水解");
  }

  getSuggestions(query: string): ScienceTemplate[] {
    return searchTemplates(query, {
      category: this.category,
      limit: 20
    });
  }

  renderSuggestion(template: ScienceTemplate, el: HTMLElement): void {
    el.createEl("div", {
      text: `${template.title} · ${categoryLabel(template.category)}`,
      cls: "suggestion-title"
    });
    el.createEl("div", {
      text: template.latex,
      cls: "suggestion-note"
    });
  }

  onChooseSuggestion(template: ScienceTemplate): void {
    this.onChoose(template);
  }
}

function categoryLabel(category: TemplateCategory): string {
  if (category === "physics") {
    return "物理";
  }

  if (category === "chemistry") {
    return "化学";
  }

  return "生物化学";
}
