// Networking Stuff so Uptimerobot has something to check (In theory you might not actually need this)
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

// Get the Discord librarys and create a client
const Discord = require('discord.js');
const client = new Discord.Client();

// Our coin flip command.
var coinFlipCommand = function(message){
  var coinflip = Math.floor(Math.random()*2); // Outputs a value that's either 0 or 1.
  if(coinflip === 1){ // Check if the output was 1.
    message.channel.send("Your coin just landed, on **TAILS!**"); // Send the message to the channel the command was posted in
  }
  else{ // Otherwise
    message.channel.send("Your coin just landed, on **HEADS!**"); // Send this message to the channel the command was posted in
  }
};

// Message function
client.on('message', message => {
  var commandMessage = message.toString(); // Converts the message into a string (as the message is an object techincally)
  if(commandMessage.startsWith("?")){ // Does the message start with the prefix?
    commandMessage = commandMessage.slice(1); // Take out the prefix
    console.log(commandMessage); // Output the current message into the logs
    
    if(commandMessage.startsWith("flip")){ // Does the command given equal this one?
      coinFlipCommand(message); // Do the function above.
    }
  }
});

// Ready function
client.on('ready', () => { 
  console.log("Bot was logged in"); // Output a message to the logs.
});
client.login(process.env.TOKEN); // Login your discord bot, if you don't use glitch, you can replace process.env.TOKEN with a token from a data file or something. NEVER SHARE YOUR TOKEN WITH ANYONE OR THEY CAN ACCESS YOUR BOT.
