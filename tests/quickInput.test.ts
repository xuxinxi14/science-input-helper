import { describe, expect, it } from "vitest";
import { parseQuickInput } from "../src/core/quickInput";

describe("parseQuickInput", () => {
  it("uses explicit prefixes", () => {
    expect(parseQuickInput("c H2SO4").latex).toBe("\\mathrm{H_2SO_4}");
    expect(parseQuickInput("u 9.8m/s2").latex).toBe("9.8\\,\\mathrm{m/s^2}");
    expect(parseQuickInput("raw E=mc^2").latex).toBe("E=mc^2");
  });

  it("uses Chinese prefixes", () => {
    expect(parseQuickInput("化 H2SO4").latex).toBe("\\mathrm{H_2SO_4}");
    expect(parseQuickInput("化 Ca(OH)2").latex).toBe("\\mathrm{Ca(OH)_2}");
    expect(parseQuickInput("化 NH4+").latex).toBe("\\mathrm{NH_4^{+}}");
    expect(parseQuickInput("化 OH-").latex).toBe("\\mathrm{OH^{-}}");
    expect(parseQuickInput("化 NO3-").latex).toBe("\\mathrm{NO_3^{-}}");
    expect(parseQuickInput("化 SO4 2-").latex).toBe("\\mathrm{SO_4^{2-}}");
    expect(parseQuickInput("化 CH3COO-").latex).toBe("\\mathrm{CH_3COO^{-}}");
    expect(parseQuickInput("化 CH3CH2OH").latex).toBe("\\mathrm{CH_3CH_2OH}");
    expect(parseQuickInput("化 CH3COOC2H5").latex).toBe("\\mathrm{CH_3COOC_2H_5}");
    expect(parseQuickInput("单位 9.8m/s2").latex).toBe("9.8\\,\\mathrm{m/s^2}");
    expect(parseQuickInput("单位 1.0g/mL").latex).toBe("1.0\\,\\mathrm{g/mL}");
    expect(parseQuickInput("单位 0.1mol/L").latex).toBe("0.1\\,\\mathrm{mol/L}");
    expect(parseQuickInput("单位 6.02e23 mol-1").latex).toBe("6.02\\times10^{23}\\,\\mathrm{mol^{-1}}");
    expect(parseQuickInput("物 动能").latex).toBe("E_k=\\frac{1}{2}mv^2");
    expect(parseQuickInput("物 动量").latex).toBe("p=mv");
    expect(parseQuickInput("物 自由落体").latex).toBe("v=gt,\\ h=\\frac{1}{2}gt^2");
    expect(parseQuickInput("化学 pH").latex).toBe("\\mathrm{pH}=-\\lg[H^+]");
    expect(parseQuickInput("生化 ATP水解").latex).toBe("\\mathrm{ATP + H_2O \\rightarrow ADP + P_i + H^+}");
    expect(parseQuickInput("原 E=mc^2").latex).toBe("E=mc^2");
  });

  it("shows quick input help", () => {
    const help = parseQuickInput("help");

    expect(help.kind).toBe("help");
    expect(help.helpLines?.some((line) => line.includes("化 / c"))).toBe(true);
    expect(parseQuickInput("帮助").kind).toBe("help");
  });

  it("uses Greek prefixes", () => {
    expect(parseQuickInput("g alpha").latex).toBe("\\alpha");
    expect(parseQuickInput("g 阿尔法").latex).toBe("\\alpha");
    expect(parseQuickInput("希 alpha").latex).toBe("\\alpha");
    expect(parseQuickInput("希 阿尔法").latex).toBe("\\alpha");
    expect(parseQuickInput("希 Delta").latex).toBe("\\Delta");
    expect(parseQuickInput("希 大写欧米伽").latex).toBe("\\Omega");
  });

  it("auto-detects Greek letters before templates", () => {
    expect(parseQuickInput("alpha").latex).toBe("\\alpha");
    expect(parseQuickInput("阿尔法").latex).toBe("\\alpha");
    expect(parseQuickInput("Delta").latex).toBe("\\Delta");
    expect(parseQuickInput("希腊字母").suggestions.length).toBeGreaterThan(10);
    expect(parseQuickInput("greek").suggestions.length).toBeGreaterThan(10);
  });

  it("auto-detects math structures after Greek letters", () => {
    expect(parseQuickInput("根号 x+1").kind).toBe("math");
    expect(parseQuickInput("根号 x+1").latex).toBe("\\sqrt{x+1}");
    expect(parseQuickInput("sqrt3 x+1").latex).toBe("\\sqrt[3]{x+1}");
    expect(parseQuickInput("分式 a+b / c+d").latex).toBe("\\frac{a+b}{c+d}");
    expect(parseQuickInput("括号 x+1").latex).toBe("\\left(x+1\\right)");
    expect(parseQuickInput("绝对值 x-1").latex).toBe("\\left|x-1\\right|");
  });

  it("prefers simple variable notation before chemical auto-detection", () => {
    const singleLetter = parseQuickInput("S");
    const subscript = parseQuickInput("v1");
    const uppercaseSubscript = parseQuickInput("S1");

    expect(singleLetter.kind).toBe("math");
    expect(singleLetter.latex).toBe("S");
    expect(singleLetter.outputFormat).toBe("latex");
    expect(subscript.kind).toBe("math");
    expect(subscript.latex).toBe("v_1");
    expect(subscript.suggestions[0]?.latex).toBe("v_1");
    expect(subscript.suggestions[1]?.latex).toBe("v^1");
    expect(uppercaseSubscript.latex).toBe("S_1");
    expect(parseQuickInput("H2O").kind).toBe("chemical");
    expect(parseQuickInput("化 S1").latex).toBe("\\mathrm{S_1}");
  });

  it("auto-detects reaction condition arrows before symbols", () => {
    expect(parseQuickInput("可逆[加热]").kind).toBe("reaction");
    expect(parseQuickInput("可逆[加热]").latex).toBe("\\overset{\\Delta}{\\rightleftharpoons}");
    expect(parseQuickInput("可逆[加热][浓硫酸]").latex).toBe(
      "\\overset{\\Delta}{\\underset{\\mathrm{浓硫酸}}{\\rightleftharpoons}}"
    );
    expect(parseQuickInput("生成[光照]").latex).toBe("\\xrightarrow{h\\nu}");
    expect(parseQuickInput("eq[heat][H2SO4]").latex).toBe(
      "\\overset{\\Delta}{\\underset{\\mathrm{H_2SO_4}}{\\rightleftharpoons}}"
    );
    expect(parseQuickInput("反应 2H2 + O2 生成[点燃] 2H2O").latex).toBe(
      "\\mathrm{2H_2 + O_2} \\xrightarrow{\\mathrm{点燃}} \\mathrm{2H_2O}"
    );
  });

  it("supports quick input Greek Unicode mode", () => {
    const result = parseQuickInput("alpha", { greekOutputMode: "unicode" });

    expect(result.latex).toBe("α");
    expect(result.outputFormat).toBe("text");
  });

  it("searches category templates with prefixes", () => {
    const physics = parseQuickInput("p 动能");
    const chemistry = parseQuickInput("ch pH");
    const biology = parseQuickInput("b ATP水解");

    expect(physics.kind).toBe("template");
    expect(physics.latex).toBe("E_k=\\frac{1}{2}mv^2");
    expect(chemistry.latex).toBe("\\mathrm{pH}=-\\lg[H^+]");
    expect(biology.latex).toBe("\\mathrm{ATP + H_2O \\rightarrow ADP + P_i + H^+}");
  });

  it("auto-detects common inputs", () => {
    expect(parseQuickInput("H2O").kind).toBe("chemical");
    expect(parseQuickInput("H2O").latex).toBe("\\mathrm{H_2O}");
    expect(parseQuickInput("2H2O").kind).toBe("chemical");
    expect(parseQuickInput("2H2O").latex).toBe("\\mathrm{2H_2O}");
    expect(parseQuickInput("2H2 + O2 -> 2H2O").kind).toBe("chemical");
    expect(parseQuickInput("2H2 + O2 -> 2H2O").latex).toBe("\\mathrm{2H_2 + O_2 \\rightarrow 2H_2O}");
    expect(parseQuickInput("6.02e23 mol-1").kind).toBe("unit");
    expect(parseQuickInput("300K").kind).toBe("unit");
    expect(parseQuickInput("300K").latex).toBe("300\\,\\mathrm{K}");
    expect(parseQuickInput("动能").kind).toBe("template");
    expect(parseQuickInput("G6P").latex).toBe("\\mathrm{G\\text{-}6\\text{-}P}");
  });

  it("auto-detects Chinese symbol names", () => {
    expect(parseQuickInput("可逆").kind).toBe("symbol");
    expect(parseQuickInput("可逆").latex).toBe("\\rightleftharpoons");
    expect(parseQuickInput("远大于").latex).toBe("\\gg");
    expect(parseQuickInput("约等于").latex).toBe("\\approx");
    expect(parseQuickInput("成正比").latex).toBe("\\propto");
  });
});
