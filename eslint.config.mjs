import tsparser from "@typescript-eslint/parser";
import { defineConfig } from "eslint/config";
import obsidianmd from "eslint-plugin-obsidianmd";

export default defineConfig([
  {
    ignores: [
      "main.js",
      "eslint.config.mjs",
      "esbuild.config.mjs",
      "package.json",
      "package-lock.json",
      "release/**",
      "node_modules/**",
      "coverage/**"
    ]
  },
  ...obsidianmd.configs.recommended,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: "./tsconfig.json"
      }
    },
    rules: {
      "obsidianmd/ui/sentence-case": [
        "error",
        {
          brands: [
            "Obsidian",
            "Science Input Helper",
            "Science Input",
            "Science Panel",
            "CodeMirror",
            "LaTeX",
            "MathJax",
            "Unicode",
            "Greek",
            "Hotkeys",
            "Markdown",
            "H2SO4",
            "Ca2+",
            "CO3",
            "pH",
            "G6P",
            "F6P",
            "ATP",
            "ADP",
            "NADH"
          ],
          acronyms: ["UI", "API", "OK"]
        }
      ]
    }
  }
]);
