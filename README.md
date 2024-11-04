# BabyBeast Tamagotchi Game
![babybeastlogo](https://github.com/user-attachments/assets/42d05877-1650-4e14-a6c7-c36a35219d82)



## Overview
Welcome to the ByteBeast Tamagotchi Game! This interactive web-based game brings to life the magical creatures of Etheria known as Baby Beasts. Players act as guardians responsible for nurturing and caring for their BabyBeast, building a unique bond and ensuring their companion grows strong and healthy.

## Features
- **Interactive Gameplay**: Perform actions such as feeding, playing, cleaning, and ensuring rest to maintain your BabyBeast’s status.
- **Status Management**: Keep an eye on health, energy, happiness, and cleanliness indicators to optimize the well-being of your BabyBeast.
- **Evolution**: Raise your BabyBeast to maturity and discover its unique traits and abilities.
- **Mini-Games**: Engage in fun mini-games to boost your BabyBeast’s happiness and energy levels.

## Installation
To get started, clone this repository:
```bash
$ git clone https://github.com/ByteBuildersLabs/BabyBeasts.git
$ cd bytebeast-tamagotchi
$ npm install
```

## Running the Game
To launch the game locally, use the following command:
```bash
$ npm start
```
This will run the application on `http://localhost:3000`.

## How to Play
### Getting Started
**Spawn Your Beast**:
When you start the game, you need to spawn your beast. This initializes your pet with default stats.
Command: `spawn()`

**Understanding Your Beast's Stats**:
- **Hunger**: Indicates how hungry your beast is. Keep it fed to maintain its health.
- **Energy**: Shows how energetic your beast is. Ensure it gets enough sleep.
- **Happiness**: Reflects your beast's mood. Play with it to keep it happy.
- **Hygiene**: Indicates how clean your beast is. Clean it regularly.
- **Attack, Defense, Speed**: These stats improve as your beast levels up.
- **Level and Experience**: Your beast gains experience and levels up by playing and being cleaned.

### Actions You Can Perform
- **Feed Your Beast**: Increases hunger and energy.
- **Put Your Beast to Sleep**: Increases energy and happiness.
- **Wake Up Your Beast**: Wakes up your beast if it is sleeping.
- **Play with Your Beast**: Increases happiness and experience, but decreases energy and hunger.
- **Clean Your Beast**: Increases hygiene and happiness, and gives experience.
- **Revive Your Beast**: If your beast dies (hunger or energy reaches 0), you can revive it.

### Managing Stats
**Decreasing Stats**:
Over time, your beast's stats will decrease. Hunger, energy, happiness, and hygiene will drop, so you need to regularly feed, play, clean, and let your beast sleep.

**Leveling Up**:
As your beast gains experience from playing and being cleaned, it will level up. Each level increases its attack, defense, and speed stats. Experience needed for the next level increases with each level up.

### Keeping Your Beast Alive
Ensure that hunger and energy do not drop to 0, as this will cause your beast to die. Regularly perform actions to maintain your beast's stats.

Remember to regularly check and manage your beast's stats to keep it happy and healthy. Enjoy playing the Tamagotchi game!

## Contributions
We welcome contributions! Please feel free to submit a pull request or open an issue if you have any suggestions or improvements.

## License
This project is licensed under the MIT License. For more information, please see the LICENSE file.

## Contact

---
Raise your BabyBeast, unlock its potential, and dive into the magical world of Etheria!

