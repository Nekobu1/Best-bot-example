const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {
  const user = message.mentions.users.first() || message.author;
        message.channel.send(
          new Discord.MessageEmbed()
            .setColor(0x333333)
            .setAuthor(`${user.username}'s avatar`)
            .setImage(
              user.avatarURL({ format: "png", size: 1024, dynamic: true })
            )
        );
  
};
module.exports.help = {
  name: "avatar",
  aliases: ["av"]
};