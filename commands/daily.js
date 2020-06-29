const ms = require("parse-ms");
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
    
    let timeout = 86400000;
    let reward = 1000;

Data.findOne({
    userID: message.author.id
}, (err,data) => {
    if(err) console.log(err);
    if(!data){
        const newData = new Data({
            name: message.author.username,
            userId: message.author.id,
            lb: "all",
            money: reward,
            daily: Date.now(),
        })
        newData.save().catch(err => console.log (err));
        return message.channel.send(`${message.author.username} has $${reward}.`);
    }else{
       if(timeout - (Date.now() - data.daily) > 0){
            let time = ms(timeout - (Date.now() - data.daily));
            return message.reply(`You already collected your daily reward Collect again in ${time.hours}h ${time.minutes}m ${time.seconds}s`);
       }else {
        data.money += reward;
        data.daily = Date.now();
        data.save().catch(err => console.log(err));
        
        return message.reply(`you received a reward of $${reward}.`)

       }     
    
    }
})   


  }

  module.exports.help = {

    name: "daily",
    aliases: ["daily"]
  }


