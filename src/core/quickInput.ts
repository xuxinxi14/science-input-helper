import { convertChemicalFormula } from "./chemicalFormula";
import { convertGreekLetter, isGreekListQuery, searchGreekLetters, type GreekLetterResult } from "../converters/greekLetterConverter";
import { parseMathStructureQuickInput, type ParsedMathStructure } from "../converters/mathStructureConverter";
import {
  parseFullReactionInput,
  parseReactionArrowInput,
  type ParsedReaction,
  type ParsedReactionArrow
} from "../converters/reactionConditionConverter";
import { convertToRomanNumeral } from "../converters/romanNumeralConverter";
import { searchSymbols, type ScienceSymbol } from "./symbols";
import { searchTemplates } from "./templates";
import { formatUnitExpression } from "./unitFormatter";
import type { GreekOutputMode, ScienceTemplate, TemplateCategory } from "../types";

export type QuickInputKind =
  | "chemical"
  | "unit"
  | "template"
  | "symbol"
  | "greek"
  | "math"
  | "reaction"
  | "roman"
  | "help"
  | "raw"
  | "empty";

export type QuickInputOutputFormat = "latex" | "text";

export interface QuickInputSuggestion {
  id: string;
  title: string;
  latex: string;
  source: "template" | "symbol" | "greek";
  detail: string;
  outputFormat?: QuickInputOutputFormat;
  replacement?: string;
}

export interface QuickInputResult {
  kind: QuickInputKind;
  label: string;
  source: string;
  query: string;
  latex: string;
  template?: ScienceTemplate;
  symbol?: ScienceSymbol;
  greek?: GreekLetterResult;
  math?: ParsedMathStructure;
  reactionArrow?: ParsedReactionArrow;
  reaction?: ParsedReaction;
  suggestions: QuickInputSuggestion[];
  helpLines?: string[];
  outputFormat: QuickInputOutputFormat;
  error?: "invalid" | "out-of-range";
}

export interface QuickInputOptions {
  enableGreekLetterHelper?: boolean;
  greekOutputMode?: GreekOutputMode;
  includeVariantGreekLetters?: boolean;
  showAllGreekLettersForKeyword?: boolean;
}

interface ParsedPrefix {
  mode: QuickInputKind | "template-category" | "greek-list" | null;
  category?: TemplateCategory | "all";
  query: string;
  label?: string;
}

const PREFIXES: Record<string, ParsedPrefix> = {
  c: { mode: "chemical", query: "", label: "化学式" },
  chem: { mode: "chemical", query: "", label: "化学式" },
  化: { mode: "chemical", query: "", label: "化学式" },
  u: { mode: "unit", query: "", label: "单位" },
  unit: { mode: "unit", query: "", label: "单位" },
  单位: { mode: "unit", query: "", label: "单位" },
  p: { mode: "template-category", category: "physics", query: "", label: "物理模板" },
  physics: { mode: "template-category", category: "physics", query: "", label: "物理模板" },
  物: { mode: "template-category", category: "physics", query: "", label: "物理模板" },
  ch: { mode: "template-category", category: "chemistry", query: "", label: "化学模板" },
  chemistry: { mode: "template-category", category: "chemistry", query: "", label: "化学模板" },
  化学: { mode: "template-category", category: "chemistry", query: "", label: "化学模板" },
  b: { mode: "template-category", category: "biochemistry", query: "", label: "生物化学模板" },
  bio: { mode: "template-category", category: "biochemistry", query: "", label: "生物化学模板" },
  生化: { mode: "template-category", category: "biochemistry", query: "", label: "生物化学模板" },
  原: { mode: "raw", query: "", label: "Raw LaTeX" },
  raw: { mode: "raw", query: "", label: "Raw LaTeX" }
};

const GREEK_PREFIXES = new Set(["g", "希"]);
const ROMAN_PREFIXES = new Set(["r", "roman", "罗马"]);

export const QUICK_INPUT_HELP_LINES = [
  "化 / c: 化学式，例如 化 H2SO4",
  "单位 / u: 单位格式，例如 单位 9.8m/s2",
  "物 / p: 物理模板，例如 物 动能",
  "化学 / ch: 化学模板，例如 化学 pH",
  "生化 / b: 生物化学模板，例如 生化 ATP水解",
  "原 / raw: 原样 LaTeX，例如 原 E=mc^2",
  "希 / g: 希腊字母，例如 希 阿尔法 或 g alpha",
  "罗马 / roman / r: 罗马数字，例如 罗马 12",
  "数 / m: 数学结构，例如 数 根号 x+1 或 m frac a+b / c+d",
  "反应条件: 可逆[加热][浓硫酸]、生成[光照]、反应 A 生成[点燃] B",
  "中文符号: 可逆、远大于、约等于、成正比"
];

export function parseQuickInput(input: string, options: QuickInputOptions = {}): QuickInputResult {
  const source = input.trim();
  const greekOptions = {
    enabled: options.enableGreekLetterHelper ?? true,
    outputMode: options.greekOutputMode ?? "latex",
    includeVariants: options.includeVariantGreekLetters ?? true,
    showAllForKeyword: options.showAllGreekLettersForKeyword ?? true
  };

  if (!source) {
    return {
      kind: "empty",
      label: "等待输入",
      source,
      query: "",
      latex: "",
      suggestions: [],
      outputFormat: "latex"
    };
  }

  if (/^(help|帮助|\?)$/i.test(source)) {
    return {
      kind: "help",
      label: "前缀帮助",
      source,
      query: source,
      latex: "",
      suggestions: [],
      helpLines: QUICK_INPUT_HELP_LINES,
      outputFormat: "latex"
    };
  }

  const prefixed = parsePrefix(source);
  const query = prefixed.query.trim();

  if (!query) {
    return {
      kind: "empty",
      label: prefixed.label ?? "等待输入",
      source,
      query,
      latex: "",
      suggestions: [],
      outputFormat: "latex"
    };
  }

  if (prefixed.mode === "chemical") {
    return buildResult("chemical", prefixed.label ?? "化学式", source, query, convertChemicalFormula(query));
  }

  if (prefixed.mode === "unit") {
    return buildResult("unit", prefixed.label ?? "单位", source, query, formatUnitExpression(query));
  }

  if (prefixed.mode === "raw") {
    return buildResult("raw", prefixed.label ?? "Raw LaTeX", source, query, query, [], "text");
  }

  if (prefixed.mode === "greek") {
    return resolveGreek(query, source, "希腊字母", greekOptions);
  }

  if (prefixed.mode === "greek-list") {
    return resolveGreekList(query, source, "希腊字母", greekOptions);
  }

  if (prefixed.mode === "roman") {
    return resolveRoman(query, source);
  }

  if (prefixed.mode === "template-category") {
    return resolveTemplate(query, source, prefixed.category ?? "all", prefixed.label ?? "模板");
  }

  const reactionResult = resolveReactionCondition(query, source);
  if (reactionResult.reactionArrow || reactionResult.reaction) {
    return reactionResult;
  }

  const symbolResult = resolveSymbol(query, source, "符号");
  if (symbolResult.symbol && shouldPreferSymbol(query)) {
    return symbolResult;
  }

  if (isGreekListQuery(query)) {
    return resolveGreekList(query, source, "希腊字母", greekOptions);
  }

  const greekResult = resolveGreek(query, source, "希腊字母", greekOptions);
  if (greekResult.greek || greekResult.suggestions.length > 0) {
    return greekResult;
  }

  const mathResult = resolveMathStructure(query, source);
  if (mathResult.math) {
    return mathResult;
  }

  const templateResult = resolveTemplate(query, source, "all", "模板");
  if (templateResult.template && shouldPreferTemplate(query)) {
    return withExtraSuggestions(templateResult, [...greekResult.suggestions, ...symbolResult.suggestions]);
  }

  const chemicalCandidate = looksLikeChemical(query);
  const chemicalShouldBeatUnit = chemicalCandidate && shouldPreferChemicalOverUnit(query);

  if (looksLikeUnit(query) && !chemicalShouldBeatUnit) {
    return buildResult("unit", "单位", source, query, formatUnitExpression(query), [
      ...templateResult.suggestions,
      ...greekResult.suggestions,
      ...symbolResult.suggestions
    ]);
  }

  if (chemicalCandidate) {
    return buildResult("chemical", "化学式", source, query, convertChemicalFormula(query), [
      ...templateResult.suggestions,
      ...greekResult.suggestions,
      ...symbolResult.suggestions
    ]);
  }

  if (templateResult.template) {
    return withExtraSuggestions(templateResult, [...greekResult.suggestions, ...symbolResult.suggestions]);
  }

  if (symbolResult.symbol) {
    return symbolResult;
  }

  return buildResult("raw", "Raw LaTeX", source, query, query, [
    ...templateResult.suggestions,
    ...greekResult.suggestions,
    ...symbolResult.suggestions
  ]);
}

function parsePrefix(source: string): ParsedPrefix {
  const match = source.match(/^(\S+)\s+(.+)$/);
  if (!match) {
    return { mode: null, query: source };
  }

  const prefix = match[1].toLowerCase();

  if (GREEK_PREFIXES.has(prefix)) {
    const query = match[2];
    return {
      mode: isGreekListQuery(prefix) && !query.trim() ? "greek-list" : "greek",
      query,
      label: "希腊字母"
    };
  }

  if (ROMAN_PREFIXES.has(prefix)) {
    return {
      mode: "roman",
      query: match[2],
      label: "罗马数字"
    };
  }

  const preset = PREFIXES[prefix];

  if (!preset) {
    return { mode: null, query: source };
  }

  return {
    ...preset,
    query: match[2]
  };
}

function resolveGreek(
  query: string,
  source: string,
  label: string,
  options: Parameters<typeof searchGreekLetters>[1]
): QuickInputResult {
  const results = searchGreekLetters(query, { ...options, limit: 8 });
  const greek = results[0];
  const outputFormat = options?.outputMode === "unicode" ? "text" : "latex";

  if (!greek) {
    return buildResult("raw", label, source, query, "", [], outputFormat);
  }

  return {
    kind: "greek",
    label: `${label}: ${greek.entry.unicode} ${greek.entry.english} / ${greek.entry.chinese}`,
    source,
    query,
    latex: greek.output,
    greek,
    suggestions: results.map((result) => greekToSuggestion(result, outputFormat)),
    outputFormat
  };
}

function resolveGreekList(
  query: string,
  source: string,
  label: string,
  options: Parameters<typeof searchGreekLetters>[1]
): QuickInputResult {
  const results = searchGreekLetters(query, { ...options, limit: 100 });
  const outputFormat = options?.outputMode === "unicode" ? "text" : "latex";

  return {
    kind: "greek",
    label,
    source,
    query,
    latex: "",
    suggestions: results.map((result) => greekToSuggestion(result, outputFormat)),
    outputFormat
  };
}

function resolveRoman(query: string, source: string): QuickInputResult {
  const result = convertToRomanNumeral(query);

  if (!result.ok) {
    return {
      kind: "roman",
      label: result.error === "out-of-range" ? "罗马数字超出范围" : "无效罗马数字",
      source,
      query,
      latex: "",
      suggestions: [],
      outputFormat: "text",
      error: result.error
    };
  }

  return buildResult("roman", "罗马数字", source, query, result.output, [], "text");
}

function resolveMathStructure(query: string, source: string): QuickInputResult {
  const math = parseMathStructureQuickInput(query);

  if (!math) {
    return buildResult("raw", "数学结构", source, query, "");
  }

  return {
    kind: "math",
    label: `数学结构: ${math.label}`,
    source,
    query,
    latex: math.latex,
    math,
    suggestions: [],
    outputFormat: "latex"
  };
}

function resolveReactionCondition(query: string, source: string): QuickInputResult {
  const reaction = parseFullReactionInput(query);
  if (reaction) {
    return {
      kind: "reaction",
      label: "反应条件: 完整反应式",
      source,
      query,
      latex: reaction.latex,
      reaction,
      suggestions: [],
      outputFormat: "latex"
    };
  }

  const reactionArrow = parseReactionArrowInput(query);
  if (reactionArrow) {
    if (reactionArrow.source === "可逆" && !reactionArrow.above && !reactionArrow.below) {
      return buildResult("raw", "反应条件", source, query, "");
    }

    return {
      kind: "reaction",
      label: reactionArrow.type === "reversible" ? "反应条件: 可逆箭头" : "反应条件: 生成箭头",
      source,
      query,
      latex: reactionArrow.latex,
      reactionArrow,
      suggestions: [],
      outputFormat: "latex"
    };
  }

  return buildResult("raw", "反应条件", source, query, "");
}

function resolveTemplate(
  query: string,
  source: string,
  category: TemplateCategory | "all",
  label: string
): QuickInputResult {
  const suggestions = searchTemplates(query, { category, limit: 5 });
  const template = suggestions[0];
  const mappedSuggestions = suggestions.map(templateToSuggestion);

  if (!template) {
    return buildResult("raw", label, source, query, "", mappedSuggestions);
  }

  return {
    kind: "template",
    label: `${label}: ${template.title}`,
    source,
    query,
    latex: template.latex,
    template,
    suggestions: mappedSuggestions,
    outputFormat: "latex"
  };
}

function resolveSymbol(query: string, source: string, label: string): QuickInputResult {
  const suggestions = searchSymbols(query, 5);
  const symbol = suggestions[0];

  if (!symbol) {
    return buildResult("raw", label, source, query, "", []);
  }

  return {
    kind: "symbol",
    label: `${label}: ${symbol.title}`,
    source,
    query,
    latex: symbol.latex,
    symbol,
    suggestions: suggestions.map(symbolToSuggestion),
    outputFormat: "latex"
  };
}

function buildResult(
  kind: QuickInputKind,
  label: string,
  source: string,
  query: string,
  latex: string,
  suggestions: QuickInputSuggestion[] = [],
  outputFormat: QuickInputOutputFormat = "latex"
): QuickInputResult {
  return {
    kind,
    label,
    source,
    query,
    latex,
    suggestions,
    outputFormat
  };
}

function shouldPreferTemplate(query: string): boolean {
  return /[\u4e00-\u9fff]/.test(query) || /^(ph|g6p|f6p|atp|nadh)$/i.test(query);
}

function shouldPreferSymbol(query: string): boolean {
  return /[\u4e00-\u9fff]/.test(query);
}

function looksLikeUnit(query: string): boolean {
  return /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?\s*[A-Za-zμµΩ]/.test(query);
}

function looksLikeChemical(query: string): boolean {
  if (!/[A-Z]/.test(query)) {
    return false;
  }

  if (/\b(up|down|heat)\b|->|<->/.test(query)) {
    return true;
  }

  return /^(\d*[A-Z][A-Za-z0-9()[\]+-]*(?:\s+\d+[+-])?)(?:\s*(?:\+|=)\s*\d*[A-Z][A-Za-z0-9()[\]+-]*(?:\s+\d+[+-])?)*$/.test(query);
}

function shouldPreferChemicalOverUnit(query: string): boolean {
  if (/\b(up|down|heat)\b|->|<->|[+=]/.test(query)) {
    return true;
  }

  return query
    .split(/\s+/)
    .some((token) => isComplexChemicalToken(token));
}

function isComplexChemicalToken(token: string): boolean {
  const formula = token.trim().replace(/^\d+(?=[A-Z([])/, "");

  if (!/[A-Z]/.test(formula)) {
    return false;
  }

  if (/[0-9()[\]+-]/.test(formula) || formula.includes("·") || formula.includes(".")) {
    return true;
  }

  const elementSymbols = formula.match(/[A-Z][a-z]?/g);
  return (elementSymbols?.length ?? 0) >= 2;
}

function templateToSuggestion(template: ScienceTemplate): QuickInputSuggestion {
  return {
    id: template.id,
    title: template.title,
    latex: template.latex,
    source: "template",
    detail: categoryLabel(template.category),
    replacement: template.title
  };
}

function symbolToSuggestion(symbol: ScienceSymbol): QuickInputSuggestion {
  return {
    id: symbol.id,
    title: symbol.title,
    latex: symbol.latex,
    source: "symbol",
    detail: "符号",
    replacement: symbol.title
  };
}

function greekToSuggestion(result: GreekLetterResult, outputFormat: QuickInputOutputFormat): QuickInputSuggestion {
  return {
    id: result.entry.id,
    title: `${result.entry.unicode} ${result.entry.english} / ${result.entry.chinese}`,
    latex: result.output,
    source: "greek",
    detail: "希腊字母",
    outputFormat,
    replacement: result.entry.english
  };
}

function withExtraSuggestions(result: QuickInputResult, extra: QuickInputSuggestion[]): QuickInputResult {
  const existingIds = new Set(result.suggestions.map((suggestion) => suggestion.id));
  return {
    ...result,
    suggestions: [
      ...result.suggestions,
      ...extra.filter((suggestion) => !existingIds.has(suggestion.id))
    ]
  };
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
