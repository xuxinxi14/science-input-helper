import { describe, expect, it } from "vitest";
import { formatCondition } from "../src/converters/conditionFormatter";
import {
  convertFullReaction,
  makeReversibleArrow,
  parseReactionArrowInput
} from "../src/converters/reactionConditionConverter";

describe("formatCondition", () => {
  it("formats common reaction condition keywords", () => {
    expect(formatCondition("加热")).toBe("\\Delta");
    expect(formatCondition("heat")).toBe("\\Delta");
    expect(formatCondition("光照")).toBe("h\\nu");
    expect(formatCondition("hv")).toBe("h\\nu");
    expect(formatCondition("催化剂")).toBe("\\mathrm{cat.}");
    expect(formatCondition("浓硫酸")).toBe("\\mathrm{浓硫酸}");
  });

  it("formats chemical formula and temperature conditions", () => {
    expect(formatCondition("H2SO4")).toBe("\\mathrm{H_2SO_4}");
    expect(formatCondition("MnO2")).toBe("\\mathrm{MnO_2}");
    expect(formatCondition("Ni")).toBe("\\mathrm{Ni}");
    expect(formatCondition("Pt")).toBe("\\mathrm{Pt}");
    expect(formatCondition("Pd")).toBe("\\mathrm{Pd}");
    expect(formatCondition("170℃")).toBe("170\\,^{\\circ}\\mathrm{C}");
    expect(formatCondition("25°C")).toBe("25\\,^{\\circ}\\mathrm{C}");
  });
});

describe("reaction condition arrows", () => {
  it("formats reversible arrows", () => {
    expect(makeReversibleArrow()).toBe("\\rightleftharpoons");
    expect(parseReactionArrowInput("可逆")?.latex).toBe("\\rightleftharpoons");
    expect(parseReactionArrowInput("可逆[加热]")?.latex).toBe("\\overset{\\Delta}{\\rightleftharpoons}");
    expect(parseReactionArrowInput("可逆[加热][浓硫酸]")?.latex).toBe(
      "\\overset{\\Delta}{\\underset{\\mathrm{浓硫酸}}{\\rightleftharpoons}}"
    );
    expect(parseReactionArrowInput("可逆 上 加热 下 浓硫酸")?.latex).toBe(
      "\\overset{\\Delta}{\\underset{\\mathrm{浓硫酸}}{\\rightleftharpoons}}"
    );
    expect(parseReactionArrowInput("可逆 下 浓硫酸")?.latex).toBe(
      "\\underset{\\mathrm{浓硫酸}}{\\rightleftharpoons}"
    );
    expect(parseReactionArrowInput("eq 下 H2SO4")?.latex).toBe(
      "\\underset{\\mathrm{H_2SO_4}}{\\rightleftharpoons}"
    );
    expect(parseReactionArrowInput("eq[heat][H2SO4]")?.latex).toBe(
      "\\overset{\\Delta}{\\underset{\\mathrm{H_2SO_4}}{\\rightleftharpoons}}"
    );
  });

  it("formats right arrows", () => {
    expect(parseReactionArrowInput("生成[加热]")?.latex).toBe("\\xrightarrow{\\Delta}");
    expect(parseReactionArrowInput("生成[光照]")?.latex).toBe("\\xrightarrow{h\\nu}");
    expect(parseReactionArrowInput("生成[加热][催化剂]")?.latex).toBe("\\xrightarrow[\\mathrm{cat.}]{\\Delta}");
    expect(parseReactionArrowInput("ra[heat][cat]")?.latex).toBe("\\xrightarrow[\\mathrm{cat.}]{\\Delta}");
    expect(parseReactionArrowInput("-> [heat]")?.latex).toBe("\\xrightarrow{\\Delta}");
    expect(parseReactionArrowInput("生成 上 加热 下 催化剂")?.latex).toBe("\\xrightarrow[\\mathrm{cat.}]{\\Delta}");
  });

  it("formats simple full reactions", () => {
    const latex = convertFullReaction("反应 CH3COOH + C2H5OH 可逆[加热][浓硫酸] CH3COOC2H5 + H2O");

    expect(latex).toContain("\\mathrm{CH_3COOH + C_2H_5OH}");
    expect(latex).toContain("\\overset{\\Delta}{\\underset{\\mathrm{浓硫酸}}{\\rightleftharpoons}}");
    expect(latex).toContain("\\mathrm{CH_3COOC_2H_5 + H_2O}");
    expect(convertFullReaction("反应 2H2 + O2 生成[点燃] 2H2O")).toBe(
      "\\mathrm{2H_2 + O_2} \\xrightarrow{\\mathrm{点燃}} \\mathrm{2H_2O}"
    );
  });
});
