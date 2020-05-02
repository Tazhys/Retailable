const chalk = require('chalk');
const Discord = require('discord.js');
const Logger = require("../../ClientStuff/console-monitor.js");

module.exports = (client, message) => {
  
  if (message.author.bot) return;

  if (message.author.equals(client.user)) return;

  if (message.content.indexOf(client.config.prefix) !== 0) return;

  const args = message.content.slice(client.config.prefix.length).split(" ");
  const command = args.shift().toLowerCase();

  if (client.commands.has(command)) {
    client.commands.get(command)(client, message, args);
    Logger(`${message.author.tag} used the command ` + chalk.green(`${command}`) + ` in ${message.guild.name}`, "cmdused")
  }

};