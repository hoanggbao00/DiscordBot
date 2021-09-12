const checkSameRoom = (message) => {
    if (!message.member.voice.channel) return message.reply('You need to connect a voice channel')
    if (!message.guild.me.voice.channelId || message.guild.me.voice.channelId !== message.member.voice.channelId) return;
    return message.reply('You need to same room with bot');
}
module.exports = {
    checkSameRoom,
}