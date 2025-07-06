import pluginTerser from "rollup-plugin-terser";
import pluginResolve from "@rollup/plugin-node-resolve";

function subModule(name) {
  return {
    [`${name}.browser.esm.min`]: `./dist/${name}/index.js`,   
  }
}

/** @type {import('rollup').RollupOptions} */
const config = {
  input: {
    "index.browser.esm.min": "./dist/index.js",
    ...subModule("constants"),
    ...subModule("formula"),
    ...subModule("models"),
  },
  plugins: [
    pluginResolve(),
  ],
  output: {
    format: "esm",
    dir: "dist",
    plugins: [pluginTerser.terser()],
  },
};
export default config;
