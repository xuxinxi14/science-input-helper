import { App, PluginSettingTab, Setting } from "obsidian";
import type ScienceInputHelperPlugin from "./main";
import type { GreekOutputMode, InsertMode, ScienceInputHelperSettings, TemplateCategory } from "./types";

export const DEFAULT_SETTINGS: ScienceInputHelperSettings = {
  defaultInsertMode: "inline",
  openPanelOnStartup: false,
  defaultTemplateCategory: "all",
  quickInputKeepOpen: true,
  quickInputFocusHotkey: "Ctrl+J",
  quickInputPosition: null,
  enableGreekLetterHelper: true,
  greekOutputMode: "latex",
  includeVariantGreekLetters: true,
  showAllGreekLettersForKeyword: true
};

export class ScienceInputSettingTab extends PluginSettingTab {
  private readonly plugin: ScienceInputHelperPlugin;

  constructor(app: App, plugin: ScienceInputHelperPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl("h2", { text: "Science Input Helper" });

    new Setting(containerEl)
      .setName("默认插入方式")
      .setDesc("控制搜索弹窗、右侧面板和 CodeMirror 选区快捷转换的默认包裹格式。")
      .addDropdown((dropdown) => {
        dropdown
          .addOption("inline", "行内公式 $...$")
          .addOption("block", "块公式 $$...$$")
          .addOption("raw", "仅 LaTeX 内容")
          .setValue(this.plugin.settings.defaultInsertMode)
          .onChange(async (value) => {
            this.plugin.settings.defaultInsertMode = value as InsertMode;
            await this.plugin.saveSettings();
          });
      });

    new Setting(containerEl)
      .setName("默认模板分类")
      .setDesc("控制模板搜索默认覆盖的学科范围。")
      .addDropdown((dropdown) => {
        dropdown
          .addOption("all", "全部")
          .addOption("physics", "物理")
          .addOption("chemistry", "化学")
          .addOption("biochemistry", "生物化学")
          .setValue(this.plugin.settings.defaultTemplateCategory)
          .onChange(async (value) => {
            this.plugin.settings.defaultTemplateCategory = value as TemplateCategory | "all";
            await this.plugin.saveSettings();
          });
      });

    new Setting(containerEl)
      .setName("启动时打开右侧面板")
      .setDesc("打开 Obsidian 后自动显示 Science Panel。")
      .addToggle((toggle) => {
        toggle
          .setValue(this.plugin.settings.openPanelOnStartup)
          .onChange(async (value) => {
            this.plugin.settings.openPanelOnStartup = value;
            await this.plugin.saveSettings();
          });
      });

    new Setting(containerEl)
      .setName("快速输入后保持模式")
      .setDesc("开启后，Enter 插入公式后会清空输入框并继续等待下一次输入。关闭后，插入一次即退出快速输入模式。")
      .addToggle((toggle) => {
        toggle
          .setValue(this.plugin.settings.quickInputKeepOpen)
          .onChange(async (value) => {
            this.plugin.settings.quickInputKeepOpen = value;
            await this.plugin.saveSettings();
          });
      });

    new Setting(containerEl)
      .setName("快速切换焦点快捷键")
      .setDesc("快速输入框打开时，用这个快捷键在输入框和正文编辑区之间切换焦点。也可以在 Hotkeys 里绑定 Toggle Science Input Focus 命令。")
      .addDropdown((dropdown) => {
        dropdown
          .addOption("", "关闭")
          .addOption("Ctrl+J", "Ctrl + J")
          .addOption("Ctrl+;", "Ctrl + ;")
          .addOption("Ctrl+Shift+Space", "Ctrl + Shift + Space")
          .addOption("Ctrl+Alt+Space", "Ctrl + Alt + Space")
          .addOption("Alt+`", "Alt + `")
          .setValue(this.plugin.settings.quickInputFocusHotkey)
          .onChange(async (value) => {
            this.plugin.settings.quickInputFocusHotkey = value;
            await this.plugin.saveSettings();
          });
      });

    new Setting(containerEl)
      .setName("重置快速输入框位置")
      .setDesc("如果拖动后位置不合适，可以恢复到光标附近弹出。")
      .addButton((button) => {
        button
          .setButtonText("重置")
          .onClick(async () => {
            this.plugin.settings.quickInputPosition = null;
            await this.plugin.saveSettings();
          });
      });

    new Setting(containerEl)
      .setName("Enable Greek letter helper")
      .setDesc("在快速输入模式中启用希腊字母搜索和转换。")
      .addToggle((toggle) => {
        toggle
          .setValue(this.plugin.settings.enableGreekLetterHelper)
          .onChange(async (value) => {
            this.plugin.settings.enableGreekLetterHelper = value;
            await this.plugin.saveSettings();
          });
      });

    new Setting(containerEl)
      .setName("Greek output mode")
      .setDesc("LaTeX 模式输出 \\alpha；Unicode 模式输出 α，并作为普通文本插入。")
      .addDropdown((dropdown) => {
        dropdown
          .addOption("latex", "LaTeX")
          .addOption("unicode", "Unicode")
          .setValue(this.plugin.settings.greekOutputMode)
          .onChange(async (value) => {
            this.plugin.settings.greekOutputMode = value as GreekOutputMode;
            await this.plugin.saveSettings();
          });
      });

    new Setting(containerEl)
      .setName("Include variant Greek letters")
      .setDesc("包含 \\varepsilon、\\varphi、\\vartheta、\\varrho、\\varsigma 等变体。")
      .addToggle((toggle) => {
        toggle
          .setValue(this.plugin.settings.includeVariantGreekLetters)
          .onChange(async (value) => {
            this.plugin.settings.includeVariantGreekLetters = value;
            await this.plugin.saveSettings();
          });
      });

    new Setting(containerEl)
      .setName('Show all Greek letters for "希腊字母" / "greek"')
      .setDesc("输入 希腊字母、greek 或 g 时显示全部希腊字母候选。")
      .addToggle((toggle) => {
        toggle
          .setValue(this.plugin.settings.showAllGreekLettersForKeyword)
          .onChange(async (value) => {
            this.plugin.settings.showAllGreekLettersForKeyword = value;
            await this.plugin.saveSettings();
          });
      });
  }
}
