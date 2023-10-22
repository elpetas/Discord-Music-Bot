module.exports = {
  name: 'clear',
  description: 'Clear the music queue',
  execute(message, args) {
    const queue = message.client.player.getQueue(message.guild.id);
    if (!queue || !queue.playing) {
      return message.reply('There is no music playing at the moment!');
    }
    queue.clear();
    message.reply('Cleared the music queue!');
  },
};
