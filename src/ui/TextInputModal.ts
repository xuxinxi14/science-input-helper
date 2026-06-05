import { App, Modal, Setting } from "obsidian";

interface TextInputModalOptions {
  title: string;
  placeholder: string;
  submitLabel: string;
  onSubmit: (value: string) => void;
}

export class TextInputModal extends Modal {
  private readonly options: TextInputModalOptions;

  constructor(app: App, options: TextInputModalOptions) {
    super(app);
    this.options = options;
  }

  onOpen(): void {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl("h2", { text: this.options.title });

    const inputEl = contentEl.createEl("input");
    inputEl.type = "text";
    inputEl.placeholder = this.options.placeholder;
    inputEl.addClass("science-input-helper-modal-input");

    inputEl.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        this.submit(inputEl.value);
      }
    });

    new Setting(contentEl).addButton((button) => {
      button
        .setButtonText(this.options.submitLabel)
        .setCta()
        .onClick(() => this.submit(inputEl.value));
    });

    inputEl.focus();
  }

  onClose(): void {
    this.contentEl.empty();
  }

  private submit(value: string): void {
    const trimmed = value.trim();
    if (!trimmed) {
      return;
    }

    this.close();
    this.options.onSubmit(trimmed);
  }
}
