const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.plugin("define").tap((definitions) => {
      Object.assign(definitions[0]["process.env"], {
        STRIPE_KEY: JSON.stringify(process.env.STRIPE_KEY),
      });
      return definitions;
    });
  },
});
