const Discord = require("discord.js");

module.exports = async (client, message, args, user) => {
    message.delete()
    let kickChannel = message.guild.channels.find(`name`, "log_channel_here");
    if (!kickChannel) return message.channel.send('**Please create a channel with the name `log_channel_here`**')
    if (!message.member.hasPermission("KICK_MEMBERS")) {
        message.reply("You don't have permission to kick members")
    }

    if (message.member.hasPermission("KICK_MEMBERS")) {

        var serverMember = message.guild.member(message.mentions.users.first());
        if (!serverMember) {
            message.reply("You need to specify a user");
            return;
        }

        if (serverMember.id === message.author.id) {
            return message.channel.send("You can't server kick yourself");
        }

        if (serverMember.highestRole.position >= message.member.highestRole.position) {
            return message.channel.send("You cannot server kick someone with a higher role than you");
		}

        let reason = args.slice(1).join(' ');
        if (!reason) reason = "No reason provided";


        message.guild.member(serverMember).kick(reason);
        message.channel.send(`***${serverMember.user.tag} was kicked!***`)
        await serverMember.send(`${serverMember.user.tag}, you have been kicked from ${message.guild.name}`);

        let kickEmbed = new Discord.RichEmbed()
            .setAuthor("🚫 Kicked")
            .setColor(message.guild.member(client.user).displayHexColor)
            .addField("User", `${serverMember}`)
            .addField("Reason", `${reason}`)
            .addField("Moderator:", `${message.author}`)
            .setFooter("Kick User | Kick User Logs", client.user.displayAvatarURL);
        kickChannel.send(kickEmbed).catch(console.error);
        //message.delete();
    }
}