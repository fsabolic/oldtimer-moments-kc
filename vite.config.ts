import { defineConfig, loadEnv } from "vite";
import solidPlugin from "vite-plugin-solid";
import devtools from "solid-devtools/vite";
import solidSvg from "vite-plugin-solid-svg";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [devtools(), solidPlugin(), solidSvg()],
    base: env.VITE_BASE_URL,
    server: {
      port: 3000,
    },
    build: {
      target: "esnext",
    },
  };
});
