import type { InsertMode } from "../types";

export function wrapLatex(latex: string, mode: InsertMode): string {
  const trimmed = latex.trim();

  if (mode === "inline") {
    return `$${trimmed}$`;
  }

  if (mode === "block") {
    return `$$\n${trimmed}\n$$`;
  }

  return trimmed;
}
