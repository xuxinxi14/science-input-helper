import { describe, expect, it } from "vitest";
import { searchTemplates } from "../src/core/templates";

describe("searchTemplates", () => {
  it("finds physics templates by Chinese keywords", () => {
    expect(searchTemplates("牛顿第二定律")[0]?.latex).toBe("F=ma");
    expect(searchTemplates("动能")[0]?.latex).toBe("E_k=\\frac{1}{2}mv^2");
  });

  it("finds chemistry templates by Chinese and symbolic keywords", () => {
    expect(searchTemplates("物质的量浓度")[0]?.latex).toBe("c=\\frac{n}{V}");
    expect(searchTemplates("pH")[0]?.latex).toBe("\\mathrm{pH}=-\\lg[H^+]");
  });

  it("finds biochemistry templates", () => {
    expect(searchTemplates("ATP水解")[0]?.latex).toBe("\\mathrm{ATP + H_2O \\rightarrow ADP + P_i + H^+}");
    expect(searchTemplates("G6P")[0]?.latex).toBe("\\mathrm{G\\text{-}6\\text{-}P}");
  });
});
