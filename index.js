require("dotenv").config();
const Discord = require("discord.js");

const client = new Discord.Client();
const config = require("./config.json");
client.config = config;

const Enmap = require("enmap");
const fs = require("fs");
const ytdl = require('ytdl-core');
require(__dirname + "/app/keepAlive.js");

client.dataBase = new Enmap();
client.gConf = new Enmap();
client.radio = new Enmap();

client.settings = new Enmap({
  name: "settings",
  fetchAll: false,
  autoFetch: true,
  cloneLevel: 'deep'
});

const defaultSettings = {	
  prefix: "R!",	
  modLogChannel: "mod-log",	
  modRole: "Moderator",	
  adminRole: "Admin",	
  welcomeChannel: "welcome",	
  welcomeMessage: "Say hello to {{user}}, everyone! We all need a warm welcome sometimes :D"	
}

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

client.login(process.env.TOKEN);
