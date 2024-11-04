import { createDojoConfig } from "@dojoengine/core";

import manifest from "./src/manifest_dev.json";

export const dojoConfig = createDojoConfig({
    manifest,
    masterAddress: "0x65f99390ee8ba6e3f55a69674da7318e395e92ee1cdc3e3952211c1889daa23",
    masterPrivateKey: "0x5bd7340e7abdfe2dfb8e98e5f2c36751f30c0496678bf4cc1ec344b117ce54d",
    rpcUrl: "https://api.cartridge.gg/x/tamaguchibeast/katana",
    toriiUrl: "https://api.cartridge.gg/x/tamaguchibeast/torii",
});
