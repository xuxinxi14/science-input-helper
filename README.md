# Science Input Helper

<p align="right">
  <a href="#中文">中文</a> |
  <a href="#english">English</a>
</p>

一个为中文理科笔记设计的 Obsidian 输入助手。

如果你在 Obsidian 里写数学、物理、化学、生物化学笔记时，经常被这些问题打断：

- `H2SO4` 要手动改成 `H_2SO_4`
- `9.8m/s2` 不知道怎么排成更规范的单位格式
- 可逆反应上面想写“加热”，下面想写“浓硫酸”
- 希腊字母、罗马数字、根号、分式总是要查 LaTeX
- 上课记笔记时不想被公式输入拖慢

Science Input Helper 就是为这些场景做的。

它不会替你判断科学内容是否正确，也不会自动解题或自动配平方程式；它只做一件事：把理科笔记里常见但难打的表达式，快速转换成 Obsidian 可以渲染的 LaTeX / MathJax 格式。

## 它能做什么？

| 你输入 | 插入结果 |
| --- | --- |
| `化 H2SO4` | `$\mathrm{H_2SO_4}$` |
| `化 NH4+` | `$\mathrm{NH_4^{+}}$` |
| `单位 9.8m/s2` | `$9.8\,\mathrm{m/s^2}$` |
| `可逆[加热][浓硫酸]` | `\overset{\Delta}{\underset{\mathrm{浓硫酸}}{\rightleftharpoons}}` |
| `生成[光照]` | `\xrightarrow{h\nu}` |
| `希 阿尔法` | `\alpha` 或 `α` |
| `罗马 12` | `XII` |
| `根号 b^2-4ac` | `\sqrt{b^2-4ac}` |
| `分式 a+b / c+d` | `\frac{a+b}{c+d}` |

## 功能汇总表

| 类别 | 典型输入 | 插入结果 | 说明 |
| --- | --- | --- | --- |
| 化学式 | `化 H2SO4` | `\mathrm{H_2SO_4}` | 常见分子式下标 |
| 化学计量数 | `化 2H2O` | `\mathrm{2H_2O}` | 保留反应式前置系数 |
| 离子式 | `化 SO4 2-` | `\mathrm{SO_4^{2-}}` | 支持分离电荷写法 |
| 有机简式 | `化 CH3COOH` | `\mathrm{CH_3COOH}` | 适合常见课程笔记简式 |
| 结晶水 | `化 CuSO4·5H2O` | `\mathrm{CuSO_4\cdot 5H_2O}` | 支持中点结晶水写法 |
| 可逆条件箭头 | `可逆[加热][浓硫酸]` | `\overset{\Delta}{\underset{\mathrm{浓硫酸}}{\rightleftharpoons}}` | 上方和下方条件 |
| 生成条件箭头 | `生成[光照]` | `\xrightarrow{h\nu}` | 光照、加热、催化剂等条件 |
| 简单完整反应 | `反应 2H2 + O2 生成[点燃] 2H2O` | `\mathrm{2H_2 + O_2} \xrightarrow{\mathrm{点燃}} \mathrm{2H_2O}` | 实验性线性反应式转换 |
| 单位格式化 | `单位 9.8m/s2` | `9.8\,\mathrm{m/s^2}` | 只改变显示格式，不换算 |
| 科学计数单位 | `单位 6.02e23 mol-1` | `6.02\times10^{23}\,\mathrm{mol^{-1}}` | 支持科学计数法和负幂 |
| 物理模板 | `物 动能` | `E_k=\frac{1}{2}mv^2` | 中文关键词查常见公式 |
| 物理模板 | `物 动量` | `p=mv` | 力学常用公式 |
| 物理模板 | `物 自由落体` | `v=gt,\ h=\frac{1}{2}gt^2` | 运动学常用公式 |
| 生化模板 | `生化 ATP水解` | `\mathrm{ATP + H_2O \rightarrow ADP + P_i + H^+}` | 常见生化表达式 |
| 希腊字母 | `希 alpha` | `\alpha` 或 `α` | 输出取决于设置页模式 |
| 罗马数字 | `罗马 12` | `XII` | 必须带前缀，不转换裸数字 |
| 根号结构 | `根号 b^2-4ac` | `\sqrt{b^2-4ac}` | 快速生成根号 |
| 分式结构 | `分式 a+b / c+d` | `\frac{a+b}{c+d}` | 按第一个 `/` 分割 |
| 常用符号 | `约等于` | `\approx` | 关系、推理、反应符号 |

## 适合谁？

这个插件更适合：

- 用 Obsidian 写中文理科笔记的学生
- 高中到本科低年级的数学、物理、化学、生物化学课程
- 已经在用 Latex Suite，但还觉得化学式、单位、反应条件输入麻烦的人
- 想把课堂笔记写得更规范，但不想记太多 LaTeX 命令的人

它不适合：

- 需要完整 LaTeX 编辑环境的人
- 需要自动解题、自动配平、自动判断公式对错的人
- 需要复杂化学结构绘图或 ChemDraw 替代品的人

## 30 秒快速上手

1. 在 Obsidian 中启用 `Science Input Helper`。
2. 点击左侧 ribbon 的烧瓶图标打开快速输入框，或在 `Settings -> Hotkeys` 中给 `Toggle quick input` 绑定快捷键。
3. 输入 `化 H2SO4`，按 `Enter`。
4. 输入 `单位 9.8m/s2`，按 `Enter`。
5. 输入 `可逆[加热][浓硫酸]`，查看预览后按 `Enter`。
6. 输入 `help` 查看所有前缀。
7. 按 `Esc` 退出。

建议给 `Toggle quick input` 绑定 `Ctrl + Shift + Q`，给 `Toggle quick input focus` 绑定 `Ctrl + J`。

常用前缀：

| 前缀 | 用途 | 示例 |
| --- | --- | --- |
| `化` / `c` | 化学式 | `化 H2SO4` |
| `单位` / `u` | 单位格式化 | `单位 9.8m/s2` |
| `物` / `p` | 物理模板 | `物 动能` |
| `化学` / `ch` | 化学模板 | `化学 pH` |
| `生化` / `b` | 生物化学模板 | `生化 ATP水解` |
| `希` / `g` | 希腊字母 | `希 alpha` |
| `罗马` / `r` | 罗马数字 | `罗马 12` |
| `数` / `m` | 数学结构 | `数 根号 x+1` |
| `原` / `raw` | 原样 LaTeX | `原 E=mc^2` |

通常情况下，`Enter` 会插入行内公式 `$...$`；`Ctrl/Cmd + Enter` 会插入块公式。`raw`、Unicode 希腊字母和罗马数字会作为普通文本插入，不自动包裹 `$...$`。

## 安装

Science Input Helper 目前还没有进入 Obsidian 官方社区插件市场，可以通过以下方式安装。

### 推荐方式：从 GitHub Releases 安装

1. 打开本仓库的 [Releases 页面](https://github.com/xuxinxi14/science-input-helper/releases)。
2. 下载最新版本中的三个文件：

```text
main.js
manifest.json
styles.css
```

3. 在你的 Obsidian 库中创建插件目录：

```text
<your-vault>/.obsidian/plugins/science-input-helper/
```

4. 把三个文件放进去。
5. 重启 Obsidian。
6. 进入 `Settings -> Community plugins`，启用 `Science Input Helper`。

也可以下载 release zip 包，解压后把 `science-input-helper` 文件夹放入：

```text
<your-vault>/.obsidian/plugins/
```

### 使用 BRAT 安装测试版

如果你希望跟随 GitHub 仓库更新，可以使用 BRAT：

1. 在 Obsidian 中安装并启用 `BRAT`。
2. 运行命令 `BRAT: Add a beta plugin for testing`。
3. 输入仓库地址：

```text
https://github.com/xuxinxi14/science-input-helper
```

4. 添加后启用插件。

### 从源码构建

```bash
npm install
npm test
npm run build
```

构建完成后，将以下文件复制到插件目录：

```text
main.js
manifest.json
styles.css
```

## 功能概览

### 化学式和离子式

```text
化 H2O             -> \mathrm{H_2O}
化 H2SO4           -> \mathrm{H_2SO_4}
化 Ca(OH)2         -> \mathrm{Ca(OH)_2}
化 2H2O            -> \mathrm{2H_2O}
化 NH4+            -> \mathrm{NH_4^{+}}
化 SO4 2-          -> \mathrm{SO_4^{2-}}
化 CH3COO-         -> \mathrm{CH_3COO^{-}}
化 CuSO4·5H2O      -> \mathrm{CuSO_4\cdot 5H_2O}
```

### 反应条件箭头

```text
可逆                         -> \rightleftharpoons
可逆[加热]                   -> \overset{\Delta}{\rightleftharpoons}
可逆[加热][浓硫酸]           -> \overset{\Delta}{\underset{\mathrm{浓硫酸}}{\rightleftharpoons}}
可逆 上 加热 下 浓硫酸       -> \overset{\Delta}{\underset{\mathrm{浓硫酸}}{\rightleftharpoons}}
eq[heat][H2SO4]              -> \overset{\Delta}{\underset{\mathrm{H_2SO_4}}{\rightleftharpoons}}
生成[光照]                   -> \xrightarrow{h\nu}
生成[加热][催化剂]           -> \xrightarrow[\mathrm{cat.}]{\Delta}
```

简单完整反应式：

```text
反应 CH3COOH + C2H5OH 可逆[加热][浓硫酸] CH3COOC2H5 + H2O
```

输出：

```latex
\mathrm{CH_3COOH + C_2H_5OH} \overset{\Delta}{\underset{\mathrm{浓硫酸}}{\rightleftharpoons}} \mathrm{CH_3COOC_2H_5 + H_2O}
```

完整反应式转换目前是简单实验功能，适合常见线性反应式。

### 单位格式化

```text
单位 9.8m/s2          -> 9.8\,\mathrm{m/s^2}
单位 6.02e23 mol-1    -> 6.02\times10^{23}\,\mathrm{mol^{-1}}
单位 1e-3 mol/L       -> 1\times10^{-3}\,\mathrm{mol/L}
单位 37°C             -> 37\,^{\circ}\mathrm{C}
单位 8.314J/(mol K)   -> 8.314\,\mathrm{J/(mol\,K)}
```

单位格式化只改变显示格式，不进行单位换算。例如不会把 `1000mg` 自动换算成 `1g`。

### 公式模板和常用符号

```text
物 动能            -> E_k=\frac{1}{2}mv^2
物 动量            -> p=mv
物 自由落体        -> v=gt,\ h=\frac{1}{2}gt^2
物 密度            -> \rho=\frac{m}{V}
物 浮力            -> F_{\text{浮}}=\rho gV_{\text{排}}
物 向心力          -> F_c=m\frac{v^2}{r}=m\omega^2r
物 万有引力        -> F=G\frac{m_1m_2}{r^2}
物 欧姆定律        -> I=\frac{U}{R}
物 库仑定律        -> F=k\frac{q_1q_2}{r^2}
物 法拉第定律      -> \mathcal{E}=-\frac{\Delta\Phi}{\Delta t}
物 波速            -> v=\lambda f
化学 pH            -> \mathrm{pH}=-\lg[H^+]
生化 ATP水解       -> \mathrm{ATP + H_2O \rightarrow ADP + P_i + H^+}
约等于             -> \approx
成正比             -> \propto
远大于             -> \gg
因为               -> \because
所以               -> \therefore
```

### 希腊字母和罗马数字

```text
希 alpha           -> \alpha
希 阿尔法          -> \alpha
希 Delta           -> \Delta
希 大写delta       -> \Delta
希 omega           -> \omega
希 varphi          -> \varphi
罗马 12            -> XII
roman 2024         -> MMXXIV
```

单独输入 `g` 会显示全部希腊字母候选；输入 `g alpha` 会搜索对应字母。希腊字母可以在设置页选择 LaTeX 或 Unicode 输出。罗马数字必须带前缀，裸数字 `12` 不会自动转换成 `XII`。

### 数学结构

```text
根号 b^2-4ac       -> \sqrt{b^2-4ac}
三次根号 x+1       -> \sqrt[3]{x+1}
分式 a+b / c+d     -> \frac{a+b}{c+d}
括号 x+1           -> \left(x+1\right)
绝对值 x-1         -> \left|x-1\right|
向量 v             -> \vec{v}
```

数学结构转换只做格式包裹，不检查数学表达式是否正确。

## 截图

TODO: 提交 Obsidian Community Plugins 前补充桌面端快速输入框、Science Panel 和设置页截图。

## 和 Latex Suite 的关系

Science Input Helper 不是 Latex Suite 的替代品。

推荐分工：

| 场景 | 推荐工具 |
| --- | --- |
| 数学 snippets、矩阵、cases、复杂 LaTeX 环境 | Latex Suite |
| 化学式、离子式、反应条件、单位、中文模板 | Science Input Helper |
| 希腊字母、罗马数字、常见科学符号 | Science Input Helper |
| 复杂公式编辑和校对 | Latex Suite + 人工检查 |

## Science Panel 和命令

插件提供右侧 `Science Panel`，也支持命令面板：

```text
Toggle quick input
Open Science Panel
Convert chemical formula to inline math
Convert chemical formula to block math
Format unit to inline math
Format unit to block math
Search template and insert inline math
Search template and insert block math
Wrap selection with square root
Wrap selection as fraction numerator
Convert slash expression to fraction
```

希腊字母、罗马数字和反应条件箭头主要通过快速输入框使用，目前不单独提供命令面板命令。

## 限制

这个插件只负责输入和排版辅助，不负责科学判断。

它不会：

- 检查公式是否适用于当前题目
- 判断反应条件是否真实
- 自动配平化学方程式
- 进行单位换算
- 替代完整 LaTeX 编辑器
- 解析复杂有机结构式或反应机理

复杂内容转换后仍然需要人工检查。

## English

### What Is This?

Science Input Helper is an Obsidian plugin for Chinese science-course notes.

It helps you type common chemistry formulas, reaction-condition arrows, units, Greek letters, Roman numerals, scientific symbols, and lightweight math structures without memorizing too many LaTeX commands.

It is not an AI solver, a chemistry validator, or a full LaTeX snippet system.

### Who Is It For?

Science Input Helper is useful for:

- students writing Chinese science notes in Obsidian
- high-school to early-undergraduate math, physics, chemistry, and biochemistry courses
- users who already use Latex Suite but still find chemistry formulas, units, and reaction conditions slow to type
- users who want cleaner notes without memorizing many LaTeX commands

It is not suitable for:

- full LaTeX document editing
- automatic problem solving or equation balancing
- complex chemical structure drawing

### Quick Examples

| Input | Inserted Result |
| --- | --- |
| `c H2SO4` | `$\mathrm{H_2SO_4}$` |
| `u 9.8m/s2` | `$9.8\,\mathrm{m/s^2}$` |
| `eq[heat][H2SO4]` | `\overset{\Delta}{\underset{\mathrm{H_2SO_4}}{\rightleftharpoons}}` |
| `g alpha` | `\alpha` or `α` |
| `roman 12` | `XII` |
| `sqrt b^2-4ac` | `\sqrt{b^2-4ac}` |
| `frac a+b / c+d` | `\frac{a+b}{c+d}` |

### Installation

Science Input Helper is not yet listed in the official Obsidian Community Plugins directory.

Recommended installation:

1. Open the [Releases page](https://github.com/xuxinxi14/science-input-helper/releases).
2. Download:

```text
main.js
manifest.json
styles.css
```

3. Create this folder in your Obsidian vault:

```text
<your-vault>/.obsidian/plugins/science-input-helper/
```

4. Put the three files into that folder.
5. Restart Obsidian.
6. Go to `Settings -> Community plugins` and enable `Science Input Helper`.

You can also install it with BRAT:

```text
BRAT: Add a beta plugin for testing
https://github.com/xuxinxi14/science-input-helper
```

### Features

- chemistry formula and ion formatting
- reaction-condition arrows
- unit formatting
- physics, chemistry, and biochemistry templates
- Greek letters and Roman numerals
- common scientific symbols
- lightweight math structures such as roots, fractions, brackets, vectors, superscripts, and subscripts
- quick input mode with preview
- right-side Science Panel

### Limitations

Science Input Helper only helps with input and formatting. It does not:

- validate scientific correctness
- balance chemical equations
- convert units
- solve problems
- replace Latex Suite
- parse complex organic structures or reaction mechanisms

Complex output should be checked manually.

## Development

```bash
npm install
npm test
npm run build
```

Release assets should include:

```text
main.js
manifest.json
styles.css
```

The optional zip package is for manual installation only. The GitHub Release must still attach `main.js`, `manifest.json`, and `styles.css` as separate assets.

After building, copy the plugin files to:

```text
<your-vault>/.obsidian/plugins/science-input-helper/
```
