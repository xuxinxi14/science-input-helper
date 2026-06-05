export type InsertMode = "inline" | "block" | "raw";

export type TemplateCategory = "physics" | "chemistry" | "biochemistry";

export type GreekOutputMode = "latex" | "unicode";

export interface ScienceInputHelperSettings {
  defaultInsertMode: InsertMode;
  openPanelOnStartup: boolean;
  defaultTemplateCategory: TemplateCategory | "all";
  quickInputKeepOpen: boolean;
  quickInputFocusHotkey: string;
  quickInputPosition: {
    left: number;
    top: number;
  } | null;
  enableGreekLetterHelper: boolean;
  greekOutputMode: GreekOutputMode;
  includeVariantGreekLetters: boolean;
  showAllGreekLettersForKeyword: boolean;
}

export interface ScienceTemplate {
  id: string;
  category: TemplateCategory;
  title: string;
  aliases: string[];
  latex: string;
}
