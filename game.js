const gameList = [{ name: 'Terraria', genre: 'Sandbox'}, { name: 'Call Of Duty', genre: 'First Person Shooter'}, {name: 'Risk of Rain 2', genre: 'Rougelike'}]
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
  for (let i = 0; i < gameList.length; i++){
    await GameModel.create(gameList[i])
  }
};

connect()
/*------------------------------ Query Functions -----------------------------*/