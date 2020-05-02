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
            return message.channel.send("You can't mute yourself");
        }

        if (serverMember.highestRole.position >= message.member.highestRole.position) {
            return message.channel.send("You cannot mute someone with a higher role than you");
        }
        const mod = message.author;
        let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!user) return message.channel.send("Couldn't find user.")
        let muterole = message.guild.roles.find(`name`, "Muted");
        message.channel.send(`***${serverMember.user.tag} was muted!***`)
        if (args[0] == "help") {
            message.reply("Usage: t.mute <user> <reason>");
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
                        SEND_MESSAGES: true,
                        ADD_REACTIONS: true
                    });
                });
            } catch (e) {
                console.log(e.stack);
            }
		}


        let mutetime = args[1];

        await (user.addRole(muterole.id));
        const muteembed = new Discord.RichEmbed()
            .setAuthor('🔇 Action | Mute')
            .addField('User', `<@${user.id}>`)
            .setThumbnail(`http://franriavilla.in/images/unmute.png`)
            .addField('Moderator', `${mod}`)
            .setColor(message.guild.member(client.user).displayHexColor)
            .setTimestamp()
            .setFooter("Mute User | Mute User Logs", client.user.displayAvatarURL);
            muteChannel.send(muteembed).catch(console.error);

            setTimeout(function() {
                user.removeRole(muterole.id);
                message.channel.send(`***User: ${serverMember.user.tag} has been unmuted!***`);
            }, ms(mutetime));
    }
}