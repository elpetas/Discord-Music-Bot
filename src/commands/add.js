// Import required modules
const { Player } = require("discord-player");
const { MessageEmbed } = require('discord.js');

// Export a module that handles adding songs to the music queue
module.exports = {
name: "add",
description: "Add a song to the music queue",


aliases: ["url"],


// Define an asynchronous function that executes when the command is used
async execute(message, args, client) {
try {
// Join the query arguments into a single string
const query = args.join(" ");
// Throw an error if no song or playlist is provided
if (!query) {
    throw new Error("Please provide a song or playlist to add to the queue");
  }

  // Create a new Player instance
  const player = new Player(client);

  // Create a new music queue for the server
  const queue = player.createQueue(message.guild, {
    metadata: {
      channel: message.channel,
    },
  });

  // Send a message to the channel when a track is added to the queue
  player.on("trackAdd", (queue, track) => {
    message.channel.send(`Adding ${track.title} to the queue...`);
  });

  // Send an embedded message to the channel when a track starts playing
  player.once('trackStart', (queue, track) => {
    const embed = new MessageEmbed()
      .setDescription(`**[${track.title}](${track.url})** has been added to the queue`)
      .setThumbnail(track.thumbnail)
      .setFooter(`Duration: ${track.duration}`);
    message.channel.send(embed);
  });

  // Throw an error if the queue already has 50 tracks
  if (queue.tracks.length >= 50) {
    throw new Error("The queue is full. Please wait for the current songs to finish playing or remove some songs from the queue.");
  }


  // Add a track to the queue if a YouTube URL is provided
  if (query.match(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/)) {
    const track = { url: query };
    await queue.addTrack(track);
    message.channel.send(`Added ${track.url} to the queue.`);
  } 

  // Search for a track if the query is not a YouTube URL
  else {
    message.channel.send(`Searching for "${query}"...`);
    const results = await player.search(query, { requestedBy: message.author });
    if (!results || !results.tracks.length) {
      throw new Error(`No results found for "${query}" :(`);
    }

    const track = results.tracks[0];
    if (!track.title || !track.url || !track.duration) {
      throw new Error(`Invalid track: ${track.title}`);
    }

    await queue.addTrack(track);
    message.channel.send(`Added ${track.title} to the queue.`);
  }
} 
// Catch any errors that occur and send them to the channel
catch (error) {
  message.channel.send(`Error: ${error.message}`);
}},
};