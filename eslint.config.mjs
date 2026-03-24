import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
    {
        rules: {
            "@typescript-eslint/no-unused-vars": "off", // تجاهل المتغيرات غير المستخدمة
            "@typescript-eslint/no-explicit-any": "off", // تجاهل استخدام any
        },
    },
    globalIgnores([
        ".next/**",
        "out/**",
        "build/**",
        "next-env.d.ts",
        "node_modules/**", // تأكدي من إضافة node_modules للتجاهل
    ]),
]);

export default eslintConfig;