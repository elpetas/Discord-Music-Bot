const fs = require('fs');
const { Collection } = require('discord.js');

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

module.exports = (client) => {
    client.commands = new Collection();

    for (const file of commandFiles) {
        const command = require(`./src/commands/${file}`);
        client.commands.set(command.name, command);
    }

    client.on('messageCreate', message => {
        if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;

        const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName)
            || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return;
        try {

            if (command.name === 'add'|| command.name==="queue") {

                command.execute(message, args, client);
            } else {
                command.execute(message, args);
            }
        } catch (error) {
            console.error(error);
            message.reply('there was an error trying to execute that command!');
        }
    });
};