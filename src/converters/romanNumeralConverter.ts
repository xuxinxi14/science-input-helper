export interface RomanNumeralResult {
  ok: boolean;
  output: string;
  error?: "invalid" | "out-of-range";
}

const ROMAN_TABLE: Array<[number, string]> = [
  [1000, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"]
];

export function convertToRomanNumeral(input: string): RomanNumeralResult {
  const trimmed = input.trim();

  if (!/^-?\d+$/.test(trimmed)) {
    return {
      ok: false,
      output: "无效罗马数字输入",
      error: "invalid"
    };
  }

  const value = Number(trimmed);

  if (value < 1) {
    return {
      ok: false,
      output: "无效罗马数字输入",
      error: "invalid"
    };
  }

  if (value > 3999) {
    return {
      ok: false,
      output: "罗马数字超出范围",
      error: "out-of-range"
    };
  }

  return {
    ok: true,
    output: toRoman(value)
  };
}

function toRoman(value: number): string {
  let remaining = value;
  let output = "";

  for (const [amount, numeral] of ROMAN_TABLE) {
    while (remaining >= amount) {
      output += numeral;
      remaining -= amount;
    }
  }

  return output;
}
