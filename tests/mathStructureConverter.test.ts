import { describe, expect, it } from "vitest";
import {
  convertSlashToFraction,
  parseMathStructureQuickInput,
  toFraction,
  wrapAsSubscript,
  wrapAsSuperscript,
  wrapWithAbsoluteValue,
  wrapWithBraces,
  wrapWithBrackets,
  wrapWithNorm,
  wrapWithNthRoot,
  wrapWithOverrightarrow,
  wrapWithParentheses,
  wrapWithSqrt,
  wrapWithVector
} from "../src/converters/mathStructureConverter";

describe("mathStructureConverter", () => {
  it("wraps root structures", () => {
    expect(wrapWithSqrt("b^2-4ac")).toBe("\\sqrt{b^2-4ac}");
    expect(wrapWithNthRoot("x+1", "3")).toBe("\\sqrt[3]{x+1}");
  });

  it("converts fractions with first-slash rule", () => {
    expect(toFraction("a+b", "c+d")).toBe("\\frac{a+b}{c+d}");
    expect(convertSlashToFraction("x^2+2x+1 / x-1")).toBe("\\frac{x^2+2x+1}{x-1}");
    expect(convertSlashToFraction("a/b/c")).toBe("\\frac{a}{b/c}");
    expect(convertSlashToFraction("abc")).toBeNull();
  });

  it("wraps delimiters and unary structures", () => {
    expect(wrapWithParentheses("x+1")).toBe("\\left(x+1\\right)");
    expect(wrapWithBrackets("x+1")).toBe("\\left[x+1\\right]");
    expect(wrapWithBraces("x+1")).toBe("\\left\\{x+1\\right\\}");
    expect(wrapWithAbsoluteValue("x-1")).toBe("\\left|x-1\\right|");
    expect(wrapWithNorm("v")).toBe("\\left\\|v\\right\\|");
    expect(wrapWithVector("v")).toBe("\\vec{v}");
    expect(wrapWithOverrightarrow("AB")).toBe("\\overrightarrow{AB}");
    expect(wrapAsSuperscript("n+1")).toBe("^{n+1}");
    expect(wrapAsSubscript("i=1")).toBe("_{i=1}");
  });

  it("parses quick input structures", () => {
    expect(parseMathStructureQuickInput("根号 x+1")?.latex).toBe("\\sqrt{x+1}");
    expect(parseMathStructureQuickInput("三次根号 x+1")?.latex).toBe("\\sqrt[3]{x+1}");
    expect(parseMathStructureQuickInput("sqrt3 x+1")?.latex).toBe("\\sqrt[3]{x+1}");
    expect(parseMathStructureQuickInput("n次根号 x+1")?.latex).toBe("\\sqrt[n]{x+1}");
    expect(parseMathStructureQuickInput("分式 a+b / c+d")?.latex).toBe("\\frac{a+b}{c+d}");
    expect(parseMathStructureQuickInput("frac a+b / c+d")?.latex).toBe("\\frac{a+b}{c+d}");
    expect(parseMathStructureQuickInput("数 分式 a+b / c+d")?.latex).toBe("\\frac{a+b}{c+d}");
    expect(parseMathStructureQuickInput("m frac a+b / c+d")?.latex).toBe("\\frac{a+b}{c+d}");
    expect(parseMathStructureQuickInput("括号 x+1")?.latex).toBe("\\left(x+1\\right)");
    expect(parseMathStructureQuickInput("方括号 x+1")?.latex).toBe("\\left[x+1\\right]");
    expect(parseMathStructureQuickInput("大括号 x+1")?.latex).toBe("\\left\\{x+1\\right\\}");
    expect(parseMathStructureQuickInput("绝对值 x-1")?.latex).toBe("\\left|x-1\\right|");
    expect(parseMathStructureQuickInput("范数 v")?.latex).toBe("\\left\\|v\\right\\|");
    expect(parseMathStructureQuickInput("向量 v")?.latex).toBe("\\vec{v}");
    expect(parseMathStructureQuickInput("线段 AB")?.latex).toBe("\\overrightarrow{AB}");
    expect(parseMathStructureQuickInput("上标 n+1")?.latex).toBe("^{n+1}");
    expect(parseMathStructureQuickInput("下标 i=1")?.latex).toBe("_{i=1}");
    expect(parseMathStructureQuickInput("sup n+1")?.latex).toBe("^{n+1}");
    expect(parseMathStructureQuickInput("sub i=1")?.latex).toBe("_{i=1}");
  });
});
