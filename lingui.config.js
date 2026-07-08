import { defineConfig } from "@lingui/cli";

export default defineConfig({
  sourceLocale: "en",
  locales: ["en", "de"],
  catalogs: [
    {
      path: "<rootDir>/dashboard/i18n/{locale}",
      include: ["<rootDir>/dashboard/**"],
    },
  ],
});
