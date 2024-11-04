import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import topLevelAwait from "vite-plugin-top-level-await";
import wasm from "vite-plugin-wasm";
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), wasm(), topLevelAwait()],
    // server: {
    //     https: {
    //         key:  fs.readFileSync('localhost-key.pem'),
    //         cert: fs.readFileSync('localhost.pem'),
    //     },
    // },
});
