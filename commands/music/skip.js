module.exports = {
    name: 'skip',
    aliases: ['sk'],
    category: 'music',
    description: 'Skip to the next track',
    usage: '`a!skip',
    async run(client, message, args) { 
        const queue = client.player.getQueue(message.guildId);

        if(!queue || !queue.playing) return message.channel.send('There is no song being played');
        if (queue.tracks.length == 0) return message.reply('Just only 1 track in queue')

        const currentTrack = queue.current;
        const success = queue.skip();
        return message.channel.send(success ? `✅ | Skipped \`${currentTrack.title}\`` : 'This is the end of you!')
    }
}