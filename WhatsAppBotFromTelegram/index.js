/*
const config = require("./config.js");
const token = config.token, apiUrl = config.apiUrl;
const app = require('express')();
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
app.use(bodyParser.json());

process.on('unhandledRejection', err => {
    console.log(err)
});	

app.get('/', function (req, res) {
    res.send("It's working?");
}); 

app.post('/webhook', async function (req, res) {
    const data = req.body;
    for (var i in data.messages) {
        const author = data.messages[i].author;
        const body = data.messages[i].body;
        const chatId = data.messages[i].chatId;
        const senderName = data.messages[i].senderName;
        if(data.messages[i].fromMe)return;
        
        if(/help/.test(body)){
            const text = `${senderName}, this is a demo bot for https://chat-api.com/.
            Commands:
            1. chatId - view the current chat ID
            2. file [pdf/jpg/doc/mp3] - get a file
            3. ptt - get a voice message
            4. geo - get a location
            5. group - create a group with you and the bot`;
            await apiChatApi('message', {chatId: chatId, body: text});
        }else if(/chatId/.test(body)){
            await apiChatApi('message', {chatId: chatId, body: chatId});
        }else if(/file (pdf|jpg|doc|mp3)/.test(body)){
            const fileType = body.match(/file (pdf|jpg|doc|mp3)/)[1];
            const files = {
                doc: "http://domain.com/tra.docx",
                jpg: "http://domain.com/tra.jpg",
                mp3: "http://domain.com/tra.mp3",
                pdf: "http://domain.com/tra.pdf"
            };
            var dataFile = {
                phone: author,
                body: files[fileType],
                filename: `File *.${fileType}`
            };
            if(fileType == "jpg")dataFile['caption'] = "Text under the photo.";
            await apiChatApi('sendFile', dataFile);
        }else if(/ptt/.test(body)){            
            await apiChatApi('sendAudio', {audio: "http://domain.com/tra.ogg", chatId: chatId});
        }else if(/geo/.test(body)){
            await apiChatApi('sendLocation', {lat: 51.178843, lng: -1.826210, address: 'Stonehenge', chatId: chatId});
        }else if(/group/.test(body)){
            let arrayPhones = [ author.replace("@c.us","") ];
            await apiChatApi('group', {groupName: 'Bot group', phones: arrayPhones, messageText: 'Welcome to the new group!'});
        }
    }
    res.send('Ok');
});

app.listen(80, function () {
    console.log('Listening on port 80..');
});

async function apiChatApi(method, params){
    const options = {};
    options['method'] = "POST";
    options['body'] = JSON.stringify(params);
    options['headers'] = { 'Content-Type': 'application/json' };
    
    const url = `${apiUrl}/${method}?token=${token}`; 
    
    const apiResponse = await fetch(url, options);
    const jsonResponse = await apiResponse.json();
    return jsonResponse;
}
*/
var request = require('request'); //bash: npm install request
// URL for request POST /message
var url = 'https://eu76.chat-api.com/instance128715/message?token=qr2o66zpzsljax6e';
const TelegramBot = require('node-telegram-bot-api');
const token = '950527833:AAFcqly5rgALLfNGLDoomxyvJVmMlxeiYG8';
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
 //   phone: '586899203', // Receivers phone
 chatId : "972557272116-1589315034@g.us",
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