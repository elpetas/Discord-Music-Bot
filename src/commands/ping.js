module.exports = {
    name: 'ping',
    description: 'Ping command',
    execute(message, args) {
      message.reply('Pong!');
    },
  };