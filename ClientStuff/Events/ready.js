const chalk = require('chalk');

module.exports = (client) => {
  console.log(chalk.cyan(client.ascii.line1));
  console.log(chalk.cyan(client.ascii.line2));
  console.log(chalk.cyan(client.ascii.line3));
  console.log(chalk.cyan(client.ascii.line4));
  console.log(chalk.cyan(client.ascii.line5));
  console.log(chalk.cyan(client.ascii.line6));
  console.log(chalk.cyan(`${client.config.botname} is now ONLINE!`));
  console.log(chalk.cyan(`[Servers]: ${client.guilds.size}`));
  console.log(chalk.cyan(`[Users]: ${client.users.size}`));
  client.user.setStatus(`dnd`)
  var presences = new Array()
    presences[0] = `status here`,
    setInterval(() => {
      var ry = Math.floor(Math.random() * presences.length)
      client.user.setActivity(`${presences[ry]}`, {
        type: "Watching"
      })
    }, 18000)
}
