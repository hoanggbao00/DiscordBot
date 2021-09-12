const Discord = require('discord.js');

module.exports = (Discord, client) => {
        console.log(`${client.user.username} has ready to use`);
        client.user.setPresence({
                activities:[
                    {
                        name: 'with discord.js',
                        type: 'PLAYING'
                    }],
                status: 'online' 
        });
}