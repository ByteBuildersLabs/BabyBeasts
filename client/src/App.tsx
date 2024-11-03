import { useEffect, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SDK, createDojoStore } from "@dojoengine/sdk";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { addAddressPadding } from "starknet";
import { Models, Schema } from "./bindings/models.gen.ts";
import { useDojo } from "./useDojo.tsx";
import useModel from "./useModel.tsx";
import { useSystemCalls } from "./useSystemCalls.ts";
import TamagotchiDashboard from './components/tamagotchi-dashboard';
import Background from './components/ui/Background';
import './styles/globals.css';

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
      <div className="min-h-screen bg-background">
        <Router>
          {/* Background component, which applies a video background */}
          <Background />

          <div id="content">
            <Routes>
              {/* Define routes here, including your main game route */}
              <Route path="/" element={<TamagotchiDashboard />} />
            </Routes>
          </div>
        </Router>
      </div>
    );
}

export default App;
