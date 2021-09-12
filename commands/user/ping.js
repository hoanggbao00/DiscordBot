module.exports = {
    name: 'ping',
    category: 'user',
    aliases: [],
    run: (client, message, args) => {
        message.reply('Calculating....').then( (msg) => {
            const ping = msg.createdTimestamp - message.createdTimestamp;

            msg.edit(`Bot latency: ${ping}, API Latency: ${client.ws.ping}`);
        })
    }
};