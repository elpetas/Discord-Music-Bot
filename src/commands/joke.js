const fetch = require('node-fetch');

module.exports = {
    name: 'joke',
    description: 'Tells a random dad joke.',
    async execute(message, args) {
        try {
            const response = await fetch('https://icanhazdadjoke.com/', {
                headers: {
                    'Accept': 'application/json'
                }
            });
            const data = await response.json();

            message.channel.send(data.joke);
        } catch (error) {
            console.error(error);
            message.reply('there was an error trying to tell a joke!');
        }
    },
};
