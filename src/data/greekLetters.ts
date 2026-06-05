export type GreekLetterKind = "lowercase" | "uppercase" | "variant";

export type GreekOutputMode = "latex" | "unicode";

export interface GreekLetterEntry {
  id: string;
  english: string;
  chinese: string;
  unicode: string;
  latex: string;
  kind: GreekLetterKind;
  aliases: string[];
}

export const GREEK_LETTERS: GreekLetterEntry[] = [
  {
    id: "alpha",
    english: "alpha",
    chinese: "阿尔法",
    unicode: "α",
    latex: "\\alpha",
    kind: "lowercase",
    aliases: ["阿法"]
  },
  {
    id: "beta",
    english: "beta",
    chinese: "贝塔",
    unicode: "β",
    latex: "\\beta",
    kind: "lowercase",
    aliases: []
  },
  {
    id: "gamma",
    english: "gamma",
    chinese: "伽马",
    unicode: "γ",
    latex: "\\gamma",
    kind: "lowercase",
    aliases: []
  },
  {
    id: "delta",
    english: "delta",
    chinese: "德尔塔",
    unicode: "δ",
    latex: "\\delta",
    kind: "lowercase",
    aliases: []
  },
  {
    id: "theta",
    english: "theta",
    chinese: "西塔",
    unicode: "θ",
    latex: "\\theta",
    kind: "lowercase",
    aliases: ["希塔"]
  },
  {
    id: "lambda",
    english: "lambda",
    chinese: "拉姆达",
    unicode: "λ",
    latex: "\\lambda",
    kind: "lowercase",
    aliases: ["兰布达"]
  },
  {
    id: "mu",
    english: "mu",
    chinese: "缪",
    unicode: "μ",
    latex: "\\mu",
    kind: "lowercase",
    aliases: ["谬"]
  },
  {
    id: "pi",
    english: "pi",
    chinese: "派",
    unicode: "π",
    latex: "\\pi",
    kind: "lowercase",
    aliases: []
  },
  {
    id: "sigma",
    english: "sigma",
    chinese: "西格玛",
    unicode: "σ",
    latex: "\\sigma",
    kind: "lowercase",
    aliases: []
  },
  {
    id: "omega",
    english: "omega",
    chinese: "欧米伽",
    unicode: "ω",
    latex: "\\omega",
    kind: "lowercase",
    aliases: ["欧米加"]
  },
  {
    id: "Gamma",
    english: "Gamma",
    chinese: "大写伽马",
    unicode: "Γ",
    latex: "\\Gamma",
    kind: "uppercase",
    aliases: ["大写gamma"]
  },
  {
    id: "Delta",
    english: "Delta",
    chinese: "大写德尔塔",
    unicode: "Δ",
    latex: "\\Delta",
    kind: "uppercase",
    aliases: ["大写delta"]
  },
  {
    id: "Theta",
    english: "Theta",
    chinese: "大写西塔",
    unicode: "Θ",
    latex: "\\Theta",
    kind: "uppercase",
    aliases: ["大写theta", "大写希塔"]
  },
  {
    id: "Lambda",
    english: "Lambda",
    chinese: "大写拉姆达",
    unicode: "Λ",
    latex: "\\Lambda",
    kind: "uppercase",
    aliases: ["大写lambda", "大写兰布达"]
  },
  {
    id: "Pi",
    english: "Pi",
    chinese: "大写派",
    unicode: "Π",
    latex: "\\Pi",
    kind: "uppercase",
    aliases: ["大写pi"]
  },
  {
    id: "Sigma",
    english: "Sigma",
    chinese: "大写西格玛",
    unicode: "Σ",
    latex: "\\Sigma",
    kind: "uppercase",
    aliases: ["大写sigma"]
  },
  {
    id: "Phi",
    english: "Phi",
    chinese: "大写斐",
    unicode: "Φ",
    latex: "\\Phi",
    kind: "uppercase",
    aliases: ["大写phi", "大写菲"]
  },
  {
    id: "Omega",
    english: "Omega",
    chinese: "大写欧米伽",
    unicode: "Ω",
    latex: "\\Omega",
    kind: "uppercase",
    aliases: ["大写omega", "大写欧米加"]
  },
  {
    id: "varepsilon",
    english: "varepsilon",
    chinese: "变体epsilon",
    unicode: "ε",
    latex: "\\varepsilon",
    kind: "variant",
    aliases: ["变体艾普西龙", "变体ε"]
  },
  {
    id: "varphi",
    english: "varphi",
    chinese: "变体phi",
    unicode: "φ",
    latex: "\\varphi",
    kind: "variant",
    aliases: ["变体斐", "变体菲"]
  },
  {
    id: "vartheta",
    english: "vartheta",
    chinese: "变体theta",
    unicode: "ϑ",
    latex: "\\vartheta",
    kind: "variant",
    aliases: ["变体西塔", "变体希塔"]
  },
  {
    id: "varrho",
    english: "varrho",
    chinese: "变体rho",
    unicode: "ϱ",
    latex: "\\varrho",
    kind: "variant",
    aliases: ["变体柔"]
  },
  {
    id: "varsigma",
    english: "varsigma",
    chinese: "变体sigma",
    unicode: "ς",
    latex: "\\varsigma",
    kind: "variant",
    aliases: ["变体西格玛"]
  }
];
