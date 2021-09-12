const Discord = require('discord.js');
const rickroll = 'https://media4.giphy.com/media/Ju7l5y9osyymQ/giphy.gif';

module.exports = {
    name: 'test',
    category: 'fun',
    aliases: [],
    description: '',
    usage: '`a!test`',
    run: (client, message, args) => {
        const embed = new Discord.MessageEmbed()
            .setTitle('Just a test')
            .setColor('RANDOM')
            .setImage(rickroll);
        message.channel.send({ embeds: [embed] });
    }
}