import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* في الإصدارات الحديثة، يفضل ترك الإعدادات الافتراضية
       أو استخدام الإعدادات المدعومة فقط */

    // إذا كنتِ تريدين استمرار تجاهل الأخطاء أثناء الـ build في Vercel:
    typescript: {
        ignoreBuildErrors: true,
    },

};

export default nextConfig;