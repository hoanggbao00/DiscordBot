module.exports = {
    name: 'shuffle',
    aliases: ['sf'],
    category: 'music',
    description: 'shuffle the playlist',
    usage: '`a!shuffle`',
    async run(client, message, args) { 
        const queue = client.player.getQueue(message.guildId);

        if (!queue) return message.channel.send('There is nothing to shuffle');
        if (queue.tracks.length < 3) return message.channel.send(`Just ${queue.tracks.length} song in queue, don\'t need to shuffle`);

        await queue.shuffle();

        message.channel.send('✅ | Queue has been shuffled!')
    }
}