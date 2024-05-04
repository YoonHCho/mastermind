import { Game } from "./model/Game.js";
import { ManagePlayers } from "./model/Player.js";
import { rl } from "./service/UserInputs.js";
import { createPlayers } from "./service/CreatePlayers.js";
import { PlayGame } from "./service/PlayGame.js";
import { gameUI } from "./frontend/GameUI.js";

const main = async () => {
  const game = new Game();
  game.start();
  await game.setGameLevel();
  gameUI.numGenerated(game.getLevel());
  await createPlayers(`\nWhen finished adding players type 'finish'\nName of a player? `);
  const result = await PlayGame(game.getCode(), ManagePlayers.getPlayersList(), game.getLevel(), game);
  game.getHighestScoredPlayer(result);
  setTimeout(() => game.end(), 5000);
  rl.close();
};

main();
