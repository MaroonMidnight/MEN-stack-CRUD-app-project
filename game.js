const gameList = [
  { name: 'Terraria', genre: 'Sandbox', description: 'Terraria is a 2D sandbox game with gameplay that revolves around exploration, building, crafting, combat, survival, and mining, playable in both single-player and multiplayer modes. The game has a 2D sprite tile-based graphical style reminiscent of the 16-bit sprites found on the Super NES.' ,photoUrl:'https://m.media-amazon.com/images/I/71na5zfzbaL._AC_UF894,1000_QL80_.jpg'},
  { name: 'Monster Hunter World', genre: 'ARPG',description: "Battle gigantic monsters in epic locales. As a hunter, you'll take on quests to hunt monsters in a variety of habitats. Take down these monsters and receive materials that you can use to create stronger weapons and armor in order to hunt even more dangerous monsters.", photoUrl: 'https://m.media-amazon.com/images/I/71ztnv9zvrL._AC_UF894,1000_QL80_.jpg'},
  {name: 'Risk of Rain 2', genre: 'Rougelike', description: "Risk of Rain 2 is a cooperative third person shooter with roguelike elements. Players control a stranded survivor that must escape from a hostile alien planet. In the beginning of the game, players can choose between several survivors, each with a unique set of abilities which require different approaches to gameplay." ,photoUrl: 'https://m.media-amazon.com/images/I/619kfWPa9iL._AC_UF894,1000_QL80_.jpg'}]
const GameModel = require ('./models/game')
/*------------------------------- Starter Code -------------------------------*/

const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const connect = async () => {
  // Connect to MongoDB using the MONGODB_URI specified in our .env file.
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');

  // Call the runQueries function, which will eventually hold functions to work
  // with data in our db.
  await runQueries()

  // Disconnect our app from MongoDB after our queries run.
  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');

  // Close our app, bringing us back to the command line.
  process.exit();
};

const runQueries = async () => {
  console.log('Queries running.')
  // The functions calls to run queries in our db will go here as we write them.
  await GameModel.deleteMany()
  for (let i = 0; i < gameList.length; i++){
    await GameModel.create(gameList[i])
  }
};

connect()
/*------------------------------ Query Functions -----------------------------*/