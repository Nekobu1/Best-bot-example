const mongoose = require("mongoose")
const botconfig = require("../botconfig.json")
//conect to database 
mongoose.connect(botconfig.mongoPass, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}); //some where 11

//MODELS
const Data = require("../models/data.js")

module.exports.run = async (bot, message, agrs) => {
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
            return message.reply("Sorry, you don't have money to gamble with! Use the daily commands!")
        }else {
            var maxBet = 500000000000000000000000000000000000;

        if(data.money <= 0) return message.reply("You don't have any money.");

        if(!agrs[0]) return message.reply("Please speacify a value.");

        try {
            var bet = parseFloat(agrs[0]);
        } catch {
            return message.reply("You can only entrer whole numbers.");
        }

        if(bet != Math.floor(bet)) return message.reply("You can only entrer whole numbers.");

        if(data.money < bet) return message.reply("You don't have that much money.");

        if(bet > maxBet) return message.reply(`the maximum bet is ${maxBet.toLocaleString()}`);

        let chances = ["win", "lose"];
        var pick = chances[Math.floor(Math.random() * chances.length)];

        if(pick == "lose") {
            data.money -= bet;
            data.save().catch(err => console.log(err))
            return message.reply(`You lose. New Balance: $${data.money}`);
        }else {
            data.money += bet;
            data.save().catch(err => console.log(err))
            return message.reply(`You win! New Balance: $${data.money}`);
        }

            }    
    })   

    
    
}

module.exports.help = {
    name: "gamble",
    aliases: ["gam"]
}
