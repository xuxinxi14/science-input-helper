import type { ScienceTemplate, TemplateCategory } from "../types";

export const SCIENCE_TEMPLATES: ScienceTemplate[] = [
  {
    id: "physics-newtons-second-law",
    category: "physics",
    title: "牛顿第二定律",
    aliases: ["牛二", "合外力", "加速度", "F=ma"],
    latex: "F=ma"
  },
  {
    id: "physics-kinetic-energy",
    category: "physics",
    title: "动能",
    aliases: ["机械能", "Ek"],
    latex: "E_k=\\frac{1}{2}mv^2"
  },
  {
    id: "physics-gravitational-potential-energy",
    category: "physics",
    title: "重力势能",
    aliases: ["势能", "Ep"],
    latex: "E_p=mgh"
  },
  {
    id: "physics-ohms-law",
    category: "physics",
    title: "欧姆定律",
    aliases: ["电流", "电压", "电阻", "Ohm"],
    latex: "I=\\frac{U}{R}"
  },
  {
    id: "physics-electric-power",
    category: "physics",
    title: "电功率",
    aliases: ["功率", "P=UI"],
    latex: "P=UI"
  },
  {
    id: "physics-wave-speed",
    category: "physics",
    title: "波速",
    aliases: ["波长", "频率"],
    latex: "v=\\lambda f"
  },
  {
    id: "physics-ideal-gas-law",
    category: "physics",
    title: "理想气体状态方程",
    aliases: ["气体方程", "克拉珀龙方程"],
    latex: "pV=nRT"
  },
  {
    id: "physics-sound-intensity-level",
    category: "physics",
    title: "声强级",
    aliases: ["分贝", "声强", "lg"],
    latex: "L=10\\lg\\frac{I}{I_0}"
  },
  {
    id: "chemistry-molar-concentration",
    category: "chemistry",
    title: "物质的量浓度",
    aliases: ["浓度", "摩尔浓度"],
    latex: "c=\\frac{n}{V}"
  },
  {
    id: "chemistry-ph",
    category: "chemistry",
    title: "pH",
    aliases: ["酸碱度", "氢离子浓度"],
    latex: "\\mathrm{pH}=-\\lg[H^+]"
  },
  {
    id: "chemistry-neutralization",
    category: "chemistry",
    title: "酸碱中和",
    aliases: ["中和反应", "氢离子", "氢氧根"],
    latex: "\\mathrm{H^+ + OH^- \\rightarrow H_2O}"
  },
  {
    id: "chemistry-equilibrium-constant",
    category: "chemistry",
    title: "平衡常数",
    aliases: ["化学平衡", "K"],
    latex: "K=\\frac{[C]^c[D]^d}{[A]^a[B]^b}"
  },
  {
    id: "biochemistry-atp-hydrolysis",
    category: "biochemistry",
    title: "ATP水解",
    aliases: ["ATP", "水解", "ADP"],
    latex: "\\mathrm{ATP + H_2O \\rightarrow ADP + P_i + H^+}"
  },
  {
    id: "biochemistry-nadh-oxidation",
    category: "biochemistry",
    title: "NADH氧化",
    aliases: ["NADH", "氧化", "NAD+"],
    latex: "\\mathrm{NADH + H^+ \\rightarrow NAD^+ + 2H}"
  },
  {
    id: "biochemistry-g6p",
    category: "biochemistry",
    title: "G6P",
    aliases: ["葡萄糖-6-磷酸", "glucose 6 phosphate"],
    latex: "\\mathrm{G\\text{-}6\\text{-}P}"
  },
  {
    id: "biochemistry-f6p",
    category: "biochemistry",
    title: "F6P",
    aliases: ["果糖-6-磷酸", "fructose 6 phosphate"],
    latex: "\\mathrm{F\\text{-}6\\text{-}P}"
  }
];

export interface TemplateSearchOptions {
  category?: TemplateCategory | "all";
  limit?: number;
}

export function searchTemplates(query: string, options: TemplateSearchOptions = {}): ScienceTemplate[] {
  const category = options.category ?? "all";
  const limit = options.limit ?? 20;
  const normalizedQuery = normalizeSearchText(query);
  const candidates = SCIENCE_TEMPLATES.filter((template) => {
    return category === "all" || template.category === category;
  });

  if (!normalizedQuery) {
    return candidates.slice(0, limit);
  }

  return candidates
    .map((template) => ({
      template,
      score: scoreTemplate(template, normalizedQuery)
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.template.title.localeCompare(b.template.title, "zh-CN"))
    .slice(0, limit)
    .map((entry) => entry.template);
}

function scoreTemplate(template: ScienceTemplate, query: string): number {
  const title = normalizeSearchText(template.title);
  const aliases = template.aliases.map(normalizeSearchText);
  const latex = normalizeSearchText(template.latex);

  if (title === query) {
    return 100;
  }

  if (aliases.some((alias) => alias === query)) {
    return 90;
  }

  if (title.includes(query)) {
    return 70;
  }

  if (aliases.some((alias) => alias.includes(query))) {
    return 60;
  }

  if (latex.includes(query)) {
    return 30;
  }

  return 0;
}

function normalizeSearchText(value: string): string {
  return value.toLowerCase().replace(/\s+/g, "");
}
