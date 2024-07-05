const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.plugin("define").tap((definitions) => {
      const env = process.env;

      Object.keys(env).forEach((key) => {
        if (key.startsWith("VUE_APP_")) {
          definitions[0]["process.env"][key] = JSON.stringify(env[key]);
        }
      });
      Object.assign(definitions[0]["process.env"], {
        STRIPE_KEY: JSON.stringify(env.STRIPE_KEY),
        __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
      });

      return definitions;
    });
  },
});
