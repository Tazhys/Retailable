const Discord = require("discord.js");

module.exports = async (client, message, args, messages) => {
    let purgeChannel = message.guild.channels.find(`name`, "log_channel_here");
    if (!purgeChannel) return message.channel.send('**Please create a channel with the name `log_channel_here`**')
    if (!message.member.hasPermission("ADMINISTRATOR")) {
        message.reply("You don't have permission to purge messages")
    }

    if (message.member.hasPermission("ADMINISTRATOR")) {

        const deleteCount = parseInt(args[0], 10);

        if (!deleteCount || deleteCount < 2 || deleteCount > 100)
            return message.reply("Please provide a number between 2 and 100 for the number of messages to delete.");


        message.channel.bulkDelete(args[0]).then(() => {
            message.channel.send(`I have 🗑 this many **${args[0]}** messages.`).then(message => message.delete(200 * 200));
        }).catch(error => message.reply(`Couldn't delete messages because of: ${error}`));

        let purgeEmbed = new Discord.RichEmbed()
            .setAuthor("♻️ Purge")
            .setColor("#4286f4")
            .setThumbnail(client.user.displayAvatarURL)
            .addField("Moderator:", `<@${message.author.id}>`)
            .addField("Purged:", `${args[0]}`)
            .addField("Channel:", message.channel)
            .setFooter("Purge Logs", client.user.displayAvatarURL)
            .setThumbnail()
            purgeChannel.send(purgeEmbed).catch(console.error);
    }
}