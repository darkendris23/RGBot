module.exports.run = (client, message, args) => {
  if (!args.length) return message.channel.send("Usage");

  const action = args[0];
  if (action === "set") {
    let activity = args[1];
    if (activity === "channel") {
      let ch = args[2];
      if (ch != null) {
        let chid = client.channels.find(channel => channel.name === `${ch}`);
        if (!chid) {
          return message.reply("The channel does not exist.");
        } else {
          chid
            .join()
            .then(connection => {
              // Yay, it worked!
              console.log("Successfully connected.");
            })
            .catch(e => {
              // Oh no, it errored! Let's log it to console :)
              console.error(e);
            });
        }
      } else {
        return message.reply("You did not provide any channel/name");
      }
    } else if (activity === "station") {
      let number = args[2];
        if (number != "list") {
          const nightcore = "";
          const ncs = "";
      } else {
        message.channel.send("__List:__\n 1. Nightcore Radio\n 2. NCS Radio")
      }      
    }
  } else {
    return message.channel.send("Error");
  }
};
