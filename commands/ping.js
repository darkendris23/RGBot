exports.run = async (client, message, args) => {
  if (!message.mentions.users.size) {
    message.reply("Pinging...").catch(console.error)
    .then((msg) => {
      let ms = (Date.now() + msg.createdTimestamp)  
      msg.edit("Ping: " + ms).catch(console.error);
    }
         ) 
  } else {
    const taggedUser = message.mentions.users.first();

    message.channel.send(
      "Hey, " +
        `${taggedUser.username}` +
        " you were pinged by " +
        `${message.author}`
    ).catch(console.error);
  }
};

exports.config = {
  name: "ping",
  aliases: ["p"]
};
