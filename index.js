require("dotenv").config();
const Discord = require("discord.js");

const client = new Discord.Client();
const config = require("./config.json");
client.config = config;

const MongoClient = require('mongodb').MongoClient
const Enmap = require("enmap");
const fs = require("fs");
const ytdl = require('ytdl-core');
require(__dirname + "/app/keepAlive.js");
const activity = "with Anime Lyrics PH";

//=============================================================

const url = process.env.DB;

//=============================================================

client.user = new Enmap({name: "user"});
client.guildConfig = new Enmap();
client.radio = new Enmap();

//=============================================================

client.settings = new Enmap({
  name: "settings",
  fetchAll: false,
  autoFetch: true,
  cloneLevel: 'deep'
});

const defaultSettings = {	
  prefix: "r!",	
  modLogChannel: "mod-log",	
  modRole: "Moderator",	
  adminRole: "Admin",	
  welcomeChannel: "welcome",	
  welcomeMessage: "Say hello to {{user}}, everyone! We all need a warm welcome sometimes :D"	
}

//=====================================================================

const mongo = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
mongo.connect(err => {
  if (err) return console.error(err);

mongo.open(function(err, mongo) {
  
const servers = mongo.db("servers")
const gSettings = servers.collection("settings");

gSettings.insertOne({name: 'Test'}, (err, result) => {
  if (err) {
	console.error(err)
    return
  } else {
    console.log(result)
  }

gSettings.find().toArray((err, items) => {
  console.log(items)
})
	})
})
});

//=====================================================================

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

//Radio
client.on("ready", () => {
  client.activity = activity
  const chtemp = client.channels.find(channel => channel.name === "Radio") 
  let chids = fs.existsSync('./commands/radio/chid.txt') ? fs.readFileSync('./commands/radio/chid.txt').toString() : chtemp ;
  chids.join()
    .then(connection => {

    // Yay, it worked!

    console.log("Successfully connected.");
    return connection.play(ytdl('https://youtu.be/zp4h8k3tINs', {filter : 'audioonly'}));

  }) 
    .catch(e => {

    // Oh no, it errored! Let's log it to console :)

    console.error(e);

  });

});

client.login(process.env.TOKEN);
