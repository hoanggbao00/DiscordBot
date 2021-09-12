const { MessageEmbed, Rich } = require('discord.js')
const { devId } = require('../../config.json');
const { inspect } = require('util');

module.exports = {
    name: 'eval',
    category: 'dev',
    aliases: ['e'],
    description: '',
    usage: '`null`',
    run: (client, message, args) => {
        if(message.author.id != devId) return;

        const code = args.join(' ');
        if(!code) return message.reply('There is no code').then( msg => {
            setTimeout(() => {
                msg.delete();
            }, 3000);
        })

        const embed = new MessageEmbed();
        let description = '';

        try {
            const result = eval(code);
            let output = result;
            
            if(typeof output !== 'string') {
                output = output.toJSON();
                output = inspect(output);
            }
            
            description += `\`\`\`${code}\`\`\``
            embed.addFields(
                { name: `**Result:**`, value: `\`\`\`js\n${output}\`\`\`` },
                { name: `**Type:**`, value: `\`\`\`${typeof (result)}\`\`\`` }
            );
        } catch (err) {
            embed.addField('**Error:**',`\`\`\`js\n${err} \`\`\``);
            console.log(err);
        }
        
        embed.setDescription(description)
        .setFooter(`${client.user.username}`)
        .setTimestamp();
        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    }
}

