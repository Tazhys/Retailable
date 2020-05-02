const Discord = require("discord.js");
const ms = require("ms");

module.exports = async (client, message, args, user) => {
    message.delete()
    let muteChannel = message.guild.channels.find(`name`, "log_channel_here");
    if (!muteChannel) return message.channel.send('**Please create a channel with the name `log_channel_here`**')
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        message.reply("You don't have permission to mute members")
    }

    if (message.member.hasPermission("MANAGE_MESSAGES")) {

        var serverMember = message.guild.member(message.mentions.users.first());
        if (!serverMember) {
            message.reply("You need to specify a user");
            return;
        }

        if (serverMember.id === message.author.id) {
            return message.channel.send("You can't unmute yourself");
        }

        if (serverMember.highestRole.position >= message.member.highestRole.position) {
            return message.channel.send("You cannot unmute someone with a higher role than you");
        }
        const mod = message.author;
        let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!user) return message.channel.send("Couldn't find user.")
        if (!user.roles.find(`name`, "Muted")) return message.channel.send('There are\'t in muted.')
        let muterole = message.guild.roles.find(`name`, "Muted");
        message.channel.send(`***${serverMember.user.tag} was unmuted!***`)
        if (args[0] == "help") {
            message.reply("Usage: t.unmute <user> <reason>");
            return;
        }

        if (!muterole) {
            try {
                muterole = await message.guild.createRole({
                    name: "Muted",
                    color: "#000000",
                    permissions: []
                })
                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    });
                });
            } catch (e) {
                console.log(e.stack);
            } 
		}


        let mutetime = args[1];

        await (user.removeRole(muterole.id));
        const muteembed = new Discord.RichEmbed()
            .setAuthor('🔇 Action | UnMute')
            .addField('User', `<@${user.id}>`)
            .setThumbnail(`http://franriavilla.in/images/unmute.png`)
            .addField('Moderator', `${mod}`)
            .setColor(message.guild.member(client.user).displayHexColor)
            .setTimestamp()
            .setFooter("unMute User | unMute User Logs", client.user.displayAvatarURL);
            muteChannel.send(muteembed).catch(console.error);
    }
}