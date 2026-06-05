import { describe, expect, it } from "vitest";
import { convertToRomanNumeral } from "../src/converters/romanNumeralConverter";
import { parseQuickInput } from "../src/core/quickInput";

describe("romanNumeralConverter", () => {
  it("converts Arabic numbers to Roman numerals", () => {
    expect(convertToRomanNumeral("1").output).toBe("I");
    expect(convertToRomanNumeral("4").output).toBe("IV");
    expect(convertToRomanNumeral("9").output).toBe("IX");
    expect(convertToRomanNumeral("12").output).toBe("XII");
    expect(convertToRomanNumeral("49").output).toBe("XLIX");
    expect(convertToRomanNumeral("944").output).toBe("CMXLIV");
    expect(convertToRomanNumeral("2024").output).toBe("MMXXIV");
    expect(convertToRomanNumeral("3999").output).toBe("MMMCMXCIX");
  });

  it("rejects invalid and out-of-range values", () => {
    expect(convertToRomanNumeral("0").ok).toBe(false);
    expect(convertToRomanNumeral("0").error).toBe("invalid");
    expect(convertToRomanNumeral("-1").ok).toBe(false);
    expect(convertToRomanNumeral("-1").error).toBe("invalid");
    expect(convertToRomanNumeral("4000").ok).toBe(false);
    expect(convertToRomanNumeral("4000").error).toBe("out-of-range");
  });

  it("requires a quick-input prefix", () => {
    expect(parseQuickInput("r 12").latex).toBe("XII");
    expect(parseQuickInput("roman 12").latex).toBe("XII");
    expect(parseQuickInput("罗马 12").latex).toBe("XII");
    expect(parseQuickInput("罗马 1999").latex).toBe("MCMXCIX");
    expect(parseQuickInput("罗马 3999").latex).toBe("MMMCMXCIX");
    expect(parseQuickInput("r 12").outputFormat).toBe("text");
    expect(parseQuickInput("12").kind).not.toBe("roman");
  });

  it("returns invalid quick-input Roman results", () => {
    expect(parseQuickInput("r 0").error).toBe("invalid");
    expect(parseQuickInput("r -1").error).toBe("invalid");
    expect(parseQuickInput("r 4000").error).toBe("out-of-range");
  });
});
