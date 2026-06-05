import { describe, expect, it } from "vitest";
import { formatUnitExpression } from "../src/core/unitFormatter";

describe("formatUnitExpression", () => {
  it("formats units with positive exponents", () => {
    expect(formatUnitExpression("9.8m/s2")).toBe("9.8\\,\\mathrm{m/s^2}");
  });

  it("formats scientific notation and negative exponents", () => {
    expect(formatUnitExpression("6.02e23 mol-1")).toBe("6.02\\times10^{23}\\,\\mathrm{mol^{-1}}");
  });

  it("formats compact number-unit input", () => {
    expect(formatUnitExpression("1.0mol/L")).toBe("1.0\\,\\mathrm{mol/L}");
  });

  it("formats additional classroom unit examples", () => {
    expect(formatUnitExpression("1e-3 mol/L")).toBe("1\\times10^{-3}\\,\\mathrm{mol/L}");
    expect(formatUnitExpression("37°C")).toBe("37\\,^{\\circ}\\mathrm{C}");
    expect(formatUnitExpression("8.314J/(mol K)")).toBe("8.314\\,\\mathrm{J/(mol\\,K)}");
    expect(formatUnitExpression("1.0g/mL")).toBe("1.0\\,\\mathrm{g/mL}");
    expect(formatUnitExpression("0.1mol/L")).toBe("0.1\\,\\mathrm{mol/L}");
    expect(formatUnitExpression("6.02e23 mol-1")).toBe("6.02\\times10^{23}\\,\\mathrm{mol^{-1}}");
  });
});
