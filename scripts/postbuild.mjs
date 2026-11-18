// next build 之后：正式上线（src/data/launch.json → launched: true）时，去掉 out/_headers 里的 noindex，并放开 robots.txt。
import { readFileSync, writeFileSync } from "node:fs";

const launch = JSON.parse(readFileSync(new URL("../src/data/launch.json", import.meta.url), "utf8"));
const headersFile = new URL("../out/_headers", import.meta.url);
if (launch.launched) {
  writeFileSync(headersFile, readFileSync(headersFile, "utf8").replace(/^\s*X-Robots-Tag:.*\n/m, ""));
  writeFileSync(new URL("../out/robots.txt", import.meta.url), "User-agent: *\nAllow: /\n");
  console.log("postbuild: 已上线 —— 允许搜索引擎收录。");
} else {
  console.log("postbuild: 演示阶段 —— 保持 noindex。");
}
