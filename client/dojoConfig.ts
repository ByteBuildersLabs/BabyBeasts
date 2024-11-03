import { createDojoConfig } from "@dojoengine/core";

import manifest from "./src/manifest_dev.json";

export const dojoConfig = createDojoConfig({
    manifest,
});
