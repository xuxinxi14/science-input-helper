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
    id: "physics-electric-work",
    category: "physics",
    title: "电功",
    aliases: ["电能", "电流做功"],
    latex: "W=UIt"
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
    id: "physics-average-velocity",
    category: "physics",
    title: "平均速度",
    aliases: ["位移时间", "速度定义", "平均速率"],
    latex: "\\bar{v}=\\frac{\\Delta x}{\\Delta t}"
  },
  {
    id: "physics-speed",
    category: "physics",
    title: "速度",
    aliases: ["路程时间", "速率", "初中速度"],
    latex: "v=\\frac{s}{t}"
  },
  {
    id: "physics-acceleration-definition",
    category: "physics",
    title: "加速度",
    aliases: ["加速度定义", "速度变化率"],
    latex: "a=\\frac{\\Delta v}{\\Delta t}"
  },
  {
    id: "physics-constant-acceleration-velocity",
    category: "physics",
    title: "匀变速速度公式",
    aliases: ["匀加速速度", "末速度", "v=v0+at"],
    latex: "v=v_0+at"
  },
  {
    id: "physics-constant-acceleration-displacement",
    category: "physics",
    title: "匀变速位移公式",
    aliases: ["匀加速位移", "位移公式", "x=v0t"],
    latex: "\\Delta x=v_0t+\\frac{1}{2}at^2"
  },
  {
    id: "physics-constant-acceleration-no-time",
    category: "physics",
    title: "速度位移关系",
    aliases: ["无时间公式", "速度平方", "v2"],
    latex: "v^2-v_0^2=2a\\Delta x"
  },
  {
    id: "physics-free-fall",
    category: "physics",
    title: "自由落体",
    aliases: ["自由落体运动", "自由下落", "落体"],
    latex: "v=gt,\\ h=\\frac{1}{2}gt^2"
  },
  {
    id: "physics-projectile-motion",
    category: "physics",
    title: "平抛运动",
    aliases: ["抛体运动", "水平抛出", "平抛"],
    latex: "x=v_0t,\\ y=\\frac{1}{2}gt^2"
  },
  {
    id: "physics-vertical-throw",
    category: "physics",
    title: "竖直上抛",
    aliases: ["上抛运动", "竖直抛体"],
    latex: "v^2=v_0^2-2gh"
  },
  {
    id: "physics-gravity",
    category: "physics",
    title: "重力",
    aliases: ["重力公式", "重量"],
    latex: "G=mg"
  },
  {
    id: "physics-hookes-law",
    category: "physics",
    title: "胡克定律",
    aliases: ["弹簧力", "弹力", "回复力"],
    latex: "F=kx"
  },
  {
    id: "physics-friction",
    category: "physics",
    title: "滑动摩擦力",
    aliases: ["摩擦力", "动摩擦", "摩擦因数"],
    latex: "f=\\mu N"
  },
  {
    id: "physics-centripetal-acceleration",
    category: "physics",
    title: "向心加速度",
    aliases: ["圆周运动加速度", "圆周加速度"],
    latex: "a_c=\\frac{v^2}{r}=\\omega^2r"
  },
  {
    id: "physics-centripetal-force",
    category: "physics",
    title: "向心力",
    aliases: ["圆周运动", "圆周运动合力"],
    latex: "F_c=m\\frac{v^2}{r}=m\\omega^2r"
  },
  {
    id: "physics-universal-gravitation",
    category: "physics",
    title: "万有引力",
    aliases: ["引力定律", "牛顿万有引力"],
    latex: "F=G\\frac{m_1m_2}{r^2}"
  },
  {
    id: "physics-work",
    category: "physics",
    title: "功",
    aliases: ["力做功", "做功"],
    latex: "W=Fs\\cos\\theta"
  },
  {
    id: "physics-mechanical-power",
    category: "physics",
    title: "功率",
    aliases: ["机械功率", "瞬时功率"],
    latex: "P=\\frac{W}{t}=Fv"
  },
  {
    id: "physics-elastic-potential-energy",
    category: "physics",
    title: "弹性势能",
    aliases: ["弹簧势能", "弹簧能量"],
    latex: "E_p=\\frac{1}{2}kx^2"
  },
  {
    id: "physics-mechanical-energy-conservation",
    category: "physics",
    title: "机械能守恒",
    aliases: ["机械能", "能量守恒"],
    latex: "E_{k1}+E_{p1}=E_{k2}+E_{p2}"
  },
  {
    id: "physics-mechanical-efficiency",
    category: "physics",
    title: "机械效率",
    aliases: ["效率", "有用功", "总功"],
    latex: "\\eta=\\frac{W_{\\text{有}}}{W_{\\text{总}}}\\times100\\%"
  },
  {
    id: "physics-momentum",
    category: "physics",
    title: "动量",
    aliases: ["线动量", "momentum"],
    latex: "p=mv"
  },
  {
    id: "physics-impulse",
    category: "physics",
    title: "冲量",
    aliases: ["impulse", "力的冲量"],
    latex: "I=F\\Delta t"
  },
  {
    id: "physics-impulse-momentum-theorem",
    category: "physics",
    title: "动量定理",
    aliases: ["冲量定理", "冲量动量"],
    latex: "F\\Delta t=\\Delta p"
  },
  {
    id: "physics-momentum-conservation",
    category: "physics",
    title: "动量守恒",
    aliases: ["碰撞", "爆炸", "系统动量"],
    latex: "m_1v_1+m_2v_2=m_1v_1'+m_2v_2'"
  },
  {
    id: "physics-angular-velocity",
    category: "physics",
    title: "角速度",
    aliases: ["转动角速度", "omega"],
    latex: "\\omega=\\frac{\\Delta\\theta}{\\Delta t}"
  },
  {
    id: "physics-linear-angular-speed",
    category: "physics",
    title: "线速度角速度",
    aliases: ["线速度", "v=omega r"],
    latex: "v=\\omega r"
  },
  {
    id: "physics-torque",
    category: "physics",
    title: "力矩",
    aliases: ["转矩", "torque"],
    latex: "M=FL"
  },
  {
    id: "physics-rotational-kinetic-energy",
    category: "physics",
    title: "转动动能",
    aliases: ["转动能量", "刚体动能"],
    latex: "E_k=\\frac{1}{2}I\\omega^2"
  },
  {
    id: "physics-simple-harmonic-motion",
    category: "physics",
    title: "简谐运动",
    aliases: ["振动方程", "SHM"],
    latex: "x=A\\cos(\\omega t+\\varphi)"
  },
  {
    id: "physics-spring-period",
    category: "physics",
    title: "弹簧振子周期",
    aliases: ["弹簧振子", "弹簧周期"],
    latex: "T=2\\pi\\sqrt{\\frac{m}{k}}"
  },
  {
    id: "physics-pendulum-period",
    category: "physics",
    title: "单摆周期",
    aliases: ["单摆", "摆长"],
    latex: "T=2\\pi\\sqrt{\\frac{l}{g}}"
  },
  {
    id: "physics-period-frequency",
    category: "physics",
    title: "周期频率",
    aliases: ["频率周期", "T=1/f"],
    latex: "T=\\frac{1}{f}"
  },
  {
    id: "physics-refraction-law",
    category: "physics",
    title: "折射定律",
    aliases: ["斯涅尔定律", "Snell"],
    latex: "n_1\\sin\\theta_1=n_2\\sin\\theta_2"
  },
  {
    id: "physics-refractive-index",
    category: "physics",
    title: "折射率",
    aliases: ["光速折射率", "介质光速"],
    latex: "n=\\frac{c}{v}"
  },
  {
    id: "physics-thin-lens-equation",
    category: "physics",
    title: "薄透镜公式",
    aliases: ["透镜成像", "透镜公式"],
    latex: "\\frac{1}{f}=\\frac{1}{u}+\\frac{1}{v}"
  },
  {
    id: "physics-magnification",
    category: "physics",
    title: "放大率",
    aliases: ["成像放大率", "像高物高"],
    latex: "m=\\frac{h'}{h}=\\frac{v}{u}"
  },
  {
    id: "physics-heat-capacity",
    category: "physics",
    title: "热量",
    aliases: ["比热容", "吸热放热"],
    latex: "Q=cm\\Delta T"
  },
  {
    id: "physics-latent-heat",
    category: "physics",
    title: "潜热",
    aliases: ["熔化热", "汽化热", "相变热"],
    latex: "Q=mL"
  },
  {
    id: "physics-pressure",
    category: "physics",
    title: "压强",
    aliases: ["压力压强", "压力面积"],
    latex: "p=\\frac{F}{S}"
  },
  {
    id: "physics-density",
    category: "physics",
    title: "密度",
    aliases: ["质量体积", "rho"],
    latex: "\\rho=\\frac{m}{V}"
  },
  {
    id: "physics-liquid-pressure",
    category: "physics",
    title: "液体压强",
    aliases: ["液压", "深度压强"],
    latex: "p=\\rho gh"
  },
  {
    id: "physics-buoyancy",
    category: "physics",
    title: "浮力",
    aliases: ["阿基米德原理", "排开液体"],
    latex: "F_{\\text{浮}}=\\rho gV_{\\text{排}}"
  },
  {
    id: "physics-coulombs-law",
    category: "physics",
    title: "库仑定律",
    aliases: ["静电力", "电荷力"],
    latex: "F=k\\frac{q_1q_2}{r^2}"
  },
  {
    id: "physics-electric-field",
    category: "physics",
    title: "电场强度",
    aliases: ["场强", "电场"],
    latex: "E=\\frac{F}{q}"
  },
  {
    id: "physics-point-charge-electric-field",
    category: "physics",
    title: "点电荷电场",
    aliases: ["点电荷场强"],
    latex: "E=k\\frac{Q}{r^2}"
  },
  {
    id: "physics-electric-potential-difference",
    category: "physics",
    title: "电势差",
    aliases: ["电压定义", "电势能"],
    latex: "U=\\frac{W}{q}"
  },
  {
    id: "physics-capacitance",
    category: "physics",
    title: "电容",
    aliases: ["电容定义", "电容量"],
    latex: "C=\\frac{Q}{U}"
  },
  {
    id: "physics-resistance-law",
    category: "physics",
    title: "电阻定律",
    aliases: ["电阻率", "导体电阻"],
    latex: "R=\\rho\\frac{l}{S}"
  },
  {
    id: "physics-joules-law",
    category: "physics",
    title: "焦耳定律",
    aliases: ["电热", "电流热效应"],
    latex: "Q=I^2Rt"
  },
  {
    id: "physics-series-resistance",
    category: "physics",
    title: "串联电阻",
    aliases: ["串联", "总电阻"],
    latex: "R=R_1+R_2+\\cdots"
  },
  {
    id: "physics-parallel-resistance",
    category: "physics",
    title: "并联电阻",
    aliases: ["并联", "并联总电阻"],
    latex: "\\frac{1}{R}=\\frac{1}{R_1}+\\frac{1}{R_2}+\\cdots"
  },
  {
    id: "physics-lorentz-force",
    category: "physics",
    title: "洛伦兹力",
    aliases: ["磁场力", "带电粒子磁场"],
    latex: "F=qvB\\sin\\theta"
  },
  {
    id: "physics-ampere-force",
    category: "physics",
    title: "安培力",
    aliases: ["通电导线", "磁场安培力"],
    latex: "F=BIL\\sin\\theta"
  },
  {
    id: "physics-magnetic-flux",
    category: "physics",
    title: "磁通量",
    aliases: ["磁通", "flux"],
    latex: "\\Phi=BS\\cos\\theta"
  },
  {
    id: "physics-faradays-law",
    category: "physics",
    title: "法拉第电磁感应定律",
    aliases: ["电磁感应", "感应电动势", "法拉第定律"],
    latex: "\\mathcal{E}=-\\frac{\\Delta\\Phi}{\\Delta t}"
  },
  {
    id: "physics-photon-energy",
    category: "physics",
    title: "光子能量",
    aliases: ["普朗克", "光电效应", "E=hv"],
    latex: "E=h\\nu"
  },
  {
    id: "physics-de-broglie-wavelength",
    category: "physics",
    title: "德布罗意波长",
    aliases: ["物质波", "德布罗意"],
    latex: "\\lambda=\\frac{h}{p}"
  },
  {
    id: "physics-mass-energy",
    category: "physics",
    title: "质能方程",
    aliases: ["质能关系", "爱因斯坦", "E=mc2"],
    latex: "E=mc^2"
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
