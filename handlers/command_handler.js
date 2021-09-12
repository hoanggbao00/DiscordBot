const { readdirSync } = require('fs');
const ascii = require('ascii-table');

let table = new ascii('Command list');
table.setHeading('Files', 'Status');

module.exports = (client, Discord) => {
    readdirSync('./commands/').forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));

        for (let file of commands) {
            let command = require(`../commands/${dir}/${file}`);

            if (command.name) {
                client.commands.set(command.name, command);
                table.addRow(file, 'OK');
            } else {
                table.addRow(file, `vcl thiếu name bạn ơi`);
                continue;
            }

            if (command.aliases && Array.isArray(command.aliases))
                command.aliases.forEach(alias => client.aliases.set(alias, command.name));
        }
    });

    console.log(table.toString());
}