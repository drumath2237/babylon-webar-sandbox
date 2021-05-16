import { defineConfig } from "vite";
import * as fs from "fs";

const config = defineConfig({
  server: {
    https: {
      key: fs.readFileSync("./key.pem"),
      cert: fs.readFileSync("./cert.pem"),
    },
  },
});

const configGHPages = defineConfig({
  base: "/babylon-webar-sandbox",
});

export default ({ command, mode }) => {
  if (mode === "production") {
    console.log("for gh-pages...");
    return configGHPages;
  } else {
    console.log("for local...");
    return config;
  }
};
