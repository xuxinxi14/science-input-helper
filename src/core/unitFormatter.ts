export function formatUnitExpression(input: string): string {
  const trimmed = input.trim();
  const match = trimmed.match(/^([+-]?(?:\d+(?:\.\d*)?|\.\d+))(?:[eE]([+-]?\d+))?\s*(.*?)$/);

  if (!match) {
    return trimmed;
  }

  const [, mantissa, exponent, unit] = match;
  const number = exponent ? `${mantissa}\\times10^{${normalizeExponent(exponent)}}` : mantissa;
  const unitLatex = formatUnitPart(unit.trim());

  if (!unitLatex) {
    return number;
  }

  return `${number}\\,${unitLatex}`;
}

function normalizeExponent(exponent: string): string {
  return exponent.startsWith("+") ? exponent.slice(1) : exponent;
}

function formatUnitPart(unit: string): string {
  if (unit === "°C" || unit === "℃") {
    return "^{\\circ}\\mathrm{C}";
  }

  const normalized = unit
    .replace(/\s+/g, "\\,")
    .replace(/([A-Za-zμµΩ]+)(-?\d+)/g, (_, base: string, exponent: string) => {
      if (exponent.startsWith("-")) {
        return `${base}^{${exponent}}`;
      }

      return `${base}^${exponent}`;
    });

  return `\\mathrm{${normalized}}`;
}
