const { exec } = require('child_process')
const { MessageEmbed } = require('discord.js')
const { devId } = require('../../config.json');

module.exports = {
    name: 'vcl',
    category: 'dev',
    aliases: [],
    description: '',
    usage: '`null`',
    run: (client, message, args) => {
        //if(message.author.id == 523037941908635688) message.channel.send('***Con lợn suoip lày***');
        if(message.author.id != devId) return;

        const embed = new MessageEmbed();
        let description = '';
        let result = '';
        let output = '';
        const cmd = args.join(' ')

        exec(cmd, ( err, res ) => {
            if(err) {
                result = '**Error:**'
                output = err;
            } else {
                result = '**Result:**'
                output = res;
            }
            description += `\`\`\`\n${cmd}\`\`\`\n`;
            description += result;
            description += `\n\`\`\`${output}\`\`\``;
            embed.setDescription(description)
                .setFooter('Terminal')
                .setTimestamp();
            message.channel.send({ embeds: [embed] });
        });
    }
}