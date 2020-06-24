var request = require('request'); //bash: npm install request
// URL for request POST /message
const config= require  ("./config.js");
const tokenWhatshap = config.tokenWhatshap;
const apiUrl = config.apiUrl;
var url = `${apiUrl}message?token=${tokenWhatshap}`;
const TelegramBot = require('node-telegram-bot-api');
const tokenTelegram = config.tokenTelegram;
const bot = new TelegramBot(tokenTelegram, {polling: true});
bot.on('message', (msg) => {
    
    var telegramMessage = msg.text;
  if (telegramMessage != null){
    console.log(telegramMessage);}


var data = {
  // phone: '972586899203', // Receivers phone or on chatId the id of the whatshap group
 chatId : "972586899203-1552776990@g.us", //chat id can be check on your account of api-chat 
    body: telegramMessage, 
   
};
// Send a request
if (telegramMessage != null){
request({
    url: url,
    method: "POST",
    json: data
}); 
}
})
