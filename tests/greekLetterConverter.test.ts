import { describe, expect, it } from "vitest";
import { convertGreekLetter, searchGreekLetters } from "../src/converters/greekLetterConverter";

describe("greekLetterConverter", () => {
  it("converts lowercase Greek letters by English and Chinese names", () => {
    expect(convertGreekLetter("alpha")?.output).toBe("\\alpha");
    expect(convertGreekLetter("阿尔法")?.output).toBe("\\alpha");
    expect(convertGreekLetter("delta")?.output).toBe("\\delta");
    expect(convertGreekLetter("omega")?.output).toBe("\\omega");
    expect(convertGreekLetter("欧米伽")?.output).toBe("\\omega");
  });

  it("converts uppercase Greek letters with explicit mappings", () => {
    expect(convertGreekLetter("Delta")?.output).toBe("\\Delta");
    expect(convertGreekLetter("大写delta")?.output).toBe("\\Delta");
    expect(convertGreekLetter("大写德尔塔")?.output).toBe("\\Delta");
  });

  it("converts variant Greek letters", () => {
    expect(convertGreekLetter("varphi")?.output).toBe("\\varphi");
    expect(convertGreekLetter("变体phi")?.output).toBe("\\varphi");
  });

  it("returns all Greek candidates for list keywords", () => {
    expect(searchGreekLetters("希腊字母").length).toBeGreaterThan(10);
    expect(searchGreekLetters("greek").length).toBeGreaterThan(10);
  });

  it("supports Unicode output mode", () => {
    expect(convertGreekLetter("alpha", { outputMode: "unicode" })?.output).toBe("α");
    expect(convertGreekLetter("阿尔法", { outputMode: "unicode" })?.output).toBe("α");
    expect(convertGreekLetter("Delta", { outputMode: "unicode" })?.output).toBe("Δ");
    expect(convertGreekLetter("大写delta", { outputMode: "unicode" })?.output).toBe("Δ");
    expect(convertGreekLetter("omega", { outputMode: "unicode" })?.output).toBe("ω");
  });
});
