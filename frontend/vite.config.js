import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "API_");
  const proxy = { "/api": env.API_TARGET || "http://127.0.0.1:5000" };
  return { server: { proxy }, preview: { proxy } };
});
