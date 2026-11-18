# 图片

第一版图片全部来自 **Unsplash**（[Unsplash License](https://unsplash.com/license)：可免费用于商业用途，无需署名，不得原样转售）。
登记在 `src/data/images.ts`，每条写明用途和 Unsplash 图片编号（`https://unsplash.com/photos/<编号>`）。

构建时 `scripts/fetch-images.mjs` 会：
1. 通过 Unsplash 官方下载地址取原图；
2. 用 sharp 压缩成 1920px 宽的 WebP，存到 `public/images/`；
3. 写入 `src/data/image-manifest.json`，页面只引用本站 `/images/...`，**不依赖国外图床**。

下载失败的图片会显示素雅的渐变占位底色，不影响构建。

## 换成医院实拍

1. 把照片转成 WebP（或直接用 jpg），命名为对应的 id，例如 `public/images/building.webp`；
2. 在 `src/data/image-manifest.json` 写上 `"building": "/images/building.webp"`；
3. 提交即可（已存在的文件构建时不会被覆盖）。

医师照片：在 `src/components/ui.tsx` 的 `Avatar` 组件里改为读取 `/images/doctors/<slug>.webp`。
