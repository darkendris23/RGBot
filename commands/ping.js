exports.run = async (client, message, args) => {
  if (!message.mentions.users.size) {
    message.reply("Pong");
  } else {
    const taggedUser = message.mentions.users.first();

    message.channel.send(
      "Hey, " +
        `${taggedUser.username}` +
        " you were pinged by " +
        `${message.author}`
    );
  }
};
