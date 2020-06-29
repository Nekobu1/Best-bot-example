const discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission('BAN_MEMBERS')) {
    return message.channel.send(
      `**${message.author.username}**, You do not have perms to ban someone.`
    );
  }

  if (!message.guild.me.hasPermission('BAN_MEMBERS')) {
    return message.channel.send(
      `**${message.author.username}**, I do not have the perms to ban.`
    );
  }

  const target = message.mentions.members.first();

  if (!target) {
    return message.channel.send(
      `**${message.author.username}**, Please mention the person you want to ban!`
    );
  }

  if (target.id === message.author.id) {
    return message.channel.send(
      `**${message.author.username}**, You can not ban yourself!`
    );
  }

  if (!args[1]) {
    return message.channel.send(
      `**${message.author.username}**, Please give a reason to ban the member.`
    );
  }

  let embed = new discord.MessageEmbed()
    .setTitle('Action : Ban')
    .setDescription(`${target} (${target.id}) has been banned!`)
    .setThumbnail(target.avatarURL)
    .setFooter(`Banned by ${message.author.tag}!`);

  message.channel.send(embed);
  target.ban(args[1]);
};

exports.help = {
  name: 'ban',
  aliases: [],
  category: 'moderation',
  description: 'Ban Command',
  usage: 'ban <@user> <reason>',
  run: async (bot, message, args) => {}
};
module.exports.help = {
  name: "ban",
  aliases: []
}

