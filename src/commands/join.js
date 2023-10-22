const { joinVoiceChannel } = require('@discordjs/voice');




module.exports = {
  name: 'join',
  description: 'Make the bot join the voice channel',
  async execute(message, args) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      return message.reply('You need to be in a voice channel to use this command!');
    }

    try {
      const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
      });
      await connection;
      message.reply(`Successfully joined the voice channel "${voiceChannel.name}"!`);
    } catch (error) {
      console.error(error);
      message.reply('Failed to join the voice channel. Please make sure the bot has the necessary permissions and try again.');
    }
  },


};

