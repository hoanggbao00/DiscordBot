module.exports = {
    name: 'play',
    aliases: ['p'],
    category: 'music',
    description: 'play a music',
    usage: '`a!play [song name/url]`',
    async run(client, message, args) { 
        
        //client.player.on('trackAdd', (message, queue, track) => message.channel.send(`\`${track.title}\` has added to queue`));
        //client.player.on('playlistAdd', (message, queue, playlist) => message.channel.send(`Playlist \`${playlist.tracks.length}\` has added to queue`));
        const query = args.join(' ');
        const searchResult = await client.player.search(query, {
            requestedBy: message.author
        });

        if(!searchResult || !searchResult.tracks.length) return message.reply(`\`${query}\` not found`);

        const queue = client.player.createQueue(message.guild, {
            metadata: message
        });

            try {
                if(!queue.connection)
                    await queue.connect(message.member.voice.channel);
            } catch (error) {
                queue.destroy();
                return message.reply('Could not join your voice channel!')
            }

        message.channel.send(`Loading your ${searchResult.playlist ? 'playlist' : 'track'}...`)
        searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0]);

        if(!queue.playing) await queue.play();


        return;
    }
}