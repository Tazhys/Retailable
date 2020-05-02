const Discord = require("discord.js");

module.exports = async (client, message, args, user) => {
    message.delete()
    let banChannel = message.guild.channels.find(`name`, "log_channel_here");
    if (!banChannel) return message.channel.send('**Please create a channel with the name `log_channel_here`**')
    if (!message.member.hasPermission("BAN_MEMBERS")) {
        message.reply("You don't have permission to ban members")
    }

    if (message.member.hasPermission("BAN_MEMBERS")) {

        var serverMember = message.guild.member(message.mentions.users.first());
        if (!serverMember) {
            message.reply("You need to specify a user").catch(console.error);
            return;
        }

        if (serverMember.id === message.author.id) {
            return message.channel.send("You can't server ban yourself").catch(console.error);
        }

        if (serverMember.highestRole.position >= message.member.highestRole.position) {
            return message.channel.send("You cannot server ban someone with a higher role than you").catch(console.error);
		}

        let reason = args.slice(1).join(' ');
        if (!reason) reason = "No reason provided";


        message.guild.member(serverMember).ban(reason);
        message.channel.send(`***${serverMember.user.tag} was banned!***`)
        await serverMember.send(`${serverMember.user.tag}, you have been banned from ${message.guild.name}`);

        let banEmbed = new Discord.RichEmbed()
            .setAuthor("🚫 Banned")
            .setColor(message.guild.member(client.user).displayHexColor)
            .setThumbnail(`https://stylewhack.com/wp-content/uploads/2018/01/banned-stamp_Gk5qgSdd.jpg`)
            .addField("User", `${serverMember}`)
            .addField("Reason", `${reason}`)
            .addField("Moderator:", `${message.author}`)
            .setFooter("Ban User | Ban User Logs", client.user.displayAvatarURL);
        banChannel.send(banEmbed).catch(console.error);
        //message.delete();
    }
}