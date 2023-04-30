module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  extends: `react-app`,
  settings: {
    "import/resolver": {
      alias: {
        map: [["root", "./src"]],
        extensions: [".js", ".jsx"],
      },
    },
  },
};
