const Discord = require("discord.js");
const client = new Discord.Client();

//ClientStuff
client.commands = new Discord.Collection();
client.config = require('./ClientStuff/config.json');
client.ascii = require('./ClientStuff/console.json');
const Logger = require("./ClientStuff/console-monitor.js");

client.footer = `${client.config.botname} • My Prefix is ${client.config.prefix}!`;

//GENERAL USE COMMANDS
client.commands.set('help', require('./Commands/help.js'));
client.commands.set('afk', require('./Commands/afk.js'));
client.commands.set('ban', require('./Commands/ban.js'));
client.commands.set('warn', require('./Commands/warn.js'));
client.commands.set('mute', require('./Commands/mute.js'));
client.commands.set('unmute', require('./Commands/unmute.js'));
client.commands.set('kick', require('./Commands/kick.js'));
client.commands.set('clear', require('./Commands/purge.js'));

//EVENTS
client.on('message', message => require('./ClientStuff/Events/message.js')(client, message));
client.on('ready', () => require('./ClientStuff/Events/ready.js')(client));

//ERROR CONTROLLING
client.on('error', (error) => {

    console.log(`\n${error.stack}\n`)

})
process.on('unhandledRejection', (error) => {

    console.error(`Uncaught Promise Error: \n${error.stack}`)

})

process.on('uncaughtException', (err) => {
    let errmsg = (err ? err.stack || err : '').toString().replace(new RegExp(`${__dirname}/`, 'g'), './')
    console.error(errmsg)

})

client.login(client.config.token);