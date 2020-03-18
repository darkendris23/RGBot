require("dotenv").config();
const Discord = require("discord.js");

const client = new Discord.Client();
const guild = new Discord.Guild();
const config = require("./config.json");
client.config = config;

const Enmap = require("enmap");
const fs = require("fs");
require(__dirname + "/app/keepAlive.js");



client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.events = new Discord.Collection();

//Events "handler"
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});


//Commands
client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
  });
});

client.on("Serving guild", () => {
  console.log(`${guild.id}`);
});

client.login(process.env.TOKEN);
