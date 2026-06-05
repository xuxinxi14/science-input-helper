export type MathStructureKind =
  | "sqrt"
  | "nth-root"
  | "fraction"
  | "parentheses"
  | "brackets"
  | "braces"
  | "absolute"
  | "norm"
  | "vector"
  | "overrightarrow"
  | "superscript"
  | "subscript";

export interface ParsedMathStructure {
  kind: MathStructureKind;
  label: string;
  latex: string;
}

export function wrapWithSqrt(input: string): string {
  return `\\sqrt{${input}}`;
}

export function wrapWithNthRoot(input: string, degree: string): string {
  return `\\sqrt[${degree}]{${input}}`;
}

export function toFraction(numerator: string, denominator: string): string {
  return `\\frac{${numerator}}{${denominator}}`;
}

export function convertSlashToFraction(input: string): string | null {
  const slashIndex = input.indexOf("/");

  if (slashIndex < 0) {
    return null;
  }

  // First-version rule: split only on the first slash. Example: a/b/c -> \frac{a}{b/c}.
  const numerator = input.slice(0, slashIndex).trim();
  const denominator = input.slice(slashIndex + 1).trim();

  if (!numerator || !denominator) {
    return null;
  }

  return toFraction(numerator, denominator);
}

export function wrapWithParentheses(input: string): string {
  return `\\left(${input}\\right)`;
}

export function wrapWithBrackets(input: string): string {
  return `\\left[${input}\\right]`;
}

export function wrapWithBraces(input: string): string {
  return `\\left\\{${input}\\right\\}`;
}

export function wrapWithAbsoluteValue(input: string): string {
  return `\\left|${input}\\right|`;
}

export function wrapWithNorm(input: string): string {
  return `\\left\\|${input}\\right\\|`;
}

export function wrapWithVector(input: string): string {
  return `\\vec{${input}}`;
}

export function wrapWithOverrightarrow(input: string): string {
  return `\\overrightarrow{${input}}`;
}

export function wrapAsSuperscript(input: string): string {
  return `^{${input}}`;
}

export function wrapAsSubscript(input: string): string {
  return `_{${input}}`;
}

export function parseMathStructureQuickInput(input: string): ParsedMathStructure | null {
  const source = stripMathPrefix(input.trim());

  if (!source) {
    return null;
  }

  const sqrtMatch = source.match(/^(?:根号|sqrt)\s+(.+)$/i);
  if (sqrtMatch) {
    return {
      kind: "sqrt",
      label: "根号",
      latex: wrapWithSqrt(sqrtMatch[1].trim())
    };
  }

  const sqrtNumberMatch = source.match(/^sqrt(\d+)\s+(.+)$/i);
  if (sqrtNumberMatch) {
    return {
      kind: "nth-root",
      label: `${sqrtNumberMatch[1]} 次根号`,
      latex: wrapWithNthRoot(sqrtNumberMatch[2].trim(), sqrtNumberMatch[1])
    };
  }

  const nthRootMatch = source.match(/^(.+?)次根号\s+(.+)$/);
  if (nthRootMatch) {
    const degree = normalizeDegree(nthRootMatch[1].trim());
    if (!degree) {
      return null;
    }

    return {
      kind: "nth-root",
      label: `${degree} 次根号`,
      latex: wrapWithNthRoot(nthRootMatch[2].trim(), degree)
    };
  }

  const fractionMatch = source.match(/^(?:分式|frac)\s+(.+)$/i);
  if (fractionMatch) {
    const latex = convertSlashToFraction(fractionMatch[1]);
    if (!latex) {
      return null;
    }

    return {
      kind: "fraction",
      label: "分式",
      latex
    };
  }

  return parseUnaryStructure(source);
}

function parseUnaryStructure(source: string): ParsedMathStructure | null {
  const specs: Array<[RegExp, MathStructureKind, string, (input: string) => string]> = [
    [/^括号\s+(.+)$/, "parentheses", "括号", wrapWithParentheses],
    [/^方括号\s+(.+)$/, "brackets", "方括号", wrapWithBrackets],
    [/^大括号\s+(.+)$/, "braces", "大括号", wrapWithBraces],
    [/^绝对值\s+(.+)$/, "absolute", "绝对值", wrapWithAbsoluteValue],
    [/^范数\s+(.+)$/, "norm", "范数", wrapWithNorm],
    [/^向量\s+(.+)$/, "vector", "向量", wrapWithVector],
    [/^线段\s+(.+)$/, "overrightarrow", "有向线段", wrapWithOverrightarrow],
    [/^(?:上标|sup)\s+(.+)$/i, "superscript", "上标", wrapAsSuperscript],
    [/^(?:下标|sub)\s+(.+)$/i, "subscript", "下标", wrapAsSubscript]
  ];

  for (const [pattern, kind, label, converter] of specs) {
    const match = source.match(pattern);
    if (!match) {
      continue;
    }

    return {
      kind,
      label,
      latex: converter(match[1].trim())
    };
  }

  return null;
}

function stripMathPrefix(input: string): string {
  return input.replace(/^(?:数|m)\s+/i, "").trim();
}

function normalizeDegree(value: string): string | null {
  const normalized = value.trim();
  const chineseDigits: Record<string, string> = {
    一: "1",
    二: "2",
    两: "2",
    三: "3",
    四: "4",
    五: "5",
    六: "6",
    七: "7",
    八: "8",
    九: "9",
    十: "10",
    n: "n",
    N: "n"
  };

  if (/^\d+$/.test(normalized) || normalized === "n" || normalized === "N") {
    return normalized.toLowerCase();
  }

  return chineseDigits[normalized] ?? null;
}
