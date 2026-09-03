import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// IMPORTANT: base must match your repo name for GitHub Pages project sites.
// e.g. if your repo is github.com/Yuri12-3/kalendar, base should be "/kalendar/"
export default defineConfig({
  plugins: [react()],
  base: "/kalendar/",
});
