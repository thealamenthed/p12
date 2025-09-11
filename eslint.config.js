// eslint.config.js — Flat config compatible ESLint 8
import js from "@eslint/js";
import globals from "globals";
import jsdoc from "eslint-plugin-jsdoc";

export default [
  jsdoc.configs["flat/recommended"],
  {
    rules: {
      "jsdoc/require-jsdoc": ["warn", {publicOnly: true}],
      "jsdoc/require-returns": "off"
    }
  },
  {
    files: ["**/*.{js,jsx}"],
    ignores: ["dist/**", "node_modules/**"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {jsx: true} // React JSX
      },
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    // Pas de plugins nécessaires pour un setup basique React/Vite
    rules: {
      // Base recommended
      ...js.configs.recommended.rules,

      // Petits réglages confort
      "no-unused-vars": "off",
      "no-console": "off"
    }
  }
];
