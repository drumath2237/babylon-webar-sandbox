import { defineConfig } from "vite";
import * as fs from "fs";

export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync("./key.pem"),
      cert: fs.readFileSync("./cert.pem"),
    },
  },
});
