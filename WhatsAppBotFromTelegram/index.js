var request = require('request'); //bash: npm install request
// URL for request POST /message
var url = 'https://eu76.chat-api.com/instance //instance number messagetoken=// your token     //can be import from the config file 
const TelegramBot = require('node-telegram-bot-api');
const token = ''  //enter your telegram bot token (check on bot-father);
const bot = new TelegramBot(token, {polling: true});
bot.on('message', (msg) => {
    
    var telegramMessage = msg.text;
 //   var telegramPicture = msg.telegramPicture;
   // var Hi = "hi";
/*if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
bot.sendMessage(msg.chat.id,"Hello dear user");
} */ if (telegramMessage != null){
    console.log(telegramMessage);}

   /* var bye = "bye";
    if (msg.text.toString().toLowerCase().includes(bye)) {
    bot.sendMessage(msg.chat.id, "Have a nice day " + msg.from.first_name); 
    } 
    
    });*/




var data = {
 //   phone: '', // Receivers phone
 chatId : "", // receivers chat (id can be check on chat-api) 
    body: telegramMessage, // Сообщение
   // body: telegramPicture,
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
