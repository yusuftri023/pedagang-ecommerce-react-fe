import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    https: {
      key: fs.readFileSync("./src/utils/SSL/192.168.1.5-key.pem"),
      cert: fs.readFileSync("./src/utils/SSL/192.168.1.5.pem"),
    },
    host: "0.0.0.0",
    port: 5173,
  },
});
