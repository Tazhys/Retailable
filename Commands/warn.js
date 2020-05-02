const Discord = require("discord.js");

module.exports = async (client, message, args, user) => {
    message.delete()
    let warnChannel = message.guild.channels.find(`name`, "log_channel_here");
    if (!warnChannel) return message.channel.send('**Please create a channel with the name `log_channel_here`**')
    if (!message.member.hasPermission("KICK_MEMBERS")) {
        message.reply("You don't have permission to warn members")
    }

    if (message.member.hasPermission("KICK_MEMBERS")) {

        var serverMember = message.guild.member(message.mentions.users.first());
        if (!serverMember) {
            message.reply("You need to specify a user");
            return;
        }

        if (serverMember.id === message.author.id) {
            return message.channel.send("You can't warn yourself");
        }

        if (serverMember.highestRole.position >= message.member.highestRole.position) {
            return message.channel.send("You cannot warn someone with a higher role than you");
		}

        let reason = args.slice(1).join(' ');
        if (!reason) reason = "No reason provided";

        message.delete().catch(O_o => {});
        message.channel.send(`***${serverMember.user.tag} was warned!***`)
        var warndmEmbed = new Discord.RichEmbed()
            .setAuthor("⚠️You Been Warned")
            .setColor(message.guild.member(client.user).displayHexColor)
            .setThumbnail(`http://www.socialworker.com/downloads/296/download/caution-152926_640.png`)
            .addField("User", `${serverMember}`)
            .addField("Server", `${message.guild.name}`)
            .addField("Reason", `${reason}`)
        serverMember.send(warndmEmbed).catch(console.error);
        let warnEmbed = new Discord.RichEmbed()
            .setAuthor("⚠️Warned")
            .setColor(message.guild.member(client.user).displayHexColor)
            .setThumbnail(`http://www.socialworker.com/downloads/296/download/caution-152926_640.png`)
            .addField("User", `${serverMember}`)
            .addField("Reason", `${reason}`)
            .addField("Warned By:", `${message.author}`)
            .addField("Channel:", message.channel)
            .setTimestamp()
            .setFooter("Warn User | Warn User Logs", client.user.displayAvatarURL);

        warnChannel.send(warnEmbed).catch(console.error);

    }
}