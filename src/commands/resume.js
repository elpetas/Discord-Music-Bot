module.exports = {
  name: 'resume',
  description: 'Resume the currently paused song',
  execute(message, args) {
    const queue = message.client.player.getQueue(message.guild.id);
    if (!queue || !queue.paused) {
      return message.reply('There is no song paused at the moment!');
    }
    queue.setPaused(false);
    message.reply('Resumed the song!');
  },
};
