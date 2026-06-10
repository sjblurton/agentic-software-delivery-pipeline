import organizeImports from "prettier-plugin-organize-imports";

const config = {
  plugins: [
    organizeImports,
    "prettier-plugin-sort-json",
    "prettier-plugin-tailwindcss",
    "prettier-plugin-classnames",
  ],
  endingPosition: "absolute",
  jsonRecursiveSort: true,
  jsonSortOrder: JSON.stringify({ [/.*/]: "lexical" }),
};

export default config;
