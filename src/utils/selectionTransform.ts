import type { Editor } from "obsidian";

export interface GeneratedSelectionReplacement {
  text: string;
  cursorOffset?: number;
}

export function replaceSelectionWithGenerated(
  editor: Editor,
  generate: (selection: string) => GeneratedSelectionReplacement
): void {
  const selection = editor.getSelection();
  const startOffset = editor.posToOffset(editor.getCursor("from"));
  const replacement = generate(selection);

  editor.replaceSelection(replacement.text);

  if (typeof replacement.cursorOffset === "number") {
    editor.setCursor(editor.offsetToPos(startOffset + replacement.cursorOffset));
  }

  editor.focus();
}

export function cursorInsideFirstEmptyBraces(text: string): number {
  const index = text.indexOf("{}");
  return index >= 0 ? index + 1 : text.length;
}

export function cursorInsideLastEmptyBraces(text: string): number {
  const index = text.lastIndexOf("{}");
  return index >= 0 ? index + 1 : text.length;
}
