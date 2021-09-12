const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'nowplaying',
    aliases: ['np'],
    category: 'music',
    description: 'display current track is being play ',
    usage: '`a!np`',
    async run(client, message, args) { 
        const queue = client.player.getQueue(message.guildId);

        if(!queue || !queue.playing) return message.channel.send('There is no song being played');

        const embed = new MessageEmbed();
        const currentTrack = queue.current;
        const userAvatar = currentTrack.requestedBy.avatarURL({ format: 'jpg', dynamic: true})
        const userName = currentTrack.requestedBy.username;
        const progress = queue.createProgressBar();

        embed.setAuthor('Now playing')
            .setImage(currentTrack.thumbnail)
            .setTitle(`🎶 | ${currentTrack.title}`)
            .addField('\u200B', progress)
            .setFooter(`Requested by: ${userName}`,userAvatar)
            .setColor('RANDOM');
        message.reply({ embeds: [embed] }, { allowedMentions: { parse: [], repliedUser: true }});
    }
}