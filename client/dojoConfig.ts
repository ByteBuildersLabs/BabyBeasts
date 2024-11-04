import { createDojoConfig } from "@dojoengine/core";

import manifest from "./src/manifest_dev.json";

export const dojoConfig = createDojoConfig({
    manifest,
    // masterAddress: "0x6c11338f286b49ad0bc0ced54ec3fd1432cd6339dcc6f841e6feefbb6b8017e",
    // masterPrivateKey: "0x28d9ba7b694bed41c1a5e713be2d992d53b8088b28a6001c45616b23e72e2c4",
    // rpcUrl: " https://api.cartridge.gg/x/baby/katana",
    // toriiUrl: "https://api.cartridge.gg/x/baby/torii",
});
