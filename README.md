# Science Input Helper

<p align="right">
  <a href="#中文">中文</a> |
  <a href="#english">English</a>
</p>

Science Input Helper is an Obsidian plugin for Chinese science-course notes. It helps students quickly enter chemistry formulas, reaction-condition arrows, units, common physics/chemistry/biochemistry templates, Greek letters, Roman numerals, scientific symbols, and lightweight math structures.

Science Input Helper 是一个面向中文理科课程笔记的 Obsidian 插件，用于快速输入化学式、反应条件箭头、单位、常见公式模板、希腊字母、罗马数字、科学符号和轻量数学结构。

---

## 中文

<details open>
<summary><strong>展开 / 收起中文说明</strong></summary>

### 插件定位

Science Input Helper 补充 Latex Suite、Easy LaTeX、AI LaTeX Generator 等插件，而不是替代完整 LaTeX snippets 系统。

推荐分工：

| 任务 | 推荐工具 |
| --- | --- |
| 数学 snippets、矩阵、cases、复杂环境 | Latex Suite |
| 化学式、离子式、反应条件、单位、中文模板 | Science Input Helper |
| 希腊字母、罗马数字、常见科学符号 | Science Input Helper |
| 完整 LaTeX 语法补全和复杂公式编辑 | Latex Suite |
| 复杂公式转换后校对 | Latex Suite + 人工检查 |

本插件不接入 AI，不检查科学内容正确性，不自动配平化学方程式。

### 30 秒快速上手

1. 在 Obsidian 中启用 `Science Input Helper`。
2. 在 Markdown 笔记中按 `Ctrl + Shift + Q` 打开快速输入框。
3. 输入 `化 H2SO4`，按 `Enter` 插入 `$\\mathrm{H_2SO_4}$`。
4. 输入 `单位 9.8m/s2`，按 `Enter` 插入 `$9.8\\,\\mathrm{m/s^2}$`。
5. 输入 `可逆[加热][浓硫酸]`，查看插入前预览，再按 `Enter`。
6. 输入 `help` 查看前缀帮助，按 `Esc` 退出。

快捷键：

| 操作 | 默认快捷键 |
| --- | --- |
| 打开 / 关闭快速输入框 | `Ctrl + Shift + Q` |
| 插入默认格式 | `Enter` |
| 插入块公式 | `Ctrl/Cmd + Enter` |
| 候选选择 | `Tab` / `ArrowUp` / `ArrowDown` |
| 退出快速输入框 | `Esc` |

通常情况下，`Enter` 会插入行内公式 `$...$`。`raw`、Unicode 希腊字母和罗马数字会作为普通文本插入，不自动包裹 `$...$`。

### 快速输入前缀

| 前缀 | 用途 | 示例 |
| --- | --- | --- |
| `化` / `c` | 化学式 | `化 H2SO4` |
| `单位` / `u` | 单位格式化 | `单位 9.8m/s2` |
| `物` / `p` | 物理模板 | `物 动能` |
| `化学` / `ch` | 化学模板 | `化学 pH` |
| `生化` / `b` | 生物化学模板 | `生化 ATP水解` |
| `原` / `raw` | 原样 LaTeX | `原 E=mc^2` |
| `希` / `g` | 希腊字母 | `希 alpha` |
| `罗马` / `r` / `roman` | 罗马数字 | `罗马 12` |
| `数` / `m` | 数学结构 | `数 根号 x+1` |

输入 `help`、`帮助` 或 `?` 会显示快速输入帮助。

### 化学式转换

推荐使用 `化` 或 `c` 前缀，减少自动识别误判。

```text
H2O                -> \mathrm{H_2O}
H2SO4             -> \mathrm{H_2SO_4}
Ca(OH)2           -> \mathrm{Ca(OH)_2}
2H2O              -> \mathrm{2H_2O}
NH4+              -> \mathrm{NH_4^{+}}
CH3COOH           -> \mathrm{CH_3COOH}
CH3COO-           -> \mathrm{CH_3COO^{-}}
SO4 2-            -> \mathrm{SO_4^{2-}}
CuSO4·5H2O        -> \mathrm{CuSO_4\cdot 5H_2O}
Ca2+ + CO3 2-     -> \mathrm{Ca^{2+} + CO_3^{2-}}
```

### 反应条件箭头

支持在生成箭头或可逆箭头上方、下方添加反应条件、催化剂、温度等内容。

```text
可逆                         -> \rightleftharpoons
可逆[加热]                   -> \overset{\Delta}{\rightleftharpoons}
可逆[加热][浓硫酸]           -> \overset{\Delta}{\underset{\mathrm{浓硫酸}}{\rightleftharpoons}}
可逆 上 加热 下 浓硫酸       -> \overset{\Delta}{\underset{\mathrm{浓硫酸}}{\rightleftharpoons}}
eq[heat][H2SO4]              -> \overset{\Delta}{\underset{\mathrm{H_2SO_4}}{\rightleftharpoons}}

生成[加热]                   -> \xrightarrow{\Delta}
生成[光照]                   -> \xrightarrow{h\nu}
生成[加热][催化剂]           -> \xrightarrow[\mathrm{cat.}]{\Delta}
ra[heat][cat]                -> \xrightarrow[\mathrm{cat.}]{\Delta}
```

条件关键词：

```text
加热 / heat       -> \Delta
光照 / hv / hν    -> h\nu
催化剂 / cat      -> \mathrm{cat.}
浓硫酸            -> \mathrm{浓硫酸}
H2SO4             -> \mathrm{H_2SO_4}
MnO2              -> \mathrm{MnO_2}
170℃ / 25°C       -> 170\,^{\circ}\mathrm{C} / 25\,^{\circ}\mathrm{C}
```

简单完整反应式：

```text
反应 CH3COOH + C2H5OH 可逆[加热][浓硫酸] CH3COOC2H5 + H2O
```

输出：

```latex
\mathrm{CH_3COOH + C_2H_5OH} \overset{\Delta}{\underset{\mathrm{浓硫酸}}{\rightleftharpoons}} \mathrm{CH_3COOC_2H_5 + H_2O}
```

完整反应式转换目前是简单实验功能，只适合常见线性反应式。

### 单位格式化

```text
9.8m/s2             -> 9.8\,\mathrm{m/s^2}
6.02e23 mol-1       -> 6.02\times10^{23}\,\mathrm{mol^{-1}}
1e-3 mol/L          -> 1\times10^{-3}\,\mathrm{mol/L}
37°C                -> 37\,^{\circ}\mathrm{C}
8.314J/(mol K)      -> 8.314\,\mathrm{J/(mol\,K)}
```

单位格式化只改变显示格式，不进行单位换算。例如不会把 `1000mg` 自动换算成 `1g`。

### 模板、符号和结构

常见模板：

```text
物 动能        -> E_k=\frac{1}{2}mv^2
物 欧姆定律    -> I=\frac{U}{R}
化学 pH        -> \mathrm{pH}=-\lg[H^+]
生化 ATP水解   -> \mathrm{ATP + H_2O \rightarrow ADP + P_i + H^+}
```

常见符号：

```text
约等于    -> \approx
成正比    -> \propto
远大于    -> \gg
因为      -> \because
所以      -> \therefore
```

希腊字母：

```text
alpha / 阿尔法      -> \alpha
Delta / 大写delta   -> \Delta
omega / 欧米伽      -> \omega
varphi / 变体phi    -> \varphi
```

单独输入 `g` 会显示全部希腊字母；输入 `g alpha` 会搜索对应字母。希腊字母可以在设置页选择 LaTeX 或 Unicode 输出。Unicode 模式会作为普通文本插入。

罗马数字必须带前缀：

```text
r 12       -> XII
roman 49   -> XLIX
罗马 2024  -> MMXXIV
```

裸数字 `12` 不会自动转换成 `XII`。

数学结构：

```text
根号 b^2-4ac       -> \sqrt{b^2-4ac}
三次根号 x+1       -> \sqrt[3]{x+1}
分式 a+b / c+d     -> \frac{a+b}{c+d}
括号 x+1           -> \left(x+1\right)
绝对值 x-1         -> \left|x-1\right|
向量 v             -> \vec{v}
```

数学结构转换只做格式包裹，不检查数学表达式是否正确。

### Science Panel 和命令

插件提供右侧 `Science Panel`，也支持命令面板：

```text
Science Input Helper: Toggle quick input
Science Input Helper: Open Science Panel
Science Input Helper: Convert chemical formula to inline math
Science Input Helper: Convert chemical formula to block math
Science Input Helper: Format unit to inline math
Science Input Helper: Format unit to block math
Science Input Helper: Search template and insert inline math
Science Input Helper: Search template and insert block math
```

希腊字母、罗马数字和反应条件箭头主要通过快速输入框使用，目前不单独提供命令面板命令。

### 插件限制

- 不检查科学内容正确性。
- 不自动配平化学方程式。
- 不进行单位换算。
- 不替代 Latex Suite。
- 反应条件箭头只做排版，不判断条件是否真实或是否适用于该反应。
- 完整反应式转换目前是简单实验功能，不解析复杂有机结构式、机理箭头或多步反应。
- 不保证所有复杂化学式、复杂离子和有机结构式都能一次转换正确。
- 复杂公式转换后需要人工检查。

### 开发

```bash
npm install
npm test
npm run build
```

构建后将 `main.js`、`manifest.json`、`styles.css` 放入：

```text
<your-vault>/.obsidian/plugins/science-input-helper/
```

</details>

---

## English

<details>
<summary><strong>Expand / collapse English guide</strong></summary>

### Purpose

Science Input Helper complements Latex Suite, Easy LaTeX, AI LaTeX Generator, and similar plugins. It does not try to replace a full LaTeX snippet system.

Recommended division of work:

| Task | Recommended Tool |
| --- | --- |
| Math snippets, matrices, cases, complex environments | Latex Suite |
| Chemistry formulas, reaction conditions, units, Chinese templates | Science Input Helper |
| Greek letters, Roman numerals, common science symbols | Science Input Helper |
| Full LaTeX syntax completion and complex formula editing | Latex Suite |
| Reviewing converted complex formulas | Latex Suite + manual check |

This plugin does not use AI, does not validate scientific correctness, and does not balance chemical equations.

### 30-Second Start

1. Enable `Science Input Helper` in Obsidian.
2. Press `Ctrl + Shift + Q` in a Markdown note to open Quick Input.
3. Type `c H2SO4`, then press `Enter` to insert `$\\mathrm{H_2SO_4}$`.
4. Type `u 9.8m/s2`, then press `Enter` to insert `$9.8\\,\\mathrm{m/s^2}$`.
5. Type `eq[heat][H2SO4]`, check the preview, then press `Enter`.
6. Type `help` to view prefix help. Press `Esc` to close.

Hotkeys:

| Action | Default |
| --- | --- |
| Toggle Quick Input | `Ctrl + Shift + Q` |
| Insert default format | `Enter` |
| Insert block math | `Ctrl/Cmd + Enter` |
| Select suggestions | `Tab` / `ArrowUp` / `ArrowDown` |
| Close Quick Input | `Esc` |

Most outputs are inserted as inline math with `$...$`. `raw`, Unicode Greek letters, and Roman numerals are inserted as plain text.

### Quick Input Prefixes

| Prefix | Purpose | Example |
| --- | --- | --- |
| `c` / `chem` | Chemical formula | `c H2SO4` |
| `u` / `unit` | Unit formatter | `u 9.8m/s2` |
| `p` / `physics` | Physics template | `p kinetic energy` |
| `ch` / `chemistry` | Chemistry template | `ch pH` |
| `b` / `bio` | Biochemistry template | `b ATP hydrolysis` |
| `raw` | Raw LaTeX | `raw E=mc^2` |
| `g` | Greek letters | `g alpha` |
| `r` / `roman` | Roman numerals | `roman 12` |
| `m` | Math structures | `m sqrt x+1` |

Type `help`, `帮助`, or `?` to show prefix help.

### Chemical Formula Converter

Use `c` or `chem` when possible to reduce ambiguity.

```text
H2O                -> \mathrm{H_2O}
H2SO4             -> \mathrm{H_2SO_4}
Ca(OH)2           -> \mathrm{Ca(OH)_2}
2H2O              -> \mathrm{2H_2O}
NH4+              -> \mathrm{NH_4^{+}}
CH3COOH           -> \mathrm{CH_3COOH}
CH3COO-           -> \mathrm{CH_3COO^{-}}
SO4 2-            -> \mathrm{SO_4^{2-}}
CuSO4·5H2O        -> \mathrm{CuSO_4\cdot 5H_2O}
Ca2+ + CO3 2-     -> \mathrm{Ca^{2+} + CO_3^{2-}}
```

### Reaction Condition Arrows

Reaction Condition Helper supports labels above and below reaction arrows.

```text
可逆                         -> \rightleftharpoons
可逆[加热]                   -> \overset{\Delta}{\rightleftharpoons}
可逆[加热][浓硫酸]           -> \overset{\Delta}{\underset{\mathrm{浓硫酸}}{\rightleftharpoons}}
eq[heat][H2SO4]              -> \overset{\Delta}{\underset{\mathrm{H_2SO_4}}{\rightleftharpoons}}

生成[加热]                   -> \xrightarrow{\Delta}
生成[光照]                   -> \xrightarrow{h\nu}
ra[heat][cat]                -> \xrightarrow[\mathrm{cat.}]{\Delta}
```

Condition keywords:

```text
加热 / heat       -> \Delta
光照 / hv / hν    -> h\nu
催化剂 / cat      -> \mathrm{cat.}
H2SO4             -> \mathrm{H_2SO_4}
MnO2              -> \mathrm{MnO_2}
170℃ / 25°C       -> 170\,^{\circ}\mathrm{C} / 25\,^{\circ}\mathrm{C}
```

Simple full reaction:

```text
反应 CH3COOH + C2H5OH 可逆[加热][浓硫酸] CH3COOC2H5 + H2O
```

Output:

```latex
\mathrm{CH_3COOH + C_2H_5OH} \overset{\Delta}{\underset{\mathrm{浓硫酸}}{\rightleftharpoons}} \mathrm{CH_3COOC_2H_5 + H_2O}
```

Full reaction conversion is an experimental simple parser for common linear reactions.

### Unit Formatter

```text
9.8m/s2             -> 9.8\,\mathrm{m/s^2}
6.02e23 mol-1       -> 6.02\times10^{23}\,\mathrm{mol^{-1}}
1e-3 mol/L          -> 1\times10^{-3}\,\mathrm{mol/L}
37°C                -> 37\,^{\circ}\mathrm{C}
8.314J/(mol K)      -> 8.314\,\mathrm{J/(mol\,K)}
```

The unit formatter only changes display format. It does not convert units, so `1000mg` will not become `1g`.

### Templates, Symbols, and Structures

Templates:

```text
物 动能        -> E_k=\frac{1}{2}mv^2
物 欧姆定律    -> I=\frac{U}{R}
化学 pH        -> \mathrm{pH}=-\lg[H^+]
生化 ATP水解   -> \mathrm{ATP + H_2O \rightarrow ADP + P_i + H^+}
```

Symbols:

```text
约等于    -> \approx
成正比    -> \propto
远大于    -> \gg
因为      -> \because
所以      -> \therefore
```

Greek letters:

```text
alpha / 阿尔法      -> \alpha
Delta / 大写delta   -> \Delta
omega / 欧米伽      -> \omega
varphi / 变体phi    -> \varphi
```

Typing `g` alone shows all Greek-letter candidates. Typing `g alpha` searches for alpha. Greek output can be configured as LaTeX or Unicode.

Roman numerals require a prefix:

```text
r 12       -> XII
roman 49   -> XLIX
罗马 2024  -> MMXXIV
```

Bare `12` will not be converted to `XII`.

Math structures:

```text
根号 b^2-4ac       -> \sqrt{b^2-4ac}
三次根号 x+1       -> \sqrt[3]{x+1}
分式 a+b / c+d     -> \frac{a+b}{c+d}
括号 x+1           -> \left(x+1\right)
绝对值 x-1         -> \left|x-1\right|
向量 v             -> \vec{v}
```

Math structure conversion only wraps text. It does not validate mathematical meaning.

### Science Panel and Commands

The plugin provides a right-side `Science Panel` and these command-palette commands:

```text
Science Input Helper: Toggle quick input
Science Input Helper: Open Science Panel
Science Input Helper: Convert chemical formula to inline math
Science Input Helper: Convert chemical formula to block math
Science Input Helper: Format unit to inline math
Science Input Helper: Format unit to block math
Science Input Helper: Search template and insert inline math
Science Input Helper: Search template and insert block math
```

Greek letters, Roman numerals, and reaction-condition arrows are mainly used through Quick Input and currently do not provide separate command-palette commands.

### Limitations

- Does not validate scientific correctness.
- Does not balance chemical equations.
- Does not convert units.
- Does not replace Latex Suite.
- Reaction condition arrows are formatting helpers only.
- Full reaction conversion is an experimental simple parser and does not parse complex organic structures, mechanism arrows, or multi-step reactions.
- Complex formulas should be reviewed manually after conversion.

### Development

```bash
npm install
npm test
npm run build
```

After building, copy `main.js`, `manifest.json`, and `styles.css` to:

```text
<your-vault>/.obsidian/plugins/science-input-helper/
```

</details>
