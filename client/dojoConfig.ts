import { createDojoConfig } from "@dojoengine/core";

import manifest from "./src/manifest_dev.json";

export const dojoConfig = createDojoConfig({
    manifest,
    masterAddress: "0x6044d4dbbb271bd4392f84b49f1bf593cbf9d5eadb657bfedbbe475daeaf182",
    masterPrivateKey: "0x3b912ca72fc70b8b8937b43a9367a67f34e725299605a325df264b1cf8fd41d",
    rpcUrl: "https://api.cartridge.gg/x/bytebeast-stable/katana",
    toriiUrl: "https://api.cartridge.gg/x/bytebeast-stable/torii",
});
