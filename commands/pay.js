const mongoose = require("mongoose")
const botconfig = require("../botconfig.json")
//conect to database 
mongoose.connect(botconfig.mongoPass, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}); //some where 11

//MODELS
const Data = require("../models/data.js");
const { re } = require("mathjs");

module.exports.run = async (bot, message, args) => {

   let user = message.mentions.users.first() || bot.users.cache.get(args[0]);
   if(!user) return message.reply("Sorry, couldn't find that user.")    
   if(user.id === message.author.id) return message.reply("You cannout pay yourself!")

  Data.findOne({
    userID: message.author.id
  }, (err, authorData) => {
    if(err) console.log(err);
    if(!authorData){
      return message.reply("You Don't have any money to send")

    }else {
      Data.findOne({
        userID: user.id
      },(err, userData) => {
        if(err)console.log(err);
        if (!args[1]) return message.reply("Please specify the amount you want to pay.");
        if(parseInt(args[1]) > authorData.money) return message.reply("You don't have that much money")
        if(parseInt(args[1]) < 1) return message.reply("You can pay less less then 1$");
        if(args[1] != Math.floor(args[1])) return message.reply("Please enter only whole numbers!")
        if(!userData){
          const newData = new Data({
            name: bot.users.cache.get(user.id).username,
            userId: user.id,
            lb: "all",
            money: parseInt(args[1]),
            daily: 0,
        })
        authorData.money -= parseInt(args[1]);
        newData.save().catch(err => console.log (err));
        authorData.save().catch(err => console.log (err));

      

        }else{
          userData.money += parseInt(args[1]);
          authorData.money -= parseInt(args[1]);
          userData.save().catch(err => console.log (err));
          authorData.save().catch(err => console.log (err));
        }
      })
      return message.channel.send(`${message.author.username} payed $${args[1]} to ${bot.users.cache.get(user.id).username}`)

    }
    
  }) 
  
 
}
  module.exports.help ={
    name: "pay", 
    aliases: ["give"]
  }
  
  