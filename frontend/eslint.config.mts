import js from "@eslint/js";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import { defineConfig } from "eslint/config";
import importPlugin from "eslint-plugin-import";
import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";

const baseDirectory = path.dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({ baseDirectory });


export default defineConfig([
  {
    files: ["**/*.{js,ts,mjs,cjs,mts,cts}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tsParser,
      globals: globals.browser,
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,

      semi: "error",
      quotes: ["error", "double"],
      "@typescript-eslint/no-unused-vars": "warn",
      "import/named": "error",
      "import/default": "error",
      "import/namespace": "error",
      "import/no-unresolved": "error",
    },
    ...compat.extends("plugin:@typescript-eslint/recommended"),
    ...compat.extends("eslint:recommended"),
  },
]);
