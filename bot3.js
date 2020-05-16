// This is the same as bot2.js (Help command video and stuffs) but using the newest Discord library as of now, v12! This also requires Node v12.x

const http = require('http');
const express = require('express');
const app = express();
var server = require('http').createServer(app);
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
const listener = server.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const {Client, MessageEmbed} = require('discord.js');
const client = new Client();

var Message = function(t, m, message){
  let embed = new MessageEmbed()
        .setTitle(t)
        .setDescription(m)
        .setColor("aaaaaa")
        .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL);
        //.setTimestamp();

    message.channel.send(embed);
};

var cmds = [
  {
    name: "Coin Flip",
    descr: "A command that flips a coin on heads or tails",
    usage: "?flip",
    cnames: ["f", "flip"],
    command: function(message){
      var coinflip = Math.floor(Math.random()*2);
      if(coinflip === 1){
        Message("Coin Flipped!", "Your coin just landed, on **TAILS!**", message);
      }
      else{
        Message("Coin Flipped!", "Your coin just landed, on **HEAD!**", message);
      }
    },
  },
  {
    name: "Dice Roll",
    descr: "Roll a dice of a certain number",
    usage: "?dice <dice sides>",
    cnames: ["d", "dice"],
    command: function(message, args){
      if(Math.floor(args[0]) <= 0 || Math.floor(args[0]) + "a" === "NaNa" || args[0] === undefined || args[0] === ""){
        Message("Uh oh!", "Input a number above 0", message);
        return;
      }
      var dice = Math.floor(Math.random()*Math.floor(args[0]));
      Message("Dice Rolled!", "Dice Rolled, on a " + dice, message);
    },
  },
  {
    name: "Help",
    descr: "A command that lists all existing commands",
    usage: "?help <page number>",
    cnames: ["help"],
    command: function(message, args, commands){
      var pg = Math.floor(args[0]) || 0;
      if(args[0] === undefined || args[0] === ""){
        args[0] = 1;
        pg = 1;
      }
      if(pg < 1 || pg > 1+Math.floor(commands.length/5)){
        Message("Uh oh!", "You need a valid page number!", message);
        return;
      }
      var max = pg*5;
      if(max >= commands.length){
        max = commands.length;
      }
      pg = pg-1;
      var h1 = "";
      for(var i = pg*5;i < max;i ++){
        h1 +=`**${commands[i].name}** - \`${commands[i].usage}\`\n${commands[i].descr}\n\n`;
      }
      
      Message(`**HELP:** Page ${pg+1}/${1+Math.floor(max/5)}:`, `${h1}`, message);
    },
  },
];
client.on('message', message => {
  if(message.channel.type === 'dm') return;
  if(message.author.id === client.user.id || message.author.bot) return;
  
  var commandMessage = message.toString();
  if(commandMessage.startsWith("?")){
    commandMessage = commandMessage.slice(1);
    
    var fullCmd = commandMessage;
    var nameCmd = fullCmd.split(' ')[0]; //gets the name of the command
    var args = fullCmd.replace(nameCmd, ''); //gets the args and takes out the name of the command
    nameCmd = nameCmd.toLowerCase(); //converts the command to lowercase, so Flip and flip will work for example.
    args = args.slice(1); //takes out the space before the args
    args = args.split(' ');
    
    //console.log(commandMessage);
    for(var i = 0;i < cmds.length; i ++){
      for(var j = 0;j < cmds[i].cnames.length;j ++){
        if(nameCmd === cmds[i].cnames[j]){
          cmds[i].command(message, args, cmds);
          return;
        }
      }
    }
  }
});
client.on('ready', () => {
  console.log("Bot was logged in");
});
client.login(process.env.TOKEN);
