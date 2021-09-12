const Discord = require('discord.js');
const { token } = require('./config.json');
const { Player } = require('discord-player');

const client = new Discord.Client({intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_VOICE_STATES'],
    allowedMentions: { parse: [], repliedUser: false }
});

client.player = new Player(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.events = new Discord.Collection();

client.player.on('trackStart', (queue, track) => queue.metadata.channel.send(`Now playing \`${track.title}\``));

['command_handler','event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
});


client.login(token);