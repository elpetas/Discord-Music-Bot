module.exports = {
  name: 'shuffle',
  description: 'Shuffles the songs in the queue',
  execute(message, args, queue) {
    if (!message.member.voice.channel) {
      return message.reply('You need to be in a voice channel to use this command!');
    }
    
    const voiceChannel = message.guild.me.voice.channel;
    if (!voiceChannel) {
      return message.reply('I am not in a voice channel!');
    }

    const songs = queue.songs;

    for (let i = songs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [songs[i], songs[j]] = [songs[j], songs[i]];
    }

    message.channel.send('Queue has been shuffled!');
  },
};
