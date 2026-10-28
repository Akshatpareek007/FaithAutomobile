import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "vite";
import { resolve } from "path";
import { glob } from "glob";

// Get all HTML files as entry points
const htmlFiles = glob.sync("*.html", { cwd: process.cwd() });
const input = {};

htmlFiles.forEach((file) => {
  const name = file.replace('.html', '');
  input[name] = resolve(process.cwd(), file);
});

export default defineConfig({
  plugins: [cloudflare()],
  build: {
    rollupOptions: {
      input: input,
    },
  },
});
