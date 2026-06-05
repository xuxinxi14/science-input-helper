import { describe, expect, it } from "vitest";
import { searchTemplates } from "../src/core/templates";

describe("searchTemplates", () => {
  it("finds physics templates by Chinese keywords", () => {
    expect(searchTemplates("牛顿第二定律")[0]?.latex).toBe("F=ma");
    expect(searchTemplates("动能")[0]?.latex).toBe("E_k=\\frac{1}{2}mv^2");
    expect(searchTemplates("动量")[0]?.latex).toBe("p=mv");
    expect(searchTemplates("自由落体")[0]?.latex).toBe("v=gt,\\ h=\\frac{1}{2}gt^2");
    expect(searchTemplates("向心力")[0]?.latex).toBe("F_c=m\\frac{v^2}{r}=m\\omega^2r");
    expect(searchTemplates("密度")[0]?.latex).toBe("\\rho=\\frac{m}{V}");
    expect(searchTemplates("浮力")[0]?.latex).toBe("F_{\\text{浮}}=\\rho gV_{\\text{排}}");
    expect(searchTemplates("库仑定律")[0]?.latex).toBe("F=k\\frac{q_1q_2}{r^2}");
    expect(searchTemplates("德布罗意")[0]?.latex).toBe("\\lambda=\\frac{h}{p}");
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
