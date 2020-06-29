// PACKAGES AND FILES
const Discord = require("discord.js")
const bot = new Discord.Client({ disableEveryone: true });
const { prefix, token } = require("./botconfig.json");
const botconfig = require('./botconfig.json');
const fs = require("fs");

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.queue = new Map();

// READ COMMANDS FOLDER
fs.readdir("./commands/",(err, files)=> {
    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0) {
        console.log("Could not find any commands!");
        return;
    }

    jsfile.forEach((f) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);

        props.help.aliases.forEach(alias => {
            bot.aliases.set(alias, props.help.name);
        })
    })
})

// BOT ONLINE MESSAGE AND ACTIVITY MESSAGE
bot.on("ready", async () => {
    console.log(`${bot.user.username}is online on ${bot.guilds.cache.size} servers!`);
    bot.user.setActivity(`Helping ${bot.guilds.cache.size} servers!`)
})



bot.on( "message", async message =>{

    //CHECK CHANNEL TYPE
    if(message.channel.type === "dm") return;
    if(message.author.bot) return; 
     
     
    // SET PREFIX
    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    if(!prefixes[message.guild.id]){
     prefixes[message.guild.id] ={
       prefixes: botconfig.prefixes
      }

    }
    let prefixe = prefixes[message.guild.id].prefixes;

     // CHECK PREFIX, DEFINE ARGS & COMMAND
     if(!message.content.startsWith(prefix)) return;
     let args = message.content.slice(prefix.length).trim().split(/ +/g);
        let cmd;
        cmd = args.shift().toLowerCase();
        let command;
        let commandfile = bot.commands.get(cmd.slice(prefix.length));

        if (commandfile) commandfile.run(bot, message, args);

        if (bot.commands.has(cmd)) {
            command = bot.commands.get(cmd);
        } else if (bot.aliases.has(cmd)) {
            command = bot.commands.get(bot.aliases.get(cmd));
        }
        try {
            command.run(bot, message, args);
        } catch (e) {
            return;
        }
})

bot.login(token);