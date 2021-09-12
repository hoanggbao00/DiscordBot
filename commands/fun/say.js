module.exports = {
    name: 'say',
    category: 'fun',
    aliases: [],
    description: 'Let bot say some bad words for you :\'>',
    usage: '`a!say` [text]',
    run: (client, message, args) => {
        const checkSuoip = message.author == 523037941908635688 ? true : false;
        const suoip = message.author.username;

        if (message.deletable) message.delete();
        if (args.length !== 0)
            if(checkSuoip)
                message.channel.send(`lợn ${suoip} nói: ${args.join(' ')}`);
            else
                message.channel.send(args.join(' '));
        else
            message.channel.send(`${message.author} say what?`);
    }
}