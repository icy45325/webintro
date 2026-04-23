# 南风建筑工作室 · 作品集网站

Next.js 15 · TypeScript · Tailwind CSS v4 · next-intl (中英双语) · MDX 内容 · Vercel 部署。

## 开发

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

根路径 `/` 会自动重定向到默认语言 `/zh`。

## 脚本

```bash
pnpm dev         # 开发服务器
pnpm build       # 生产构建
pnpm start       # 生产预览
pnpm lint        # ESLint (next lint)
pnpm typecheck   # tsc --noEmit
```

## 目录约定

```
app/                 # Next.js App Router
  [locale]/          # zh / en
content/             # MDX 正文与 frontmatter
  works/<slug>/index.{zh,en}.mdx
  philosophy/{zh,en}.mdx
  cv/{zh,en}.mdx
public/
  works/<slug>/*     # 项目图片
  seeds/*            # 共享占位图（上线前替换）
components/          # 可复用组件
lib/                 # 内容读取、i18n、LQIP、OG 图
messages/            # 界面文案 (zh.json / en.json)
```

## 新增作品 / 维护图片

见 [`content/README.md`](./content/README.md)。

## 部署

推送到 GitHub → 在 Vercel 导入仓库即可，无需额外配置。

- 生产域名请在 `app/sitemap.ts`、`app/robots.ts`、`app/layout.tsx` 的 `metadataBase` 中替换 `https://nanfeng.studio`。

## 后续优化清单

- 真实图片替换 `public/works/` 与 `public/seeds/` 下的占位 SVG
- 中文字体自托管子集（当前用 Google Fonts 的 unicode-range 分包；如需进一步瘦身，自行将 `.woff2` 源放到 `public/fonts/` 并用 `next/font/local` 加载）
- 更换作品联系邮箱 `hello@nanfeng.studio` 为真实邮箱
- 完善 `app/layout.tsx` metadataBase 为正式域名
- 按需加暗色模式（Tailwind v4 `dark:` + `@theme`）
