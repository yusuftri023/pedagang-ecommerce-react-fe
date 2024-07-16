import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync("./src/utils/SSL/127.0.0.1-key.pem"),
      cert: fs.readFileSync("./src/utils/SSL/127.0.0.1.pem"),
    },
    host: "127.0.0.1",
  },
});
