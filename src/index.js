require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");
const { handleInteraction } = require("./interactionHandler.js");
const keepAlive = require("./server.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag} ✅`);
});

client.on("interactionCreate", handleInteraction);

client.login(process.env.BOT_TOKEN);
