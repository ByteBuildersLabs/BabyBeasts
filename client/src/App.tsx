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
import Background from "./components/Background/index";
import './styles/globals.css';
import { Chain, sepolia } from "@starknet-react/chains";
import { StarknetConfig, starkscan } from "@starknet-react/core";
import { RpcProvider } from "starknet";
import cartridgeConnector from "./cartridgeConnector";

import sleep from './img/sleep.gif';
import eat from './img/eat.gif';
import play from './img/play.gif';
import shower from './img/shower.gif';
import happy from './img/happy.gif';
import dead from './img/dead.gif';
import Header from "./components/Header/index.tsx";
import Footer from "./components/Footer/index.tsx";
import Play from "./components/Play/index.tsx";


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

  const [currentImage, setCurrentImage] = useState(happy);

  const showAnimationWithoutTimer = (gifPath: string) => {
    setCurrentImage(gifPath);
  };

  const showAnimation = (gifPath: string) => {
    setCurrentImage(gifPath);
    setTimeout(() => {
      setCurrentImage(happy);
    }, 3000);
  };

  const showDeathAnimation = () => {
    setCurrentImage(dead);
  };

  const beast = useModel(entityId, Models.Beast);
  console.log(beast);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (beast?.is_alive) {
        await client.actions.decreaseStats(account.account);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [beast?.is_alive]);

  useEffect(() => {
    if (!beast?.is_alive) {
      showDeathAnimation();
    }
  }, [beast?.is_alive]);

  return (
    <StarknetConfig
      autoConnect
      chains={[sepolia]}
      connectors={[cartridgeConnector]}
      explorer={starkscan}
      provider={provider}
    >
      <div className="App">
        <Background />
        <Header />
        {
          beast
            ? <div className="tamaguchi">
              <div className="section-title title-style-two text-center">
                <span>Byte Builders Labs</span>
                <h2>Take care of<span className="d-block">your own Baby Beast</span></h2>
              </div>
              <Card>
                <CardContent>
                  <div className="space-y-6">

                    {/* Centered Tamagotchi Image */}
                    <div className="flex justify-center mt-2 mb-4">
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
                        onClick={async () => {
                          await client.actions.feed(account.account);
                          if (beast.is_alive) showAnimation(eat);
                        }}
                        disabled={!beast.is_alive}
                        className="flex items-center gap-2 button"
                      >
                        <Pizza className="w-4 h-4" /> Feed
                      </Button>
                      <Button
                        onClick={async () => {
                          await client.actions.sleep(account.account);
                          if (beast.is_alive) showAnimationWithoutTimer(sleep);
                        }}
                        disabled={!beast.is_alive}
                        className="flex items-center gap-2 button"
                      >
                        <Coffee className="w-4 h-4" /> Sleep
                      </Button>
                      <Button
                        onClick={async () => {
                          await client.actions.play(account.account);
                          if (beast.is_alive) showAnimation(play);
                        }}
                        disabled={!beast.is_alive}
                        className="flex items-center gap-2 button"
                      >
                        <Gamepad2 className="w-4 h-4" /> Play
                      </Button>
                      <Button
                        onClick={async () => {
                          await client.actions.clean(account.account);
                          if (beast.is_alive) showAnimation(shower);
                        }}
                        disabled={!beast.is_alive}
                        className="flex items-center gap-2 button"
                      >
                        <Bath className="w-4 h-4" /> Clean
                      </Button>
                      <Button
                        onClick={async () => {
                          await client.actions.awake(account.account);
                          if (beast.is_alive) setCurrentImage(happy);
                        }}
                        disabled={!beast.is_alive}
                        className="flex items-center gap-2 button"
                      >
                        <Sun className="w-4 h-4" /> Wake Up
                      </Button>
                      <Button
                        onClick={async () => {
                          await client.actions.revive(account.account);
                          setCurrentImage(happy);
                        }}
                        disabled={beast.is_alive}
                        className="flex items-center gap-2 button"
                      >
                        <Sun className="w-4 h-4" /> Revive
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            :
            <>
              <Play />
              <button onClick={async () => spawn()} className="button">Spawn a BabyBeast</button>
            </>

        }

        <Footer />
      </div>
    </StarknetConfig>
  );
}

export default App;
