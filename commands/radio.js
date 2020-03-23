const Enmap = require("enmap");
const ytdl = require("ytdl-core");

module.exports.run = (client, message, args) => {
  const gId = message.guild.id;
  const gConf = client.guildConfig;
  if (!gConf.has(gId)) {
  gConf.ensure(gId, {
    name: "Not set",
    channel: "Not set", 
    station: "Not set"
 		})
  } 
  
  if (!args.length) return message.channel.send(client.channel.get());
  
  if (args[0] === "set") {
    if (args[1] === "channel") {
      let ch = args[2];
      const chid = client.channels.find(channel => channel.name === `${ch}`);
      if (chid != null) {
        if (!chid) {
          return message.reply("The channel does not exist.");
        } else {
          chid
            .join()
            .then(connection => {
              // Yay, it worked!
              console.log("Successfully connected.");
            	gConf.set(gId, chid, "channel");
            })
            .catch(e => {
              // Oh no, it errored! Let's log it to console :)
              console.error(e);
            });
        }
      } else {
        return message.reply("You did not provide any channel/name");
      }
    } else if (args[1] === "station") {
      //Station
      let number = args[2];
      if (number != "list") {
        const station = [
          {name: "None", link: "None"}, 
          {name: "Nightcore Radio", link: "https://www.youtube.com/watch?v=7nuYsK2Mouo"}  //Nightcore
        ];
        gConf.set(gId, "station", station[number].link);
      	gConf.set(gId, "radio", station[number].name);
        message.channel.send("Station successfully setted to " + gConf.get(gId, "radio")) 
      } else {
        message.channel.send("__List:__\n 1. Nightcore Radio\n 2. NCS Radio");
      }
    }
  } else if (args[0] === "info") {
    message.channel.send(`Guild: ${gId}\nChannel: ${gConf.get(gId, "channel")}\nRadio: ${gConf.get(gId, "name")}`);
  } else {
    return message.channel.send("Error");
  }
};
