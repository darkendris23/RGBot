module.exports.run = (client, message, args) => {
  const Discord = require('discord.js')
  
  let channel = client.channels.get("683188870480920581")
  const embed = new Discord.RichEmbed()
  .setTitle("ANNOUNCEMENT")
  .setDescription(args)
  .setColor(905426)
   	
	
channel.send({ embed }).catch(e => {console.error(e)});
 
 }