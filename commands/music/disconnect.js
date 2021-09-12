module.exports = {
    name: 'disconnect',
    aliases: ['dc'],
    category: 'music',
    description: 'disconnect the voice channel',
    usage: '`a!disconnect or a!dc`',
    async run(client, message, args) { 
        const queue = client.player.getQueue(message.guildId);

        if (!queue || !queue.playing) return message.channel.send('There is no song being played');
        if (message.member.voice.channel.id !== message.guild.me.voice.channelId)
            return message.reply('You need in same the room to disconnect');

        await queue.destroy();
        message.channel.send('**Disconnected!**');
    }
}