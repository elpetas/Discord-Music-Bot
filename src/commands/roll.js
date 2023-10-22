module.exports = {
    name: 'roll',
    description: 'Rolls a random number between 1 and a specified maximum value.',
    execute(message, args) {
        //The maximum value of the analysis command
        const max = parseInt(args[0]);

        //Check how the max works
        if (isNaN(max) || max < 1) {
            message.reply(`Please specify a valid maximum value.`);
            return;
        }

        //Generate a random number between 1 and the maximum value
        const result = Math.floor(Math.random() * max) + 1;

        //Send the result to the channel
        message.channel.send(`You rolled a ${result} (1-${max})!`);
    },
};
