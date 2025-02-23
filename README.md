# 简历编辑器

一个现代化的在线简历编辑器，基于 Vue 3 + TypeScript + Element Plus 开发。

## 功能特点

- 📝 所见即所得的编辑体验
- 🎨 多种简历模板
- 💾 自动保存
- 📤 导出 PDF
- 📱 响应式设计

## 技术栈

- Vue 3
- TypeScript
- Pinia
- Vue Router
- Element Plus
- UnoCSS
- Vite

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 项目结构

```
src/
├── assets/        # 静态资源
├── components/    # 组件
│   ├── editor/    # 编辑器组件
│   ├── preview/   # 预览组件
│   └── common/    # 通用组件
├── composables/   # 组合式函数
├── stores/        # Pinia 状态管理
├── types/         # TypeScript 类型定义
├── utils/         # 工具函数
└── views/         # 页面视图
```

## 许可证

MIT 