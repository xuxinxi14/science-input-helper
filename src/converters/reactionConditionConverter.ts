import { convertChemicalFormula } from "../core/chemicalFormula";
import { formatCondition } from "./conditionFormatter";

export type ReactionArrowType = "reversible" | "right";

export interface ParsedReactionArrow {
  type: ReactionArrowType;
  source: string;
  above?: string;
  below?: string;
  latex: string;
}

export interface ParsedReaction {
  source: string;
  left: string;
  right: string;
  arrow: ParsedReactionArrow;
  latex: string;
}

const REVERSIBLE_ALIASES = ["可逆", "eq", "<->"];
const RIGHT_ALIASES = ["生成", "ra", "->"];
const ARROW_PATTERN = "(?:可逆|eq|<->|生成|ra|->)";

export function makeReversibleArrow(above?: string, below?: string): string {
  return withAboveBelow("\\rightleftharpoons", above, below);
}

export function makeRightArrow(above?: string, below?: string): string {
  const top = formatOptionalCondition(above);
  const bottom = formatOptionalCondition(below);

  if (top && bottom) {
    return `\\xrightarrow[${bottom}]{${top}}`;
  }

  if (top) {
    return `\\xrightarrow{${top}}`;
  }

  if (bottom) {
    return `\\xrightarrow[${bottom}]{}`;
  }

  return "\\rightarrow";
}

export function parseReactionArrowInput(input: string): ParsedReactionArrow | null {
  const source = input.trim();

  if (!source) {
    return null;
  }

  const bracket = parseBracketArrow(source);
  if (bracket) {
    return buildArrow(bracket.type, source, bracket.above, bracket.below);
  }

  const directional = parseDirectionalArrow(source);
  if (directional) {
    return buildArrow(directional.type, source, directional.above, directional.below);
  }

  const exactType = getArrowType(source);
  if (exactType) {
    return buildArrow(exactType, source);
  }

  return null;
}

export function parseFullReactionInput(input: string): ParsedReaction | null {
  const source = input.trim();
  const match = source.match(new RegExp(`^(?:反应|rxn)\\s+(.+?)\\s+(${ARROW_PATTERN}(?:\\s*\\[[^\\]]+\\]){0,2})\\s+(.+)$`, "i"));

  if (!match) {
    return null;
  }

  const left = match[1].trim();
  const arrow = parseReactionArrowInput(match[2]);
  const right = match[3].trim();

  if (!left || !arrow || !right) {
    return null;
  }

  const latex = `${convertChemicalFormula(left)} ${arrow.latex} ${convertChemicalFormula(right)}`;

  return {
    source,
    left,
    right,
    arrow,
    latex
  };
}

export function convertFullReaction(input: string): string | null {
  return parseFullReactionInput(input)?.latex ?? null;
}

function withAboveBelow(base: string, above?: string, below?: string): string {
  const top = formatOptionalCondition(above);
  const bottom = formatOptionalCondition(below);

  if (top && bottom) {
    return `\\overset{${top}}{\\underset{${bottom}}{${base}}}`;
  }

  if (top) {
    return `\\overset{${top}}{${base}}`;
  }

  if (bottom) {
    return `\\underset{${bottom}}{${base}}`;
  }

  return base;
}

function buildArrow(type: ReactionArrowType, source: string, above?: string, below?: string): ParsedReactionArrow {
  return {
    type,
    source,
    above,
    below,
    latex: type === "reversible" ? makeReversibleArrow(above, below) : makeRightArrow(above, below)
  };
}

function parseBracketArrow(source: string): { type: ReactionArrowType; above?: string; below?: string } | null {
  const match = source.match(new RegExp(`^(${ARROW_PATTERN})\\s*((?:\\[[^\\]]+\\]\\s*){1,2})$`, "i"));

  if (!match) {
    return null;
  }

  const type = getArrowType(match[1]);
  if (!type) {
    return null;
  }

  const conditions = [...match[2].matchAll(/\[([^\]]+)\]/g)].map((item) => item[1].trim()).filter(Boolean);

  if (conditions.length === 0) {
    return null;
  }

  return {
    type,
    above: conditions[0],
    below: conditions[1]
  };
}

function parseDirectionalArrow(source: string): { type: ReactionArrowType; above?: string; below?: string } | null {
  const match = source.match(new RegExp(`^(${ARROW_PATTERN})\\s+(.+)$`, "i"));

  if (!match) {
    return null;
  }

  const type = getArrowType(match[1]);
  if (!type) {
    return null;
  }

  const conditions = parseDirectionalConditions(match[2]);
  if (!conditions) {
    return null;
  }

  return {
    type,
    ...conditions
  };
}

function parseDirectionalConditions(input: string): { above?: string; below?: string } | null {
  const tokens = input.trim().split(/\s+/).filter(Boolean);

  if (tokens.length < 2) {
    return null;
  }

  let above: string | undefined;
  let below: string | undefined;
  let index = 0;

  while (index < tokens.length) {
    const marker = tokens[index];
    if (marker !== "上" && marker !== "下") {
      return null;
    }

    const nextMarker = findNextDirectionMarker(tokens, index + 1);
    const value = tokens.slice(index + 1, nextMarker).join(" ").trim();

    if (!value) {
      return null;
    }

    if (marker === "上") {
      above = value;
    } else {
      below = value;
    }

    index = nextMarker;
  }

  return above || below ? { above, below } : null;
}

function findNextDirectionMarker(tokens: string[], start: number): number {
  for (let index = start; index < tokens.length; index++) {
    if (tokens[index] === "上" || tokens[index] === "下") {
      return index;
    }
  }

  return tokens.length;
}

function getArrowType(value: string): ReactionArrowType | null {
  const normalized = value.trim().toLowerCase();

  if (REVERSIBLE_ALIASES.includes(normalized) || value.trim() === "可逆") {
    return "reversible";
  }

  if (RIGHT_ALIASES.includes(normalized) || value.trim() === "生成") {
    return "right";
  }

  return null;
}

function formatOptionalCondition(value?: string): string {
  return value ? formatCondition(value) : "";
}
