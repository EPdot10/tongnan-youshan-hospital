# 部署

## 当前：Cloudflare Workers Builds（免费）

- 项目名：`tongnan-youshan-hospital`（必须与 `wrangler.jsonc` 的 `name` 一致）
- 地址：**<https://tongnan.epdotstudio.com>**（自定义域名，写在 `wrangler.jsonc` 的 `routes` 里，部署时自动创建 DNS 与证书）
- 备用：<https://tongnan-youshan-hospital.wangxcep.workers.dev>（国内打不开）
- `epdotstudio.com` 是工作室的展示域名，其他客户项目各用一个子域名（如 `xxx.epdotstudio.com`）
- 构建命令：`npm run build`；部署命令：`npx wrangler deploy`；变量 `NODE_VERSION=22`
- push 到 `main` 自动部署；其它分支生成预览地址 `*-tongnan-youshan-hospital.wangxcep.workers.dev`

## 国内访问

- `*.workers.dev` 在中国大陆基本无法访问。给院方演示前，在 Cloudflare 项目 **Settings → Domains & Routes → Add custom domain** 绑定一个托管在 Cloudflare 的域名（例如 `demo.你的域名.com`）。国内访问 Cloudflare 自定义域名一般可以打开，但速度不稳定。
- **正式上线**：按国内法规，面向大陆用户的网站需要 ICP 备案，服务器 / CDN 需在大陆（阿里云、腾讯云等）。本站是纯静态文件（`out/` 目录），可直接上传到阿里云 OSS / 腾讯云 COS + CDN，无需改代码。
- 医疗机构网站另需注意：医疗广告审查证明核准范围、公安备案（网站上线后 30 日内）。
