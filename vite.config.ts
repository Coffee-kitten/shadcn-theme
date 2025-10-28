// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import path from "path";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// });
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    minify: "terser", // 使用 terser 压缩
    terserOptions: {
      compress: {
        drop_console: true, // 去掉 console
        drop_debugger: true, // 去掉 debugger
      },
      format: {
        comments: false, // 去掉注释
      },
    },
    rollupOptions: {
      output: {
        // 所有懒加载的 chunk 输出到单独文件夹下
        chunkFileNames: "assets/vendor/[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
        // 手动分包策略
        manualChunks: {
          // React 相关库单独打包
          "react-vendor": ["react", "react-dom"],
          // React Router 相关
          router: ["react-router-dom"],
          // Radix UI 组件库相关 (只包含实际安装的包)
          "radix-ui": [
            "@radix-ui/react-alert-dialog",
            "@radix-ui/react-aspect-ratio",
            "@radix-ui/react-avatar",
            "@radix-ui/react-checkbox",
            "@radix-ui/react-collapsible",
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-icons",
            "@radix-ui/react-label",
            "@radix-ui/react-popover",
            "@radix-ui/react-progress",
            "@radix-ui/react-radio-group",
            "@radix-ui/react-scroll-area",
            "@radix-ui/react-select",
            "@radix-ui/react-separator",
            "@radix-ui/react-slot",
            "@radix-ui/react-switch",
            "@radix-ui/react-tabs",
            "@radix-ui/react-toast",
            "@radix-ui/react-toggle",
            "@radix-ui/react-tooltip",
          ],
          // 工具库
          utils: [
            "clsx",
            "class-variance-authority",
            "tailwind-merge",
            "lucide-react",
            "cmdk",
            "next-themes",
            "tailwindcss-animate",
          ],
          // 国际化相关
          i18n: ["i18next", "react-i18next"],
          // 状态管理和数据处理
          data: ["zustand", "axios", "swr"],
          // 表单和验证
          forms: ["react-hook-form", "@hookform/resolvers", "zod"],
          // 图表和可视化
          charts: ["recharts", "react-qr-code"],
          // Markdown 和文本处理
          markdown: ["react-markdown", "rehype-raw", "remark-gfm"],
          // 其他工具
          misc: ["dayjs", "input-otp", "react-responsive", "sonner", "vaul"],
        },
      },
    },
  },
});
