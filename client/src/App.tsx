import { useEffect, useMemo } from "react";
import { SDK, createDojoStore } from "@dojoengine/sdk";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { addAddressPadding } from "starknet";

import { Models, Schema } from "./bindings/models.gen.ts";
import { useDojo } from "./useDojo.tsx";
import useModel from "./useModel.tsx";
import { useSystemCalls } from "./useSystemCalls.ts";

export const useDojoStore = createDojoStore<Schema>();

function App({ sdk }: { sdk: SDK<Schema> }) {
    const {
        account,
        setup: { client },
    } = useDojo();
    const state = useDojoStore((state) => state);
    const entities = useDojoStore((state) => state.entities);

    const { spawn } = useSystemCalls();

    const entityId = useMemo(
        () => getEntityIdFromKeys([BigInt(account?.account.address)]),
        [account?.account.address]
    );

    useEffect(() => {
        let unsubscribe: (() => void) | undefined;

        const subscribe = async () => {
            const subscription = await sdk.subscribeEntityQuery(
                {
                    dojo_starter: {
                        Beast: {
                            $: {
                                where: {
                                    player: {
                                        $is: addAddressPadding(
                                            account.account.address
                                        ),
                                    },
                                },
                            },
                        },
                    },
                },
                (response) => {
                    if (response.error) {
                        console.error(
                            "Error setting up entity sync:",
                            response.error
                        );
                    } else if (
                        response.data &&
                        response.data[0].entityId !== "0x0"
                    ) {
                        console.log("subscribed", response.data[0]);
                        state.updateEntity(response.data[0]);
                    }
                },
                { logging: true }
            );

            unsubscribe = () => subscription.cancel();
        };

        subscribe();

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [sdk, account?.account.address]);

    useEffect(() => {
        const fetchEntities = async () => {
            try {
                await sdk.getEntities(
                    {
                        dojo_starter: {
                            Beast: {
                                $: {
                                    where: {
                                        player: {
                                            $eq: addAddressPadding(
                                                account.account.address
                                            ),
                                        },
                                    },
                                },
                            },
                        },
                    },
                    (resp) => {
                        if (resp.error) {
                            console.error(
                                "resp.error.message:",
                                resp.error.message
                            );
                            return;
                        }
                        if (resp.data) {
                            state.setEntities(resp.data);
                        }
                    }
                );
            } catch (error) {
                console.error("Error querying entities:", error);
            }
        };

        fetchEntities();
    }, [sdk, account?.account.address]);

    const beasts = useModel(entityId, Models.Beast);

    return (
        <div className="bg-black min-h-screen w-full p-4 sm:p-8">
            <div className="max-w-7xl mx-auto">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    <div className="bg-gray-700 p-4 rounded-lg shadow-inner">
                        <div className="grid grid-cols-3 gap-2 w-full h-48">
                            <div className="col-start-2">
                                <button
                                    className="h-12 w-12 bg-gray-600 rounded-full shadow-md active:shadow-inner active:bg-gray-500 focus:outline-none text-2xl font-bold text-gray-200"
                                    onClick={async () => await spawn()}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
