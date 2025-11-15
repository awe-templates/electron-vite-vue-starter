import eslint from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import { readFileSync } from "fs";

const prettierOptions = JSON.parse(readFileSync("./.prettierrc", "utf8"));

export default [
  {
    ignores: ["node_modules/**", "dist/**", "*.config.ts", "*.config.mjs"],
  },
  {
    files: [
      "electron/main/**/*.ts",
      "electron/preload/**/*.ts",
      "electron/shared/**/*.ts",
      "tests/main/**/*.ts",
      "tests/setup.ts",
    ],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.main.json",
      },
      globals: {
        __dirname: "readonly",
        process: "readonly",
        console: "readonly",
        URL: "readonly",
        Electron: "readonly",
        NodeJS: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      prettier: prettier,
    },
    settings: {
      prettier: prettierOptions,
    },
    rules: {
      ...eslint.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...prettierConfig.rules,
      "prettier/prettier": ["error", prettierOptions],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",
    },
  },
  {
    files: ["src/**/*.ts", "tests/renderer/**/*.ts"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.renderer.json",
      },
      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
        global: "readonly",
        NodeJS: "readonly",
        localStorage: "readonly",
        HTMLButtonElement: "readonly",
        HTMLInputElement: "readonly",
        HTMLParagraphElement: "readonly",
        HTMLDivElement: "readonly",
        HTMLElement: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      prettier: prettier,
    },
    settings: {
      prettier: prettierOptions,
    },
    rules: {
      ...eslint.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...prettierConfig.rules,
      "prettier/prettier": ["error", prettierOptions],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",
    },
  },
  {
    files: ["**/*.mjs", "**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        process: "readonly",
        console: "readonly",
        __dirname: "readonly",
      },
    },
    rules: {
      ...eslint.configs.recommended.rules,
    },
  },
];
