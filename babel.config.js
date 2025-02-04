module.exports = {
    presets: [
        ["@babel/preset-env", {targets: {node: "current"}}],
        ["@babel/preset-react", {
            development: process.env.BABEL_ENV === "development",
        }],
        "@babel/preset-typescript",
    ],
    plugins: [
        ["@stylexjs/babel-plugin", {
            dev:  process.env.NODE_ENV === "development",
            test: process.env.NODE_ENV === "test",
            genConditionalClasses: true,
            treeshakeCompensation: true,
            unstable_moduleResolution: {
                type: "commonJS",
            },
        }],
    ]
  };