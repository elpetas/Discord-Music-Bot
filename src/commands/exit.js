module.exports = {
    name: 'exit',
    description: 'Make the bot exit the voice channel',
    execute(message, args) {
        const voiceChannel = message.guild.me.voice.channel;
        if (!voiceChannel) {
            return message.reply('I am not in a voice channel!');
        }
        voiceChannel.leave();
        message.reply('Successfully left the voice channel!');
    },
};