import type { Extension } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { convertChemicalFormula } from "../core/chemicalFormula";
import { wrapLatex } from "../core/insert";
import { formatUnitExpression } from "../core/unitFormatter";
import type { InsertMode } from "../types";

export function createScienceInputExtension(getInsertMode: () => InsertMode): Extension {
  return keymap.of([
    {
      key: "Mod-Shift-H",
      run: (view) => replaceSelectedText(view, convertChemicalFormula, getInsertMode())
    },
    {
      key: "Mod-Shift-U",
      run: (view) => replaceSelectedText(view, formatUnitExpression, getInsertMode())
    }
  ]);
}

function replaceSelectedText(
  view: EditorView,
  converter: (input: string) => string,
  mode: InsertMode
): boolean {
  const changes = view.state.selection.ranges
    .filter((range) => !range.empty)
    .map((range) => {
      const selected = view.state.doc.sliceString(range.from, range.to);
      return {
        from: range.from,
        to: range.to,
        insert: wrapLatex(converter(selected), mode)
      };
    });

  if (changes.length === 0) {
    return false;
  }

  view.dispatch({ changes });
  return true;
}
