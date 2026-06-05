import { describe, expect, it } from "vitest";
import { convertChemicalFormula } from "../src/core/chemicalFormula";

describe("convertChemicalFormula", () => {
  it("formats common neutral formulas with subscripts", () => {
    expect(convertChemicalFormula("H2O")).toBe("\\mathrm{H_2O}");
    expect(convertChemicalFormula("H2SO4")).toBe("\\mathrm{H_2SO_4}");
    expect(convertChemicalFormula("CaCO3")).toBe("\\mathrm{CaCO_3}");
    expect(convertChemicalFormula("Ca(OH)2")).toBe("\\mathrm{Ca(OH)_2}");
    expect(convertChemicalFormula("CH3COOH")).toBe("\\mathrm{CH_3COOH}");
    expect(convertChemicalFormula("CH3CH2OH")).toBe("\\mathrm{CH_3CH_2OH}");
    expect(convertChemicalFormula("CH3COOC2H5")).toBe("\\mathrm{CH_3COOC_2H_5}");
    expect(convertChemicalFormula("2H2O")).toBe("\\mathrm{2H_2O}");
    expect(convertChemicalFormula("2NaCl")).toBe("\\mathrm{2NaCl}");
    expect(convertChemicalFormula("CuSO4·5H2O")).toBe("\\mathrm{CuSO_4\\cdot 5H_2O}");
  });

  it("formats attached and separated ion charges", () => {
    expect(convertChemicalFormula("Fe3+")).toBe("\\mathrm{Fe^{3+}}");
    expect(convertChemicalFormula("NH4+")).toBe("\\mathrm{NH_4^{+}}");
    expect(convertChemicalFormula("OH-")).toBe("\\mathrm{OH^{-}}");
    expect(convertChemicalFormula("NO3-")).toBe("\\mathrm{NO_3^{-}}");
    expect(convertChemicalFormula("CH3COO-")).toBe("\\mathrm{CH_3COO^{-}}");
    expect(convertChemicalFormula("SO4 2-")).toBe("\\mathrm{SO_4^{2-}}");
    expect(convertChemicalFormula("Ca2+ + CO3 2-")).toBe("\\mathrm{Ca^{2+} + CO_3^{2-}}");
  });

  it("converts reaction arrows and state keywords", () => {
    expect(convertChemicalFormula("CaCO3 heat -> CaO + CO2 up")).toBe(
      "\\mathrm{CaCO_3 \\xrightarrow{\\Delta} \\rightarrow CaO + CO_2 \\uparrow}"
    );
    expect(convertChemicalFormula("2H2 + O2 -> 2H2O")).toBe("\\mathrm{2H_2 + O_2 \\rightarrow 2H_2O}");
    expect(convertChemicalFormula("A <-> B down")).toBe("\\mathrm{A \\rightleftharpoons B \\downarrow}");
  });
});
