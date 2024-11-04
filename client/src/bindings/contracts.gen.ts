import { DojoProvider } from "@dojoengine/core";
import { Account } from "starknet";

export function client(provider: DojoProvider) {
    // System definitions for `dojo_starter-actions` contract
    function actions() {
        const spawn = async (account: Account) => {
            try {
                return await provider.execute(

                    account,
                    {
                        contractName: "actions",
                        entrypoint: "spawn",
                        calldata: [],
                    },
                    "dojo_starter"
                );
            } catch (error) {
                console.error(error);
            }
        };

        const decreaseStats = async (account: Account) => {
            try {
                return await provider.execute(

                    account,
                    {
                        contractName: "actions",
                        entrypoint: "decrease_stats",
                        calldata: [],
                    },
                    "dojo_starter"
                );
            } catch (error) {
                console.error(error);
            }
        };

        const feed = async (account: Account) => {
            try {
                return await provider.execute(

                    account,
                    {
                        contractName: "actions",
                        entrypoint: "feed",
                        calldata: [],
                    },
                    "dojo_starter"
                );
            } catch (error) {
                console.error(error);
            }
        };

        const sleep = async (account: Account) => {
            try {
                return await provider.execute(

                    account,
                    {
                        contractName: "actions",
                        entrypoint: "sleep",
                        calldata: [],
                    },
                    "dojo_starter"
                );
            } catch (error) {
                console.error(error);
            }
        };

        const awake = async (account: Account) => {
            try {
                return await provider.execute(

                    account,
                    {
                        contractName: "actions",
                        entrypoint: "awake",
                        calldata: [],
                    },
                    "dojo_starter"
                );
            } catch (error) {
                console.error(error);
            }
        };


        const play = async (account: Account) => {
            try {
                return await provider.execute(

                    account,
                    {
                        contractName: "actions",
                        entrypoint: "play",
                        calldata: [],
                    },
                    "dojo_starter"
                );
            } catch (error) {
                console.error(error);
            }
        };

        const clean = async (account: Account) => {
            try {
                return await provider.execute(

                    account,
                    {
                        contractName: "actions",
                        entrypoint: "clean",
                        calldata: [],
                    },
                    "dojo_starter"
                );
            } catch (error) {
                console.error(error);
            }
        };

        const revive = async (account: Account) => {
            try {
                return await provider.execute(

                    account,
                    {
                        contractName: "actions",
                        entrypoint: "revive",
                        calldata: [],
                    },
                    "dojo_starter"
                );
            } catch (error) {
                console.error(error);
            }
        };

        const worldDispatcher = async (account: Account) => {
            try {
                return await provider.execute(

                    account,
                    {
                        contractName: "actions",
                        entrypoint: "world_dispatcher",
                        calldata: [],
                    },
                    "dojo_starter"
                );
            } catch (error) {
                console.error(error);
            }
        };

        const dojoName = async (account: Account) => {
            try {
                return await provider.execute(

                    account,
                    {
                        contractName: "actions",
                        entrypoint: "dojo_name",
                        calldata: [],
                    },
                    "dojo_starter"
                );
            } catch (error) {
                console.error(error);
            }
        };

        return {
            spawn,
            decreaseStats,
            feed,
            sleep,
            awake,
            play,
            clean,
            revive,
            worldDispatcher,
            dojoName,
        };
    }

    return {
        actions: actions(),
    };
}
