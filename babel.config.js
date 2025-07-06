/** @type {import('@babel/core').TransformOptions} */
export default {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          esmodules: true,
          node: "current",
        },
      },
    ],
    "@babel/preset-typescript",
  ],
  sourceMaps: false,
  targets: {
    esmodules: true,
    node: "current",
  }
};
