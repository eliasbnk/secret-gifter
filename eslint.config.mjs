import path from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import tseslint from "@typescript-eslint/eslint-plugin";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-plugin-prettier";
import validateJSXNesting from "eslint-plugin-validate-jsx-nesting";

// Get current file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a compatibility instance
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Assign the configuration array to a variable before exporting
const eslintConfig = [
  // Ignore specific directories
  {
    ignores: [
      "**/node_modules/*",
      ".next/*",
      "out/*",
      "build/*",
      "components/ui/*",
    ],
  },

  // Base configuration
  {
    languageOptions: {
      parser: tseslint.configs.parser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    plugins: {
      "validate-jsx-nesting": validateJSXNesting,
      react: react,
      "react-hooks": reactHooks,
      "@typescript-eslint": tseslint,
      prettier: prettier,
    },

    rules: {
      // JSX Nesting
      "validate-jsx-nesting/no-invalid-jsx-nesting": "error",

      // Prettier
      "prettier/prettier": ["warn"],

      // TypeScript Rules
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],

      // React Rules
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/prop-types": "off",

      // General Rules
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },

    settings: {
      react: {
        version: "detect",
      },
    },
  },

  // Recommended configurations
  ...compat.extends(
    "next/core-web-vitals",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ),
];

// Export the configuration array
export default eslintConfig;
