const isAFK = new Set();
module.exports = (client, message, args) => {

    if (isAFK.has(message.author.id + message.guild.id))
      return message.reply("You are already AFK!");
    let reason;
    if (!args[0]) reason = "None";
    else reason = args.slice(0).join(" ");

    isAFK.add(message.author.id + message.guild.id);
    message.channel
      .send(`You are now AFK for the reason of \`${reason}\``)
      .then(m => m.delete(200 * 200).catch());

    const filter = m =>
      (m.mentions.users.has(message.author.id) ||
        m.author.id === message.author.id) &&
      !m.author.bot;
    const collector = message.channel.createMessageCollector(filter);

    collector.on("collect", msg => {
      if (msg.author.id === message.author.id) {
        collector.stop();
        isAFK.delete(message.author.id + message.guild.id);
        return message.channel
          .send(`${message.author.tag}, Welcome back!`)
          .then(m => m.delete(200 * 200));
      } else {
        return message
          .reply(`${message.member} is currently AFK for \`${reason}\`.`)
          .then(m => m.delete(200 * 200));
      }
    });
};
