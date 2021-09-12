const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

const api = [
    'https://reddit-meme-api.herokuapp.com/',
    'https://reddit-meme-api.herokuapp.com/GenshinMemepact/',
    'https://reddit-meme-api.herokuapp.com/wholesomememes/',
    'https://reddit-meme-api.herokuapp.com/meme/',
    'https://reddit-meme-api.herokuapp.com/Animemes/',
    'https://reddit-meme-api.herokuapp.com/funny/',
    'https://reddit-meme-api.herokuapp.com/HololiveMemeTemplates/',
    'https://reddit-meme-api.herokuapp.com/bonehurtingjuice/',
    'https://reddit-meme-api.herokuapp.com/MemeEconomy/',
    'https://reddit-meme-api.herokuapp.com/Memes_Of_The_Dank/'
];

const exts = [
    '.jpg',
    '.png',
    '.gif'
];
const rickrollSite = 'https://giphy.com/clips/justin-uhYPkjP03h9RvVdazZ';
const rickrollGif = 'https://media4.giphy.com/media/44hlo3M3pqK9W/giphy.gif'


module.exports = {
    name: 'meme',
    category: 'fun',
    aliases: [],
    description: 'throw a meme to your bad day',
    usage: '`a!meme`',
    run: (client, message, args) => {
        const random = Math.floor(Math.random() * api.length);
        const reddit = api[random];
        const first = reddit.indexOf('com/')+4;
        const titleSub = reddit.slice(first, reddit.length-1);
        let description = '';
        let check = false;

        const embed = new MessageEmbed()
            .setAuthor(`r/${titleSub}`,'https://media2.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif')
            .setDescription('I just stole it, please wait a moment :)\n' + `While you wait: [Check this meme](${rickrollSite})`)
            .setImage(rickrollGif);
        console.log(reddit);

        message.channel.send({ embeds: [embed] }).then( msg => {
            fetch(reddit).then( res => res.json())
                .then(topic => {
                    const imgurl = topic.url;
                    for(let ext of exts) {
                        if(imgurl.endsWith(ext)) check = true;
                    }
                    if (!check) {
                        description += '\n\nNo Preview found for this meme.. Sorry for this\n';
                        embed.addField('but the post below', `[Link](${rickrollSite})`, false);
                    } else embed.setImage(imgurl);
                    embed.setAuthor(`r/${topic.subreddit}\n`)
                        .setTitle(topic.title)
                        .setDescription(`u/${topic.author} ${description}`)
                        .setURL(topic.post_link)
                        .setFooter(topic.ups +' Up votes');
                    console.log(imgurl);
                msg.edit({ embeds: [embed] });  
            });
        });  
    }
}