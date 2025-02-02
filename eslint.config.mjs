// eslint.config.mjs
import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: await import("eslint:recommended"),
});

export default [
  ...compat.extends("next/core-web-vitals"), // Next.js rules
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: "@typescript-eslint/parser", // Explicitly set the parser
      parserOptions: {
        project: "./tsconfig.json", // Path relative to eslint.config.mjs
        tsconfigRootDir: __dirname, // Important for resolving relative tsconfig paths
      },
    },
    plugins: {
      "@typescript-eslint": await import("@typescript-eslint/eslint-plugin"),
    },
    rules: {
      "no-console": "warn",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "complexity": ["warn", 10],
      "max-lines-per-function": ["warn", 50],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      // Add or override other rules as needed
      "import/order": "warn", // Example: Add import order rules
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"], // Important for resolving imports
        },
      },
    },
  },
];