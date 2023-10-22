module.exports = {
    name: 'flip',
    description: 'Flips a coin and returns either heads or tails.',
    execute(message, args) {    
        const result = Math.floor(Math.random() * 2);
        if (result === 0) {
            message.channel.send('Heads!');
        } else {
            message.channel.send('Tails!');
        }
    },
};
