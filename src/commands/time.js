module.exports = {
    name: 'time',
    description: 'Displays the current time in your timezone.',
    execute(message, args) {
        const date = new Date();
        const timeString = date.toLocaleTimeString();
        message.channel.send(`The current time is ${timeString}`);
    },
};
