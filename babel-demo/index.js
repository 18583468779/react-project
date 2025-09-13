import babel from "@babel/core";
import fs from "node:fs";

const source = fs.readFileSync("./test.js", "utf-8");
const react = fs.readFileSync("./app.jsx", "utf-8");

const res = babel.transform(react, {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        corejs: 3,
      },
    ],
    "@babel/preset-react",
  ],
  plugins: [],
});

fs.writeFileSync("./app.js", res.code);
console.log(res.code);
