import { useEffect, useMemo, useState } from "react";
import { SDK, createDojoStore } from "@dojoengine/sdk";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { addAddressPadding } from "starknet";
import { Models, Schema } from "./bindings/models.gen.ts";
import { useDojo } from "./useDojo.tsx";
import useModel from "./useModel.tsx";
import { useSystemCalls } from "./useSystemCalls.ts";
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card.tsx';
import { Progress } from './components/ui/progress';
import { Button } from './components/ui/button';
import { Heart, Pizza, Coffee, Bath, Gamepad2, Sun } from 'lucide-react';
import './styles/globals.css';
import { Chain, sepolia } from "@starknet-react/chains";
import { StarknetConfig, starkscan } from "@starknet-react/core";
import { RpcProvider } from "starknet";
import cartridgeConnector from "./cartridgeConnector";
import ControllerConnectButton from './ControllerConnectButton';

function provider(chain: Chain) {
  return new RpcProvider({
    nodeUrl: "https://api.cartridge.gg/x/starknet/sepolia",
  });
}

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

  const [currentImage, setCurrentImage] = useState('/babybeast_happy.gif');

  const beast = useModel(entityId, Models.Beast);
  console.log(beast);

  return (
    <StarknetConfig
      autoConnect
      chains={[sepolia]}
      connectors={[cartridgeConnector]}
      explorer={starkscan}
      provider={provider}
    >
      <div className="min-h-screen bg-background">
      <ControllerConnectButton />
        {
          beast
            ? <div className="w-full max-w-2xl mx-auto p-4">
              <Card>
                <CardContent>
                  <div className="space-y-6">

                    {/* Centered Tamagotchi Image */}
                    <div className="flex justify-center mb-4">
                      <img src={currentImage} alt="Tamagotchi" className="w-40 h-40" />
                    </div>

                    {/* Hunger Bar */}
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="text-red-500" />
                      <Progress value={beast.hunger} />
                      <span className="w-12 text-right font-medium text-white">{Math.round(beast.hunger)}%</span>
                    </div>

                    {/* Energy Bar */}
                    <div className="flex items-center gap-2 mb-2">
                      <Coffee className="text-yellow-600" />
                      <Progress value={beast.energy} />
                      <span className="w-12 text-right font-medium text-white">{Math.round(beast.energy)}%</span>
                    </div>

                    {/* Happiness Bar */}
                    <div className="flex items-center gap-2 mb-2">
                      <Gamepad2 className="text-green-500" />
                      <Progress value={beast.happiness} />
                      <span className="w-12 text-right font-medium text-white">{Math.round(beast.happiness)}%</span>
                    </div>

                    {/* Hygiene Bar */}
                    <div className="flex items-center gap-2 mb-2">
                      <Bath className="text-blue-500" />
                      <Progress value={beast.hygiene} />
                      <span className="w-12 text-right font-medium text-white">{Math.round(beast.hygiene)}%</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <Button
                        onClick={async () => await client.actions.feed(account.account)}
                        disabled={!beast.is_alive}
                        className="flex items-center gap-2"
                      >
                        <Pizza className="w-4 h-4" /> Feed
                      </Button>
                      <Button
                        onClick={async () => await client.actions.decreaseStats(account.account)}
                        disabled={!beast.is_alive}
                        className="flex items-center gap-2"
                      >
                        <Pizza className="w-4 h-4" /> Decrease
                      </Button>
                      <Button
                        onClick={async () => await client.actions.sleep(account.account)}
                        disabled={!beast.is_alive}
                        className="flex items-center gap-2"
                      >
                        <Coffee className="w-4 h-4" /> Sleep
                      </Button>
                      <Button
                        onClick={async () => await client.actions.play(account.account)}
                        disabled={!beast.is_alive}
                        className="flex items-center gap-2"
                      >
                        <Gamepad2 className="w-4 h-4" /> Play
                      </Button>
                      <Button
                        onClick={async () => await client.actions.clean(account.account)}
                        disabled={!beast.is_alive}
                        className="flex items-center gap-2"
                      >
                        <Bath className="w-4 h-4" /> Clean
                      </Button>
                      {/* <Button
                      onClick={async () => await client.actions.sleep(account.account)}
                      disabled={!isAlive}
                      className="flex items-center gap-2"
                    >
                      <Sun className="w-4 h-4" /> Wake Up
                    </Button> */}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            : <button onClick={async () => spawn()}>Spawn</button>
        }
      </div>
    </StarknetConfig>
  );
}

export default App;
