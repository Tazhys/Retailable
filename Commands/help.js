const Discord = require("discord.js");

module.exports = (client, message) => {
    message.delete()
    let embed = new Discord.RichEmbed()
    .setTitle(`Help Commands | Requested By: ${message.author.tag}!`)
    .addField('Commands', `afk, ban, kick, mute, unmute, clear, unmute, warn`)
    .setThumbnail(client.config.boticon)
    .setFooter(client.footer)
    message.channel.send(embed).catch(console.error);
}