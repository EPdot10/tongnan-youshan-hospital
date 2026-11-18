#!/usr/bin/env node
/**
 * 构建前下载 src/data/images.ts 里登记的图片（Unsplash 免费商用图 + 医院公众号实拍），
 * 转成 WebP 存到 public/images/，并写 src/data/image-manifest.json。
 * 这样网站只引用自己域名下的图片，不依赖国外图床（国内访问更快更稳）。
 *
 * - 文件名 = id + 来源哈希；同名文件已存在则跳过。
 * - 某张图下载失败不会让构建失败：页面会显示一个素雅的占位底色。
 * - 换成医院实拍：把照片放进 public/images/<id>.webp，manifest 里写上路径即可（见 docs/IMAGES.md）。
 */
import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const registry = await readFile(path.join(root, "src/data/images.ts"), "utf8");
const entries = [...registry.matchAll(/id:\s*"([^"]+)",\s*src:\s*"([^"]+)"/g)].map((m) => ({
  id: m[1],
  url: m[2].startsWith("unsplash:")
    ? `https://images.unsplash.com/photo-${m[2].slice(9)}?auto=format&fm=jpg&fit=max&q=82&w=1920`
    : m[2],
}));

const outDir = path.join(root, "public/images");
await mkdir(outDir, { recursive: true });
const manifestPath = path.join(root, "src/data/image-manifest.json");
const manifest = JSON.parse(await readFile(manifestPath, "utf8").catch(() => "{}"));

const exists = (p) => access(p).then(() => true, () => false);

async function one(e) {
  if (e.url.startsWith("local:")) {
    manifest[e.id] = e.url.slice(6);
    return `= ${e.id}（本地文件）`;
  }
  // 文件名带来源地址的哈希：换图后文件名随之改变，浏览器 / CDN 不会继续显示旧缓存
  const file = `${e.id}-${createHash("sha1").update(e.url).digest("hex").slice(0, 8)}.webp`;
  const target = path.join(outDir, file);
  if (await exists(target)) {
    manifest[e.id] = `/images/${file}`;
    return `= ${e.id}（已存在）`;
  }
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 30000);
  try {
    // 不带 Referer：微信图片只拦截外站引用，服务器直接下载可以取到
    const res = await fetch(e.url, {
      redirect: "follow",
      signal: ctrl.signal,
      referrerPolicy: "no-referrer",
      headers: { "User-Agent": "Mozilla/5.0 (compatible; tongnan-youshan-hospital build)" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await sharp(buf).rotate().resize({ width: 1920, withoutEnlargement: true }).webp({ quality: 76 }).toFile(target);
    manifest[e.id] = `/images/${file}`;
    return `✓ ${e.id}`;
  } catch (err) {
    delete manifest[e.id];
    return `✗ ${e.id}: ${err.message}（页面将显示占位底色）`;
  } finally {
    clearTimeout(timer);
  }
}

// 每次并发 6 张
for (let i = 0; i < entries.length; i += 6) {
  const res = await Promise.all(entries.slice(i, i + 6).map(one));
  res.forEach((l) => console.log(l));
}
await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
console.log(`\n图片：${Object.keys(manifest).length}/${entries.length} 张可用（本地托管）。`);
