const Discord = require('discord.js');
const colors = require("../colors.json");

module.exports.run = async (bot, message, args) => {

      let gifs = [
           "https://thumbs.gfycat.com/PhysicalKindHypacrosaurus-small.gif",
           "https://i.pinimg.com/originals/9d/50/a9/9d50a9437eb26393b76b3ac983133dac.gif",
           "https://media.giphy.com/media/yGZnLLLmHVEB2/giphy.gif",
           "https://i.imgur.com/soXFedi.gif",
           "https://pa1.narvii.com/5652/68cebcbc97ef31c240a6960767810ca11f5b9749_hq.gif",
           "https://i.pinimg.com/originals/fc/94/d2/fc94d27983c256f2d77e4b9f7bf4c857.gif",
           "https://gifimage.net/wp-content/uploads/2018/04/killing-gif-11.gif",
           "https://animereview829003141.files.wordpress.com/2018/10/fire2.gif",
           "https://animereview829003141.files.wordpress.com/2018/10/fire2.gif"
      ];
      let pick = gifs[Math.floor(Math.random() * gifs.length)];

      let embed = new Discord.MessageEmbed();
      embed.setColor(colors.purple);
      embed.setImage(pick);

      if(args[0]){
            let user = message.mentions.members.first();
            embed.setTitle(`${message.author.username} kill ${bot.users.cache.get(user.id).username}!`);
      }else {
            embed.setTitle(`${message.author.username} wants a get killed `);
      }

      message.channel.send(embed);
}

module.exports.help = {
   name: "kill", 
   aliases: ["kill"]
   
}
