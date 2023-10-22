const { Client, GatewayIntentBits } = require('discord.js');
const { Player } = require('discord-player');
require('dotenv').config();
const commandHandler = require('./commandHandler');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
  ],
});
commandHandler(client);
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(`Listening for messages...`);
});
client.player = new Player(client, {
  ytdlOptions: {
      quality: "highestaudio",
      highWaterMark: 1 << 25
  }
})

client.login(process.env.TOKEN);