module.exports.run = (client, message, args) => {
  if (!args.length) return message.channel.send("Hi");
  
};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["h", "help"]
};

module.exports.help = {
  name: "help",
  category: "System",
  description: "Displays all the available commands for your permission level.",
  usage: "help [command]"
};