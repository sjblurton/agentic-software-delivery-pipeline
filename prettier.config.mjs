import organizeImports from "prettier-plugin-organize-imports";

const config = {
  plugins: [organizeImports, "prettier-plugin-sort-json"],
  jsonRecursiveSort: true,
  jsonSortOrder: JSON.stringify({ [/.*/]: "lexical" }),
};

export default config;
