
const { Player } = require("discord-player");
const { MessageEmbed } = require('discord.js');


module.exports = {
  name: "queue",
  description: "Display the current music queue",
  aliases: ["q"],

  async execute(message, args, client) {
    try {
      const player = new Player(client);
      const queue = player.getQueue(message.guild.id);

      if (!queue || !queue.tracks.length) {
        return message.channel.send("There are no songs in the queue.");
      }


      const embed = new MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Current Music Queue")
        .setDescription(`There are ${queue.tracks.length} songs in the queue.`)
        .setFooter(`Requested by ${message.author.tag}`);



      // Loop through each track in the queue and add it to the embedded message



      queue.tracks.forEach((track, index) => {
        embed.addField(`${index + 1}. ${track.title}`, `${track.duration}`);
      });


      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      message.channel.send("An error occurred while displaying the music queue.");
    }
  },
};