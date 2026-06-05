export interface ScienceSymbol {
  id: string;
  title: string;
  aliases: string[];
  latex: string;
}

export const SCIENCE_SYMBOLS: ScienceSymbol[] = [
  {
    id: "reversible",
    title: "可逆",
    aliases: ["可逆反应", "平衡箭头", "可逆符号", "rightleftharpoons"],
    latex: "\\rightleftharpoons"
  },
  {
    id: "much-greater-than",
    title: "远大于",
    aliases: ["远远大于", "much greater than", "gg"],
    latex: "\\gg"
  },
  {
    id: "much-less-than",
    title: "远小于",
    aliases: ["远远小于", "much less than", "ll"],
    latex: "\\ll"
  },
  {
    id: "approximately-equal",
    title: "约等于",
    aliases: ["约为", "近似等于", "大约等于", "approx"],
    latex: "\\approx"
  },
  {
    id: "proportional-to",
    title: "成正比",
    aliases: ["正比于", "propto", "proportional"],
    latex: "\\propto"
  },
  {
    id: "not-equal",
    title: "不等于",
    aliases: ["不等", "ne", "neq"],
    latex: "\\ne"
  },
  {
    id: "greater-or-equal",
    title: "大于等于",
    aliases: ["不小于", "ge", "geq"],
    latex: "\\ge"
  },
  {
    id: "less-or-equal",
    title: "小于等于",
    aliases: ["不大于", "le", "leq"],
    latex: "\\le"
  },
  {
    id: "equivalent",
    title: "等价",
    aliases: ["当且仅当", "充要", "双箭头", "Leftrightarrow"],
    latex: "\\Leftrightarrow"
  },
  {
    id: "implies",
    title: "推出",
    aliases: ["推得", "蕴含", "Rightarrow"],
    latex: "\\Rightarrow"
  },
  {
    id: "identical",
    title: "恒等于",
    aliases: ["等价于", "三横等号", "equiv"],
    latex: "\\equiv"
  },
  {
    id: "similar",
    title: "相似",
    aliases: ["类似", "sim"],
    latex: "\\sim"
  },
  {
    id: "congruent",
    title: "全等",
    aliases: ["同余", "cong"],
    latex: "\\cong"
  },
  {
    id: "plus-minus",
    title: "正负",
    aliases: ["加减", "pm"],
    latex: "\\pm"
  },
  {
    id: "minus-plus",
    title: "负正",
    aliases: ["减加", "mp"],
    latex: "\\mp"
  },
  {
    id: "infinity",
    title: "无穷",
    aliases: ["无穷大", "infty"],
    latex: "\\infty"
  },
  {
    id: "because",
    title: "因为",
    aliases: ["because"],
    latex: "\\because"
  },
  {
    id: "therefore",
    title: "所以",
    aliases: ["因此", "therefore"],
    latex: "\\therefore"
  },
  {
    id: "belongs-to",
    title: "属于",
    aliases: ["in"],
    latex: "\\in"
  },
  {
    id: "not-belongs-to",
    title: "不属于",
    aliases: ["notin"],
    latex: "\\notin"
  },
  {
    id: "subset",
    title: "子集",
    aliases: ["包含于", "subset"],
    latex: "\\subset"
  },
  {
    id: "subset-equal",
    title: "子集等于",
    aliases: ["包含于等于", "subseteq"],
    latex: "\\subseteq"
  },
  {
    id: "empty-set",
    title: "空集",
    aliases: ["varnothing", "emptyset"],
    latex: "\\varnothing"
  },
  {
    id: "union",
    title: "并集",
    aliases: ["cup"],
    latex: "\\cup"
  },
  {
    id: "intersection",
    title: "交集",
    aliases: ["cap"],
    latex: "\\cap"
  },
  {
    id: "perpendicular",
    title: "垂直",
    aliases: ["perp"],
    latex: "\\perp"
  },
  {
    id: "parallel",
    title: "平行",
    aliases: ["parallel"],
    latex: "\\parallel"
  },
  {
    id: "angle",
    title: "角",
    aliases: ["angle"],
    latex: "\\angle"
  },
  {
    id: "degree",
    title: "度",
    aliases: ["角度", "摄氏度", "degree"],
    latex: "^{\\circ}"
  },
  {
    id: "right-arrow",
    title: "右箭头",
    aliases: ["箭头", "生成", "趋向", "rightarrow"],
    latex: "\\rightarrow"
  },
  {
    id: "precipitate",
    title: "沉淀",
    aliases: ["down", "沉淀符号"],
    latex: "\\downarrow"
  },
  {
    id: "gas",
    title: "气体",
    aliases: ["up", "气体符号"],
    latex: "\\uparrow"
  },
  {
    id: "heat",
    title: "加热",
    aliases: ["heat", "加热符号"],
    latex: "\\xrightarrow{\\Delta}"
  },
  {
    id: "left-arrow",
    title: "左箭头",
    aliases: ["leftarrow"],
    latex: "\\leftarrow"
  }
];

export function searchSymbols(query: string, limit = 8): ScienceSymbol[] {
  const normalizedQuery = normalizeSearchText(query);

  if (!normalizedQuery) {
    return SCIENCE_SYMBOLS.slice(0, limit);
  }

  return SCIENCE_SYMBOLS
    .map((symbol) => ({
      symbol,
      score: scoreSymbol(symbol, normalizedQuery)
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.symbol.title.localeCompare(b.symbol.title, "zh-CN"))
    .slice(0, limit)
    .map((entry) => entry.symbol);
}

function scoreSymbol(symbol: ScienceSymbol, query: string): number {
  const title = normalizeSearchText(symbol.title);
  const aliases = symbol.aliases.map(normalizeSearchText);
  const latex = normalizeSearchText(symbol.latex);

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
