module.exports = {
  name: 'pause',
  description: 'Pause the currently playing song',
  execute(message, args) {
    const queue = message.client.player.getQueue(message.guild.id);
    if (!queue || !queue.playing) {
      return message.reply('There is no song playing at the moment!');
    }
    queue.setPaused(true);
    message.reply('Paused the song!');
  },
};
