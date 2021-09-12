const Discord = require('discord.js')

module.exports = {
    name: 'avatar',
    category: 'user',
    aliases: ['avt'],
    description: 'steal someone\'s avatar',
    usage: '`a!avatar` [@mention]',
    run: (client, message, args) => {
        const user = message.mentions.members.first() || getUserFromMention(args[0], client) || message.author;
        if(user !== 'channel') {
            const userName = user.username;
            const URL = user.avatarURL({ format: 'jpg', dynamic: true, size: 4096 });
    
            const avatarEmbed = new Discord.MessageEmbed()
                .setAuthor(username, URL)
                .setColor('RANDOM')
                .setDescription('That kinda hot')
                .setImage(URL);
            message.channel.send({ embeds: [avatarEmbed] });
        } else message.reply('lol avatar a channel');
    }
}

function getUserFromMention (mention, client) {
    if(!mention) return;

    if(mention.startsWith('<#') && mention.endsWith('>')) {
        return 'channel';
    }

    if(mention.startsWith('<@') && mention.endsWith('>')) {
        mention.slice(2, -1);

        if (mention.startsWith('!')) {
            mention = mention.slice(1);
        }

        return client.users.cache.get(mention);
    }
}