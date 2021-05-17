import { defineConfig } from "vite";
import * as fs from "fs";

export default ({ command, mode }) => {
  if (mode === "production") {
    console.log("for gh-pages...");

    const config = defineConfig({
      base: "/babylon-webar-sandbox",
    });

    return config;
  } else {
    console.log("for local...");

    const config = defineConfig({
      server: {
        https: {
          key: fs.readFileSync("./key.pem"),
          cert: fs.readFileSync("./cert.pem"),
        },
      },
    });

    return config;
  }
};
