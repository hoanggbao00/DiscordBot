const { prefix } = require(`../../config.json`);


module.exports = (Discord, client, message) => {
    if (!message.content.startsWith(prefix) || message.author.bot || !message.guild) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if(command) {
        if (command.category === 'music' && !message.member.voice.channel)
            return message.reply('You need to connect a voice channel')
        command.run(client, message, args);
    }
}