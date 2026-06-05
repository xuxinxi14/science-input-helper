# Contributing to Science Input Helper

Thanks for your interest in Science Input Helper.

> 中文用户也可以直接用中文提交 issue。请尽量提供输入内容、期望输出、实际输出和截图。

This is currently a small personal project maintained mainly by one person. Contributions, bug reports, and suggestions are welcome, but the project may not be able to handle large or complex pull requests quickly.

## What kind of feedback is helpful?

The most useful feedback includes:

- Incorrect conversion results
- Expressions that should be supported but are currently missing
- Confusing quick input behavior
- Obsidian compatibility issues
- Mobile or desktop display problems
- Documentation mistakes
- Suggestions for common chemistry, physics, math, or biochemistry expressions

## Reporting bugs

When reporting a bug, please include:

- Obsidian version
- Science Input Helper version
- Operating system
- Whether you are using desktop or mobile
- The exact input text
- The expected output
- The actual output
- Screenshots, if helpful

Example:

```text
Input:
化 SO4 2-

Expected:
\mathrm{SO_4^{2-}}

Actual:
...
```

## Suggesting new conversions

When suggesting a new conversion, please include:

- The input you want to type
- The expected LaTeX / MathJax output
- The subject area, such as chemistry, physics, mathematics, or biochemistry
- A short explanation of where this expression is commonly used

Example:

```text
Input:
可逆[加热][浓硫酸]

Expected:
\overset{\Delta}{\underset{\mathrm{浓硫酸}}{\rightleftharpoons}}

Use case:
Organic chemistry reaction notes.
```

## Pull requests

Pull requests are welcome, but please open an issue first for larger changes.

Small pull requests are easier to review, especially:

- Fixing documentation
- Adding test cases
- Adding common formula templates
- Fixing a specific converter bug
- Improving existing behavior without changing the overall design

Please avoid large rewrites unless they have been discussed first.

## Development setup

Install dependencies:

```bash
npm install
```

Run tests:

```bash
npm test
```

Build the plugin:

```bash
npm run build
```

If linting is configured:

```bash
npm run lint
```

## Before submitting a pull request

Please check that:

- Tests pass
- The plugin builds successfully
- New converters include test cases
- Existing quick input behavior is not broken
- Documentation is updated if user-facing behavior changes

## Project scope

Science Input Helper is an input and formatting helper. It is not intended to be:

- An AI solver
- A chemistry validator
- A chemical equation balancer
- A unit conversion engine
- A full LaTeX editing system
- A replacement for Latex Suite
- A ChemDraw or molecular structure editor replacement

The plugin focuses on fast input for Chinese science-course notes.

## Maintainer note

This project is maintained in limited personal time. Issues and pull requests may take time to review. Clear examples and small focused changes are appreciated.
