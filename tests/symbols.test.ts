import { describe, expect, it } from "vitest";
import { searchSymbols } from "../src/core/symbols";

describe("searchSymbols", () => {
  it("finds common Chinese relation symbols", () => {
    expect(searchSymbols("可逆")[0]?.latex).toBe("\\rightleftharpoons");
    expect(searchSymbols("远大于")[0]?.latex).toBe("\\gg");
    expect(searchSymbols("约等于")[0]?.latex).toBe("\\approx");
    expect(searchSymbols("成正比")[0]?.latex).toBe("\\propto");
    expect(searchSymbols("沉淀")[0]?.latex).toBe("\\downarrow");
    expect(searchSymbols("气体")[0]?.latex).toBe("\\uparrow");
    expect(searchSymbols("加热")[0]?.latex).toBe("\\xrightarrow{\\Delta}");
  });

  it("finds aliases", () => {
    expect(searchSymbols("可逆反应")[0]?.latex).toBe("\\rightleftharpoons");
    expect(searchSymbols("正比于")[0]?.latex).toBe("\\propto");
  });
});
