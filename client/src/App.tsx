import { useEffect, useMemo, useState } from "react";
import { SDK, createDojoStore } from "@dojoengine/sdk";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { addAddressPadding } from "starknet";
import { Models, Schema } from "./bindings/models.gen.ts";
import { useDojo } from "./useDojo.tsx";
import useModel from "./useModel.tsx";
import { useSystemCalls } from "./useSystemCalls.ts";
import { Card, CardContent } from './components/ui/card.tsx';
import { Progress } from './components/ui/progress';
import { Button } from './components/ui/button';
import { Heart, Pizza, Coffee, Bath, Gamepad2, Sun, Swords, ShieldPlus, TestTubeDiagonal, CircleGauge,  } from 'lucide-react';
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

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

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
    }, 1000000);
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
    console.log('Rolooo');
    console.log(beast?.is_alive);
    if (beast?.is_alive == false) {
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
                <span>Byte Beasts</span>
                <h2>BabyBeast <span>Lvl {beast.level}</span></h2>
              </div>
              <Card>
                <CardContent>
                  <div className="space-y-6">

                    {/* Centered Tamagotchi Image */}
                    <div className="flex justify-center items-column mt-3 mb-0">
                      <img src={currentImage} alt="Tamagotchi" className="w-40 h-40" />
                     
                    </div>

                    {/* Hunger Bar */}
                    <div className="flex items-center gap-2 mb-1">
                      <Heart className="text-red-500" />
                      <Progress value={beast.energy} />
                      <span className="w-12 text-right font-medium text-white">{Math.round(beast.energy)}%</span>
                    </div>
                    <p className="info mt-0">Energy</p>

                    {/* Energy Bar */}
                    <div className="flex items-center gap-2 mt-2 mb-1">
                      <Coffee className="text-yellow-600" />
                      <Progress value={beast.hunger} />
                      <span className="w-12 text-right font-medium text-white">{Math.round(beast.hunger)}%</span>
                    </div>
                    <p className="info mt-0">Hunger</p>

                    {/* Happiness Bar */}
                    <div className="flex items-center gap-2 mt-2 mb-1">
                      <Gamepad2 className="text-green-500" />
                      <Progress value={beast.happiness} />
                      <span className="w-12 text-right font-medium text-white">{Math.round(beast.happiness)}%</span>
                    </div>
                    <p className="info mt-0">Happiness</p>

                    {/* Hygiene Bar */}
                    <div className="flex items-center gap-2 mt-2 mb-1">
                      <Bath className="text-blue-500" />
                      <Progress value={beast.hygiene} />
                      <span className="w-12 text-right font-medium text-white">{Math.round(beast.hygiene)}%</span>
                    </div>
                    <p className="info mt-0">Hygiene</p>

                    {/* Action Buttons */}
                    <p className='title mt-5'>
                      Keep your BabyBeast happy and healthy
                      <span> Interact with him and level him up!</span>
                    </p>
                    <div className="grid grid-cols-2 gap-6 mt-3 mb-0">
                      <Button
                        onClick={async () => {
                          await client.actions.feed(account.account);
                          if (beast.is_alive) showAnimation(eat);
                          scrollToTop();
                        }}
                        disabled={!beast.is_alive}
                        className="flex items-center gap-2 button"
                      >
                        <Pizza /> Feed
                      </Button>
                      <Button
                        onClick={async () => {
                          await client.actions.sleep(account.account);
                          if (beast.is_alive) showAnimationWithoutTimer(sleep);
                          scrollToTop();
                        }}
                        disabled={!beast.is_alive}
                        className="flex items-center gap-2 button"
                      >
                        <Coffee  /> Sleep
                      </Button>
                      <Button
                        onClick={async () => {
                          await client.actions.play(account.account);
                          if (beast.is_alive) showAnimation(play);
                          scrollToTop();
                        }}
                        disabled={!beast.is_alive}
                        className="flex items-center gap-2 button"
                      >
                        <Gamepad2  /> Play
                      </Button>
                      <Button
                        onClick={async () => {
                          await client.actions.clean(account.account);
                          if (beast.is_alive) showAnimation(shower);
                          scrollToTop();
                        }}
                        disabled={!beast.is_alive}
                        className="flex items-center gap-2 button"
                      >
                        <Bath  /> Clean
                      </Button>
                      <Button
                        onClick={async () => {
                          await client.actions.awake(account.account);
                          if (beast.is_alive) setCurrentImage(happy);
                        }}
                        disabled={!beast.is_alive}
                        className="flex items-center gap-2 button"
                      >
                        <Sun  /> Wake Up
                      </Button>
                      <Button
                        onClick={async () => {
                          await client.actions.revive(account.account);
                          setCurrentImage(happy);
                          scrollToTop();
                        }}
                        disabled={beast.is_alive}
                        className="flex items-center gap-2 button"
                      >
                        <Sun  /> Revive
                      </Button>
                    </div>
                    <p className="info mt-3 mb-5">You can revive your baby beast, but this one is gonna loose the experience earhed</p>


                    <p className='title mt-5 text-center'>
                      <span className="d-block">BabyBeast Stats</span>
                      The stats of your BabyBeast will increase with more levels
                    </p>
                    {/* Hunger Bar */}
                    <div className="flex items-center gap-2 mb-1">
                      <Swords className="text-red-500" />
                      <Progress value={beast.attack} />
                      <span className="w-12 text-right font-medium text-white">{Math.round(beast.attack)}</span>
                    </div>
                    <p className="info mt-0">Attack</p>

                    {/* Energy Bar */}
                    <div className="flex items-center gap-2 mt-2 mb-1">
                      <ShieldPlus className="text-yellow-600" />
                      <Progress value={beast.defense} />
                      <span className="w-12 text-right font-medium text-white">{Math.round(beast.defense)}</span>
                    </div>
                    <p className="info mt-0">Defense</p>

                    {/* Happiness Bar */}
                    <div className="flex items-center gap-2 mt-2 mb-1">
                      <CircleGauge className="text-green-500" />
                      <Progress value={beast.speed} />
                      <span className="w-12 text-right font-medium text-white">{Math.round(beast.speed)}</span>
                    </div>
                    <p className="info mt-0">Speed</p>

                    {/* Hygiene Bar */}
                    <div className="flex items-center gap-2 mt-2 mb-1">
                      <TestTubeDiagonal className="text-blue-500" />
                      <Progress value={beast.experience} />
                      <span className="w-12 text-right font-medium text-white">{(beast.experience)}</span>
                    </div>
                    <p className="info mt-0">{beast.next_level_experience} experience points left to reach next level</p>
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
