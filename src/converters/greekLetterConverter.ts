import { GREEK_LETTERS, type GreekLetterEntry, type GreekOutputMode } from "../data/greekLetters";

export interface GreekLetterOptions {
  enabled?: boolean;
  outputMode?: GreekOutputMode;
  includeVariants?: boolean;
  showAllForKeyword?: boolean;
  limit?: number;
}

export interface GreekLetterResult {
  entry: GreekLetterEntry;
  output: string;
}

const DEFAULT_OPTIONS: Required<GreekLetterOptions> = {
  enabled: true,
  outputMode: "latex",
  includeVariants: true,
  showAllForKeyword: true,
  limit: 8
};

export function searchGreekLetters(query: string, options: GreekLetterOptions = {}): GreekLetterResult[] {
  const resolved = { ...DEFAULT_OPTIONS, ...options };

  if (!resolved.enabled) {
    return [];
  }

  const normalizedQuery = normalizeGreekQuery(query);
  const candidates = getGreekCandidates(resolved.includeVariants);

  if (isGreekListQuery(normalizedQuery)) {
    return resolved.showAllForKeyword
      ? candidates.map((entry) => toResult(entry, resolved.outputMode))
      : [];
  }

  if (!normalizedQuery) {
    return [];
  }

  return candidates
    .map((entry) => ({
      entry,
      output: getGreekOutput(entry, resolved.outputMode),
      score: scoreGreekEntry(entry, normalizedQuery, query.trim())
    }))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || a.entry.id.localeCompare(b.entry.id))
    .slice(0, resolved.limit)
    .map(({ entry, output }) => ({ entry, output }));
}

export function convertGreekLetter(query: string, options: GreekLetterOptions = {}): GreekLetterResult | null {
  return searchGreekLetters(query, { ...options, limit: 1 })[0] ?? null;
}

export function isGreekListQuery(query: string): boolean {
  const normalized = normalizeGreekQuery(query);
  return normalized === "希腊字母" || normalized === "greek" || normalized === "g";
}

export function getGreekOutput(entry: GreekLetterEntry, outputMode: GreekOutputMode): string {
  return outputMode === "unicode" ? entry.unicode : entry.latex;
}

function getGreekCandidates(includeVariants: boolean): GreekLetterEntry[] {
  return includeVariants
    ? GREEK_LETTERS
    : GREEK_LETTERS.filter((entry) => entry.kind !== "variant");
}

function toResult(entry: GreekLetterEntry, outputMode: GreekOutputMode): GreekLetterResult {
  return {
    entry,
    output: getGreekOutput(entry, outputMode)
  };
}

function scoreGreekEntry(entry: GreekLetterEntry, query: string, rawQuery: string): number {
  if (entry.english === rawQuery) {
    return 120;
  }

  const values = [
    entry.english,
    entry.chinese,
    ...entry.aliases
  ].map(normalizeGreekQuery);

  if (values.some((value) => value === query)) {
    return 100;
  }

  if (values.some((value) => value.includes(query))) {
    return 70;
  }

  if (query === entry.unicode) {
    return 90;
  }

  return 0;
}

function normalizeGreekQuery(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, "");
}
