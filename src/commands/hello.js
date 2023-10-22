module.exports = {
    name: 'hello',
    description: 'Responds with a friendly greeting.',
    execute(message, args) {
        message.channel.send(`Hello, ${message.author.username}!`);
    },
};
