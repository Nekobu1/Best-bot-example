const fs = require("fs");
const mongoose = require("mongoose")
const botconfig = require("../botconfig.json")

//conect to database 
mongoose.connect(botconfig.mongoPass, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}); //some where 11

//MODELS
const Data = require("../models/data.js")

module.exports.run = async (bot, message, args) => {

        if(!args[0]) {
            var user = message.author;
        } else {
            var user = message.mentions.users.first() || bot.users.cache.get(args[0]); 
        }
        Data.findOne({
            userID: user.id
        }, (err,data) => {
            if(err) console.log(err);
            if(!data){
                const newData = new Data({
                    name: bot.users.cache.get(user.id).username,
                    userID: user.id,
                    lb: "all",
                    money: 0,
                    daily: 0,
                })
                newData.save().catch(err => console.log (err));
                return message.channel.send(`${bot.users.cache.get(user.id).username} has $${newData.money}.`);
            }else{
                return message.channel.send(`${bot.users.cache.get(user.id).username} has $${data.money}`);
            }
        })
        
        
        

  }
  
  module.exports.help = {
    name: "balance",
    aliases: ["bal", "money"]
  }



  