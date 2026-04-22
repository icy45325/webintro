# 内容维护指南

## 新增作品

在 `content/works/` 下新建一个以 slug 命名的文件夹（例如 `guan-yun`），内含：

```
content/works/<slug>/
  index.zh.mdx
  index.en.mdx
```

对应的图片放到 `public/works/<slug>/`。

## Frontmatter 字段

```yaml
title: 项目名
year: 2024
location: 省 · 城市
category: built            # built | concept | research
program: residential       # residential / cultural / commercial / public / research
area: 480                  # 平方米（数字或字符串）
client: 委托方
status: 已落成
visibility: public         # public | preview | nda
role: 主创建筑师
collaborators:
  - { name: "XXX 事务所", role: "结构" }
photographer: 摄影师
brief: 一句 40 字以内的项目抛引
cover: /works/<slug>/cover.jpg
gallery:
  - /works/<slug>/01.jpg
featured: true
order: 1
```

### visibility 策略

- `public` — 全部展示
- `preview` — 列表有卡片（带 NDA 角标），详情页只显示 cover + brief + 元数据
- `nda` — 列表与详情都不出现，文件仅保留在本地

### 正文结构

推荐「问题 → 策略 → 物」三段式；可用 `<Process>`、`<Drawings>`、`<Figure>` 组件。

## 图片规范

- **封面 `cover`**：比例 3:2，长边 2400px，< 500KB，JPG/AVIF
- **`gallery` / `<Figure>`**：长边 2400px，< 500KB
- **Process 图**（草图/模型）：长边 1600px
- **Drawings**（平面/剖面/轴测）：SVG 优先；PNG 需 2400px 长边
- 文件名：`cover.jpg / 01.jpg / 02.jpg / process-01.jpg / plan-01.svg / section-01.svg`
- 摄影署名写 frontmatter 的 `photographer`

种子阶段用 `public/seeds/` 里的共享 SVG；正式项目请替换为真实图片。

## MDX 组件

- `<Figure src alt caption credit />` — 单图 + 图注 + 摄影署名
- `<Process items={[{ src, caption }]} />` — 草图/模型照拼贴
- `<Drawings items={[{ src, label, type }]} />` — 图纸区，点击放大
