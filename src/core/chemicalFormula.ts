const KEYWORD_COMMANDS = new Map<string, string>([
  ["down", "\\downarrow"],
  ["up", "\\uparrow"],
  ["heat", "\\xrightarrow{\\Delta}"]
]);

const ARROW_COMMANDS = new Map<string, string>([
  ["->", "\\rightarrow"],
  ["<->", "\\rightleftharpoons"]
]);

interface FormulaToken {
  latex: string;
  isFormula: boolean;
  hasCharge: boolean;
}

export function convertChemicalFormula(input: string): string {
  const body = convertChemicalBody(input);
  return body ? `\\mathrm{${body}}` : "";
}

export function convertChemicalBody(input: string): string {
  const tokens = tokenizeChemicalInput(input);
  const output: string[] = [];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (ARROW_COMMANDS.has(token)) {
      output.push(ARROW_COMMANDS.get(token)!);
      continue;
    }

    const lower = token.toLowerCase();
    if (KEYWORD_COMMANDS.has(lower)) {
      output.push(KEYWORD_COMMANDS.get(lower)!);
      continue;
    }

    if (token === "+" || token === "=") {
      output.push(token);
      continue;
    }

    const next = tokens[i + 1];
    const explicitCharge = next && /^\d+[+-]$/.test(next) ? next : undefined;
    const parsed = convertFormulaToken(token, explicitCharge);

    if (parsed.isFormula) {
      output.push(parsed.latex);
      if (explicitCharge) {
        i += 1;
      }
      continue;
    }

    output.push(token);
  }

  return output.join(" ").replace(/\s+/g, " ").trim();
}

export function convertFormulaToken(token: string, explicitCharge?: string): FormulaToken {
  const original = token.trim();

  if (!/[A-Z]/.test(original)) {
    return {
      latex: original,
      isFormula: false,
      hasCharge: false
    };
  }

  const coefficientMatch = original.match(/^(\d+)(?=[A-Z([])/);
  const coefficient = coefficientMatch?.[1] ?? "";
  let formula = coefficient ? original.slice(coefficient.length) : original;
  let charge = explicitCharge;

  if (!charge) {
    const attachedChargeMatch = formula.match(/([+-])$/);
    if (attachedChargeMatch) {
      const sign = attachedChargeMatch[1];
      const base = formula.slice(0, -1);
      const singleElementCharge = base.match(/^([A-Z][a-z]?)(\d+)$/);

      if (singleElementCharge) {
        formula = singleElementCharge[1];
        charge = `${singleElementCharge[2]}${sign}`;
      } else {
        formula = base;
        charge = sign;
      }
    }
  }

  const latexFormula = `${coefficient}${formulaToLatex(formula)}`;
  const latex = charge ? `${latexFormula}^{${charge}}` : latexFormula;

  return {
    latex,
    isFormula: true,
    hasCharge: Boolean(charge)
  };
}

function tokenizeChemicalInput(input: string): string[] {
  return input
    .trim()
    .replace(/<->/g, " __SCIENCE_REVERSIBLE_ARROW__ ")
    .replace(/->/g, " -> ")
    .replace(/__SCIENCE_REVERSIBLE_ARROW__/g, " <-> ")
    .split(/\s+/)
    .filter(Boolean);
}

function formulaToLatex(formula: string): string {
  let latex = "";
  let index = 0;
  let hydrateCoefficient = false;

  while (index < formula.length) {
    const char = formula[index];

    if (/[A-Z]/.test(char)) {
      const next = formula[index + 1];
      const symbol = next && /[a-z]/.test(next) ? `${char}${next}` : char;
      index += symbol.length;
      const digits = readDigits(formula, index);
      latex += symbol;
      hydrateCoefficient = false;

      if (digits.value) {
        latex += subscript(digits.value);
        index = digits.nextIndex;
      }

      continue;
    }

    if (char === ")" || char === "]") {
      latex += char;
      index += 1;
      const digits = readDigits(formula, index);
      hydrateCoefficient = false;

      if (digits.value) {
        latex += subscript(digits.value);
        index = digits.nextIndex;
      }

      continue;
    }

    if (char === "·" || char === ".") {
      latex += "\\cdot ";
      hydrateCoefficient = true;
      index += 1;
      continue;
    }

    if (/\d/.test(char)) {
      const digits = readDigits(formula, index);
      latex += hydrateCoefficient ? digits.value : subscript(digits.value);
      hydrateCoefficient = false;
      index = digits.nextIndex;
      continue;
    }

    latex += char;
    hydrateCoefficient = false;
    index += 1;
  }

  return latex;
}

function readDigits(value: string, startIndex: number): { value: string; nextIndex: number } {
  let index = startIndex;

  while (index < value.length && /\d/.test(value[index])) {
    index += 1;
  }

  return {
    value: value.slice(startIndex, index),
    nextIndex: index
  };
}

function subscript(value: string): string {
  return value.length === 1 ? `_${value}` : `_{${value}}`;
}
