# 重庆潼南友善阳光中医医院 · 官网（第一版 · 演示）

给院方看的高保真演示站。内容全部来自《官网内容资料包》（公开信息整理），**待医院审定后才可正式发布**。
页面上带 <ins>虚线下划线</ins> 的值 = 待院方确认；图片为 Unsplash 免费商用示意图。

| 页面 | 路径 | 内容 |
|---|---|---|
| 首页 | `/` | 轮播、快捷服务、医院简介 + 数据、科室导航（分组切换）、特色医疗、医师团队、新闻、就医信息、医保与技术指导 |
| 走进医院 | `/about/` | 医院概况、发展历程、资质荣誉、院区分布、医疗设备 |
| 科室导航 | `/departments/` + 7 个科室详情页 | 按执业登记诊疗科目设置；疼痛、肛肠作为专病方向归入所属科室 |
| 医师团队 | `/doctors/` + 13 个医师详情页 | 按科室筛选；头像为占位，待院方提供标准照 |
| 特色医疗 | `/featured/` | 中西医结合康复、PRP（已删去美容生发等超范围表述）、孕产服务、24 小时急诊 |
| 就医指南 | `/guide/` | 门诊时间、预约挂号、就诊流程、医保、住院须知（待补）、交通 |
| 新闻动态 | `/news/` | 医院新闻、通知公告、健康科普（示例） |
| 联系我们 / 人才招聘 | `/contact/`、`/careers/` | |

国内网站常见元素：顶部通栏（24 小时电话 + **关怀版**大字模式）、悬停下拉导航、右侧悬浮栏（电话 / 挂号 / 公众号 / 导航 / 回顶部）、
手机底部快捷栏（一键拨号 / 预约 / 到院导航）、页脚友情链接、执业登记号与 ICP 备案位。

## 技术栈

Next.js 16 静态导出（`output: "export"`）+ TypeScript + Tailwind CSS v4 + lucide 图标。
中文用系统字体（苹方 / 微软雅黑；标题用宋体），**不加载任何国外字体或 CDN**，国内打开不受影响。

## 本地运行

```bash
npm install
npm run dev        # http://localhost:3000
npm run check      # 类型检查 + lint + 构建（不下载图片）
npm run build      # 下载图片 → 构建 → out/
```

## 改内容

所有文字都在 `src/data/`，组件里不写死文案：

| 文件 | 内容 |
|---|---|
| `site.ts` | 名称、电话、地址、门诊时间、院区、导航、医保、技术指导医院、友情链接 |
| `departments.ts` | 科室简介、诊疗范围、特色技术、科室医师 |
| `doctors.ts` | 医师资料 |
| `content.ts` | 医院简介、沿革、资质荣誉、设备、特色医疗、新闻、招聘 |
| `images.ts` | 图片登记表 |

待确认的值写成 `tbc("…")`，确认后改成普通字符串即可。

## 部署

Cloudflare Workers Builds 已连接本仓库，**push 到 `main` 自动部署**：
<https://tongnan-youshan-hospital.wangxcep.workers.dev>（`*.workers.dev` 在中国大陆通常打不开，给院方看需绑定自定义域名，见 `docs/DEPLOYMENT.md`）。

演示阶段全站 `noindex`。正式上线把 `src/data/launch.json` 改为 `{ "launched": true }`。

## 文档

- [`CHANGELOG.md`](CHANGELOG.md) — 每次发布的提交号与回滚方法
- [`docs/CLIENT-CONFIRMATION.md`](docs/CLIENT-CONFIRMATION.md) — 需要院方提供 / 确认的事项
- [`docs/IMAGES.md`](docs/IMAGES.md) — 图片来源与替换方法
- [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) — 部署、域名与国内访问
