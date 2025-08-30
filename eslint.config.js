import js from "@eslint/js" // 推荐的js规范
import globals from "globals"
import tseslint from "typescript-eslint" // 推荐的ts规范
import pluginVue from "eslint-plugin-vue" // 推荐的vue的规范
import { defineConfig } from "eslint/config"
import prettierRecommend from "eslint-plugin-prettier/recommended"

// esModule commonjs
export default defineConfig([
  {
    // mjs指定ES模块，cjs指定CommonJS模块
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"], // 支持校验的文件类型
    plugins: { js },
    extends: ["js/recommended"], // 使用js的推荐规范
    languageOptions: { globals: { ...globals.browser, ...globals.node } } // 定义全局变量
  },
  tseslint.configs.recommended,
  pluginVue.configs["flat/essential"],
  {
    files: ["**/*.vue"], // 仅对Vue文件应用
    languageOptions: {
      parserOptions: { parser: tseslint.parser } // 使用typescript-eslint的解析器
    }
  },
  { ignores: [".css", "*.d.ts"] }, // 忽略特定文件和目录
  {
    // 这里可以添加自定义规则
    // 一般不再这里做样式配置，主要用于规范
    rules: {
      "no-console": "warn" // 关闭console的警告
    }
  },
  prettierRecommend // 使用prettier的推荐配置，放在最后，覆盖之前的规则
])
