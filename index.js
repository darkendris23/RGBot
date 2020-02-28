require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
require(__dirname + "/app/keepAlive.js");

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.events = new Discord.Collection();

//Commands

fs.readdir("./commands/", (err, files) => {
  if (err) return console.log(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    console.log("Successfully loaded " + file);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, props);
  });
});

//Events "handler"
fs.readdir("./events/", (err, files) => {
  if (err) console.log(err);
  files.forEach(file => {
    let eventFunc = require(`./events/${file}`);
    console.log("Successfully loaded " + file);
    let eventName = file.split(".")[0];
    client.on(eventName, (...args) => eventFunc.run(client, ...args));
  });
});

client.on("ready", () => console.log("Online!"));
client.login(process.env.TOKEN);
