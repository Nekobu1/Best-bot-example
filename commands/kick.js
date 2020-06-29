const discord = require("discord.js");
 
module.exports.run = async (bot, message, args) => {
 
   
    if(!message.member.hasPermission("KICK_MEMBERS")) {
      return message.channel.send(`**${message.author.username}**, You do not have perms to kick someone.`)
    }
   
    if(!message.guild.me.hasPermission("KICK_MEMBERS")) {
      return message.channel.send(`**${message.author.username}**, I do not have the perms to kick.`)
    }
   
    let target = message.mentions.members.first();
   
    if(!target) {
      return message.channel.send(`**${message.author.username}**, Please mention the person you want to kick!`)
    }
   
    if(target.id === message.author.id) {
     return message.channel.send(`**${message.author.username}**, You can not kick yourself!`)
    }
   
  if(!args[1]) {
    return message.channel.send(`**${message.author.username}**, Please give a reason to kick the member.`)
  }
   
    let embed = new discord.MessageEmbed()
    .setTitle("Action: Kick")
    .setDescription(`${target} (${target.id}) has been kicked!`)
    .setColor("#C76666")
    .setFooter(`Kicked by ${message.author.username}!`);
   
    message.channel.send(embed)
   
    target.kick(args[1]);
   
   
   
  }
  module.exports.help = {
    name: "kick",
    aliases: ["kick"]
   }