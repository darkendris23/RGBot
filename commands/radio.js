const Enmap = require("enmap");
const ytdl =  require("ytdl-core");

module.exports.run = (client, message, args) => {
  const gId = message.guild.id;
  const link = client.radio.get(gId);
  
  if (!args.length) return message.channel.send(client.channel.get());
  
  let action = args[0];
  if (action === "set") {
    let activity = args[1];
    if (activity === "channel") {
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
            const dispatcher = connection
          .play(
            ytdl(link, { // pass the url to .ytdl()
              quality: 'highestaudio',
              // download part of the song before playing it
              // helps reduces stuttering
              highWaterMark: 1024 * 1024 * 10
            })
          )
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
      //Station
      let number = args[2];
      if (number != "list") {
        let station1 = "https://www.youtube.com/watch?v=7nuYsK2Mouo"; //Nightcore
        let station2 = "";
        	if (`${number}` === "1") {
            client.radio.set(gId, station1)
            message.channel.send(`"Station is set to ${client.radio.get(gId)}"`)
          }
      } else {
        message.channel.send("__List:__\n 1. Nightcore Radio\n 2. NCS Radio");
      }
    }
  } else if (action === "info") {
    message.channel.send(link);
  } else {
    return message.channel.send("Error");
  }
};
