import { convertChemicalFormula } from "../core/chemicalFormula";

const CONDITION_ALIASES = new Map<string, string>([
  ["加热", "\\Delta"],
  ["heat", "\\Delta"],
  ["光照", "h\\nu"],
  ["hv", "h\\nu"],
  ["hν", "h\\nu"],
  ["h\\nu", "h\\nu"],
  ["催化剂", "\\mathrm{cat.}"],
  ["cat", "\\mathrm{cat.}"],
  ["高温", "\\mathrm{高温}"],
  ["高压", "\\mathrm{高压}"],
  ["浓硫酸", "\\mathrm{浓硫酸}"],
  ["稀硫酸", "\\mathrm{稀硫酸}"],
  ["点燃", "\\mathrm{点燃}"]
]);

export function formatCondition(input: string): string {
  const value = input.trim();

  if (!value) {
    return "";
  }

  const lower = value.toLowerCase();
  const alias = CONDITION_ALIASES.get(value) ?? CONDITION_ALIASES.get(lower);

  if (alias) {
    return alias;
  }

  const temperature = formatTemperature(value);
  if (temperature) {
    return temperature;
  }

  if (looksLikeChemicalFormula(value)) {
    return convertChemicalFormula(value);
  }

  if (value.startsWith("\\")) {
    return value;
  }

  return `\\mathrm{${escapeMathText(value)}}`;
}

function formatTemperature(value: string): string | null {
  const match = value.match(/^([+-]?(?:\d+(?:\.\d*)?|\.\d+))\s*(?:℃|°C)$/i);

  if (!match) {
    return null;
  }

  return `${match[1]}\\,^{\\circ}\\mathrm{C}`;
}

function looksLikeChemicalFormula(value: string): boolean {
  if (/\s/.test(value) || !/[A-Z]/.test(value)) {
    return false;
  }

  return /^[A-Za-z0-9()[\]+\-·.]+$/.test(value);
}

function escapeMathText(value: string): string {
  return value.replace(/[{}]/g, "\\$&");
}
