import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { Heart, Pizza, Coffee, Bath, Gamepad2, Sun } from 'lucide-react';

// Define the structure of stats with an interface
interface Stats {
  hunger: number;
  energy: number;
  happiness: number;
  hygiene: number;
}

// Main component for the Tamagotchi dashboard
const TamagotchiDashboard = () => {
  // State to hold the stats of the Tamagotchi
  const [stats, setStats] = useState<Stats>({
    hunger: 100,
    energy: 100,
    happiness: 100,
    hygiene: 100,
  });

  // State to track if the Tamagotchi is alive or not
  const [isAlive, setIsAlive] = useState(true);
  // State to track the age of the Tamagotchi
  const [age, setAge] = useState(0);

  const [currentImage, setCurrentImage] = useState('/babybeast_happy.gif'); // Default static image path

  // Decrease stats over time
  useEffect(() => {
    // Set up an interval that runs every 3 seconds
    const interval = setInterval(() => {
      // Only decrease stats if the Tamagotchi is alive
      if (isAlive) {
        setStats(prevStats => ({
          // Each stat decreases at a specific rate, with a minimum value of 0
          hunger: Math.max(0, prevStats.hunger - 2),
          energy: Math.max(0, prevStats.energy - 1.5),
          happiness: Math.max(0, prevStats.happiness - 1),
          hygiene: Math.max(0, prevStats.hygiene - 1),
        }));
        
        // Increase age over time
        setAge(prevAge => prevAge + 1);
      }
    }, 3000); // Runs every 3 seconds

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [isAlive]); // Re-run effect if isAlive changes

  // Check if Tamagotchi dies
  useEffect(() => {
    // If any stat reaches 0, set isAlive to false
    if (Object.values(stats).some(stat => stat === 0)) {
      setIsAlive(false);
    }
  }, [stats]); // Re-run effect if stats change

  // Functions to show GIF temporarily
  const showAnimationWithoutTimer = (gifPath: string) => {
    setCurrentImage(gifPath); // Set GIF image
  };

  const showAnimation = (gifPath: string) => {
    setCurrentImage(gifPath); // Set GIF image
    setTimeout(() => {
      setCurrentImage('/babybeast_happy.gif'); // Revert to static image after 3 seconds
    }, 3000);
  };

  // Function to feed the Tamagotchi
  const feed = () => {
    setStats(prev => ({
      ...prev,
      hunger: Math.min(100, prev.hunger + 30), // Increases hunger but caps at 100
      energy: Math.min(100, prev.energy + 10), // Slightly increases energy, capped at 100
    }));
    showAnimation('/babybeast_eat.gif'); // Replace with the path to your feeding GIF
  };

  // Function to let the Tamagotchi sleep
  const sleep = () => {
    setStats(prev => ({
      ...prev,
      energy: Math.min(100, prev.energy + 40), // Significantly increases energy, capped at 100
      happiness: Math.min(100, prev.happiness + 10), // Increases happiness slightly, capped at 100
    }));
    showAnimationWithoutTimer('/babybeast_sleep.gif'); // Replace with the path to your sleeping GIF
  };

  // Function to play with the Tamagotchi
  const play = () => {
    setStats(prev => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 30), // Boosts happiness, capped at 100
      energy: Math.max(0, prev.energy - 20), // Decreases energy, with a minimum of 0
      hunger: Math.max(0, prev.hunger - 10), // Increases hunger slightly, minimum of 0
    }));
    showAnimation('/babybeast_play.gif'); // Replace with the path to your playing GIF
  };

  // Function to clean the Tamagotchi
  const clean = () => {
    setStats(prev => ({
      ...prev,
      hygiene: Math.min(100, prev.hygiene + 40), // Increases hygiene, capped at 100
      happiness: Math.min(100, prev.happiness + 10), // Slightly increases happiness, capped at 100
    }));
    showAnimation('/babybeast_shower.gif'); // Replace with the path to your cleaning GIF
  };

  const wakeUp = () => {
    setCurrentImage('/babybeast_happy.gif'); // Set back to the default image
  };
  

  // Function to restart the game when Tamagotchi dies
  const restart = () => {
    setStats({
      hunger: 100,
      energy: 100,
      happiness: 100,
      hygiene: 100,
    });
    setIsAlive(true);
    setAge(0); // Resets age
    setCurrentImage('/babybeast_happy.gif'); // Reset to original image
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-white">
              {isAlive ? (
            <>
              <span style={{ color: '#e4a101' }}>BABYBEAST</span>: {Math.floor(age / 20)} days
            </>
          ) : (
            '☠️ GAME OVER'
          )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">

            {/* Centered Tamagotchi Image */}
            <div className="flex justify-center mb-4">
              <img src={currentImage} alt="Tamagotchi" className="w-40 h-40" />
            </div>
            
            {/* Hunger Bar */}
            <div className="flex items-center gap-2 mb-2">
              <Heart className="text-red-500" />
              <Progress value={stats.hunger} />
              <span className="w-12 text-right font-medium text-white">{Math.round(stats.hunger)}%</span>
            </div>

            {/* Energy Bar */}
            <div className="flex items-center gap-2 mb-2">
              <Coffee className="text-yellow-600" />
              <Progress value={stats.energy} />
              <span className="w-12 text-right font-medium text-white">{Math.round(stats.energy)}%</span>
            </div>

            {/* Happiness Bar */}
            <div className="flex items-center gap-2 mb-2">
              <Gamepad2 className="text-green-500" />
              <Progress value={stats.happiness} />
              <span className="w-12 text-right font-medium text-white">{Math.round(stats.happiness)}%</span>
            </div>

            {/* Hygiene Bar */}
            <div className="flex items-center gap-2 mb-2">
              <Bath className="text-blue-500" />
              <Progress value={stats.hygiene} />
              <span className="w-12 text-right font-medium text-white">{Math.round(stats.hygiene)}%</span>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <Button 
                onClick={feed} 
                disabled={!isAlive}
                className="flex items-center gap-2"
              >
                <Pizza className="w-4 h-4" /> Feed
              </Button>
              <Button 
                onClick={sleep} 
                disabled={!isAlive}
                className="flex items-center gap-2"
              >
                <Coffee className="w-4 h-4" /> Sleep
              </Button>
              <Button 
                onClick={play} 
                disabled={!isAlive}
                className="flex items-center gap-2"
              >
                <Gamepad2 className="w-4 h-4" /> Play
              </Button>
              <Button 
                onClick={clean} 
                disabled={!isAlive}
                className="flex items-center gap-2"
              >
                <Bath className="w-4 h-4" /> Clean
              </Button>

              <Button 
                onClick={wakeUp} 
                disabled={!isAlive} 
                className="flex items-center gap-2"
              >
                <Sun className="w-4 h-4" /> Wake Up
              </Button>

            </div>

            {/* Restart Button, appears when Tamagotchi is dead */}
            {!isAlive && (
              <Button 
                onClick={restart}
                className="w-full mt-4"
              >
                Restart Game
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TamagotchiDashboard;