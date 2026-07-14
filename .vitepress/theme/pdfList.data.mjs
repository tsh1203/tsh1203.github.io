import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  // .vitepress/theme -> 仓库根 -> public/files
  watch: ["../../public/files/*.pdf"],
  load() {
    const dir = path.resolve(__dirname, "../../public/files");
    if (!fs.existsSync(dir)) return [];

    return fs
      .readdirSync(dir)
      .filter((f) => f.toLowerCase().endsWith(".pdf"))
      .map((f) => {
        const stat = fs.statSync(path.join(dir, f));
        return {
          name: f.replace(/\.pdf$/i, ""),
          url: `/files/${encodeURIComponent(f)}`,
          size: (stat.size / 1024 / 1024).toFixed(2) + " MB",
          mtime: stat.mtime.toISOString().split("T")[0],
        };
      })
      .sort((a, b) => new Date(b.mtime) - new Date(a.mtime));
  },
};
