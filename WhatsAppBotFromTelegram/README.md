**Introduction**

In this guide, we will explain how to develop a WhatsApp bot on Node JS using our WhatsApp API gateway. 

In our example, we will try to cover the basic, most frequently used functionality, such as:

- Responding to commands
- Outputting the current chat ID (in either private or group messages)
- Outputting the name of the user chatting with the bot
- Sending files of different formats (pdf, jpg, doc, mp3, etc.)
- Sending voice messages (\*.ogg files)
- Sending GPS coordinates (latitude and longitude)`
- Creating a conference (group) chatbot

An important note: Since the whole system works via WhatsAppWeb, your phone must always be connected to the internet.

# Get Things Ready

A Bit of Theory

TheChat-Api service allows for setting up a webhook that will send information about new messages (and more) to your webserver.

Since the webserver will be installed on your computer/VPS/VDS (hereafter _host_), you will need to specify the address for the WebHook in your user account ([https://app.chat-api.com/](https://app.chat-api.com/)).

Go to your account settings and specify the address. In our example, it is https://subdomain.domain.com/webhook.

If you use a separate domain, it will look something like this: https://domain.com/webhook.

After you hit _Save_, all notifications about new messages will go to your address — all you&#39;ll have to do is process them.

# Step 2. Install a Bot on your Host

WerecommendthatyoustartwithcloningourGitrepository so you could adaptitforyourselflater.

CreateaWhatsAppBotfolder andclone(or simply download) files from the Git repository into it.

Now use the _npm install_ command to set the necessary dependencies (libraries) for your bot.

Next, go to the _config.js_ file and specify your URL for requests (in quotation marks) and your token — you can get them in your user account. This is how it should look:

_module_._exports_ = {

    apiUrl: &quot;https://eu14.chat-api.com/instance12345/&quot;,

    token: &quot;xb1s668fphzmr9m&quot;

}

Save the file and type _node_ _index.js_ in the console — this command will launch the webserver so it could process requests.

If you do everything right, the bot will work.

# Step 3.

Now let&#39;s look at how to developabotfromscratch.

Since you are reading this guide, we assume that you know how to install Node.JS and NPM, so we will skip this part and get straight to the point.

Create a WhatsAppBot folder, go there and open the terminal. Initialize a project by using the npm init command, fill out the information asked or just click _Enter_ a few times until you see a dialog box that says Is this OK? (Yes). Press _Enter_ again to confirm initializing.

After that, create a main file _(index.js_) that will contain basic bot logic.
You will also need to create a _config __.__ js_ filewhere you will add the main parameters. Since these parameters can be dynamic, you won&#39;t have to edit the main file every time you need to modify them.

Open the _config __.__ js file_ and add two parameters there — _apiUrl_and _token_:

_module_._exports_ = {

    apiUrl: &quot;&quot;,

    token: &quot;&quot;

}

Don&#39;t forget about the first line — _module.exports_ — it will allow you to access these parameters from another file.

You can enter the parameters from your user account into the _config __.__ js_ file right away. Once you&#39;re done, save and close it.

In our example, we will use the following requirements:
Express (https://www.npmjs.com/package/express)
Node-Fetch (https://www.npmjs.com/package/node-fetch)
Body-Parser (https://www.npmjs.com/package/body-parser)

To start creating a bot, open_index __.__ js_ and declare the dependencies:

_const_ config = require(&quot;./config.js&quot;);

_const_ token = config.token, apiUrl = config.apiUrl;

_const_ app = require(&#39;express&#39;)();

_const_ bodyParser = require(&#39;body-parser&#39;);

_const_ fetch = require(&#39;node-fetch&#39;);

Let us expand on this a bit. The _node-fetch_ allows sending requests to the API, the _config_ file loads data from other files, and assigning values to the _token_ and _apiUrl_ variables from the _config.js_ file helps ease access to them.
The _Express_ module is used to set up a webserver while the _body-parser_ helps to easily extract incoming requests.

Next, let your parser know that you are going to work with _JSON_ data:

app.use(bodyParser.json());

Justincase, add the full errorhandler to observe errors that can appear while processing requests:

process.on(&#39;unhandledRejection&#39;, _err_ _=\&gt;_ {

    _console_.log(err)

});

Next up, start writing the base code.
To check the domain parked to the host, you need to generate the main page (a kind of an _index __.__ html_) with the following block:

app.get(&#39;/&#39;, _function_ (_req_, _res_) {

    res.send(&quot;It&#39;s working&quot;);

});

Simply put, it is a way to check the work of your website. After you have launched the project, go to _yoursite __.__ ru_, and, if you have done everything right, you&#39;ll see the words _It&#39;s working._
Now it&#39;s time to write the function for communicating with our API.

async _function_ apiChatApi(_method_, _params_){

    _const_ options = {};

    options[&#39;method&#39;] = &quot;POST&quot;;

    options[&#39;body&#39;] = JSON.stringify(params);

    options[&#39;headers&#39;] = { &#39;Content-Type&#39;: &#39;application/json&#39; };

    _const_ url = `${apiUrl}/${method}?token=${token}`;

    _const_ apiResponse = await fetch(url, options);

    _const_ jsonResponse = await apiResponse.json();

    return jsonResponse;

}

Let&#39;slookatitmoreclosely. First, you need to createtheapiChatApi asynchronousfunctionthatwillhavetwoparameters: the method called, and the parameter object used to call the method. To give you a rough idea, when you want to send a message, you call the _message_ method and pass the message text and sender as parameters.

Next,inside the function, create an _option_ object. Add the _json_and_method_ keys to the object. _Json_ is used to send values required for the API, while _method_ specifies the method you use to call and get the response.

Once you&#39;re done,definetheconstantvalue of yourURLfortheAPI. This will include the URL itself (from the _config_ file), the _method_ and the _token_ passed via a GET request.

Afterthat, sendtherequestandget the responseinapiResponse(by the way, with a simple bot, you won&#39;t really need a function response except for detecting errors).

Now that the API communication function is ready, it&#39;s time to write the logic for the bot.

Choose the name for your processing page.
In our case, it&#39;s _webhook_ (since requests to the address http://yoursite.com/webhook will be sent by a webhook).

Write a handler for your URL:

app.post(&#39;/webhook&#39;, async _function_ (_req_, _res_) {

});

Insidethehandler, save everythingyouwillget into the _data_variable:

app.post(&#39;/webhook&#39;, async _function_ (_req_, _res_) {

_const_ data = req.body;

});

Thenparseallthe messages:

app.post(&#39;/webhook&#39;, async _function_ (_req_, _res_) {

    _const_ data = req.body;

    for (_var_ i in data.messages) {

    }
});

Next, addinformationaboutincomingmessagestovariablesandskipinformationaboutoutgoingmessages:

app.post(&#39;/webhook&#39;, async _function_ (_req_, _res_) {

    _const_ data = req.body;

    for (_var_ i in data.messages) {

        _const_ author = data.messages[i].author;

        _const_ body = data.messages[i].body;

        _const_ chatId = data.messages[i].chatId;

        _const_ senderName = data.messages[i].senderName;

        if(data.messages[i].fromMe)return;

    }
});

Now theinformationabouttheauthor is presented in the _author_ variable, _body_ contains the text, _chatId_ — the Id of the current chat, and _senderName_ — the name of the person you are chatting with.

Don&#39;t forget to add the code for launching the webserver at the end of the file:

app.listen(80, _function_ () {

    _console_.log(&#39;Listening on port 80..&#39;);

});

Youcancheckthe work ofyourbotbywritingthefollowingcodeinthe_for_cycleafterthedeclaredvariables:

_console_.log(senderName, author, chatId, body);

Launchthebotby using the _node __index__. __js_commandandwritethe followingbot-message: _Test__._Ifeverythingis correct, here is what you&#39;ll see in the console:
Eugene 79123456789@c.us 79123456789@c.us Test

The next step (provided everything works as it should) is to remove (orcommentout) thedebugginglinewiththe_console __.__ log_. You&#39;ll also have to decide howyou willprocesscommands.

Whilethereareseveralwaystodoit, werecommend using the _if __else__ if_constructionincombinationwithregular expressions because, it will allow you, first, to create complex commands with arguments; second, not to deal with duplicating variables (as was the case with _switch – case_); and, third, to very easily identify a wrongly entered command (with the last _else_) and display the corresponding prompt.

Next up, wearegoingtolookat the code nested in _for_. Don&#39;t get confused 😉

First of all, write the commands&#39; structure:

if(/help/.test(body)){

}else if(/chatId/.test(body)){

}else if(/file (pdf|jpg|doc|mp3)/.test(body)){

}else if(/ptt/.test(body)){

}else if(/geo/.test(body)){

}else if(/group/.test(body)){

}

Next, move on to writing thecommand handlers.
Start with _help_ — this one is just a piece of cake.

All you have to do is write a previously prepared text in the _text_ variable and assign the name of the user who wrote to the bot to the _senderName_ variable.

As for the last line, it will include a call to the function working with the API where we pass the _message_ method and the object with the parameters {chatId: chatId, body: text}.

To launch the project, you can use the command _node __index__.__js_ and write _help_ to the bot.

_By the way, in case users write something your bot can&#39;t answer (like &quot;Hi&quot;__,_ _etc.), we recommend sending them the text with all the available commands. In this case, users will always have this starting message within their reach._

Now, it&#39;s time to writeahandlerfor the command _chatId_.
This is pretty easy, too:

await apiChatApi(&#39;message&#39;, {chatId: chatId, body: chatId});

Make a call totheAPI, the _message_ method, and ask it to send the text _chatId_ to the chat.

This was quite easy, wasn&#39;t it? Now, let&#39;s dive deeper.

You are in for the most complicated part of the code — the _file_ command&#39;s functionality.

To begin with, have a good look at this line:

/file (pdf|jpg|doc|mp3)/.test(body)

In short, the idea of its logic is to check if the _body_ value equals the _file_ value + one of the values in the brackets. For example, whether the _body_ value equals the _file pdf_ value or the _file jpg_ value, etc.

If it does, launch your handler. The first thing it&#39;ll do is parse the file type and put it to the _fileType_ variable:

_const_ fileType = body.match(/file (pdf|jpg|doc|mp3)/)[1];

Consequently, the value we will haveinthe_fileType_is _pdf_/_jpg_/_doc_/_mp__3_.

Now create an object with data to send:

_const_ files = {

     doc: &quot;https://domain.com/tra.docx&quot;,

     jpg: &quot;https://domain.com/tra.jpg&quot;,

     mp3: &quot;https://domain.com/tra.mp3&quot;,

     pdf: &quot;https://domain.com/tra.pdf&quot;

};

ItwillallowyoutogettheURLaddressofthefilebyaddressingits key index, forexample:

files[&quot;doc&quot;] // =\&gt; &quot;https://domain.com/tra.docx&quot;

files[&quot;mp3&quot;] // =\&gt; &quot;https://domain.com/tra.mp3&quot;

As a result, the _files__[__fileType__]_ will return the URL of the file you need.

All that is left to do now is create an object of parameters to send to the API:

_var_ dataFile = {

     phone: author,

     body: files[fileType],

     filename: `FILE *.${fileType}`

};

The_phone_ variable will contain the information about the author of the message, the _body_ — a link to the file (see the API) and the _filename_ — a visible name of the file (in our example, it is the word _FILE_ and its extension).

Whenever an image is requested, you need to add the _caption_ key to the parameter object. Here is how to do it:

if(fileType == &quot;jpg&quot;)dataFile[&#39;caption&#39;] = &quot;Photo txt.&quot;;

Now add it all to the function specifying that you want to call the _sendFile_ method:

await apiChatApi(&#39;sendFile&#39;, dataFile);

Now implement the _ptt_ command handler for voice messages.

await apiChatApi(&#39;sendAudio&#39;, {audio: &quot;http://domain.com/tra.ogg&quot;, chatId: chatId});

Call to the function specifying the _sendAudio_ method and the _audio_ key and providing a direct link to the file in the parameter object.

_In __this__ guide, all links to files are static (they call to the hosting). We __advise__ you to send files in the base64 format._

The_geo_commandhandlerisquite simple, too:

await apiChatApi(&#39;sendLocation&#39;, {lat: 51.178843, lng: -1.826210, address: &#39;Place&#39;, chatId: chatId});

Instead of _audio_, you need to send the _lat_ and _lng_ keys that stand for the _latitude_ and _longitude_ of the place, respectively. The _address_ key must contain the address. As for the GPS coordinates, you can get them in Google Maps, for example.

Now we are left with the _group_ command that is responsible for creating a group chatbot. Its handler is not much different from the several previous ones:

_let_ arrayPhones = [ author.replace(&quot;@c.us&quot;,&quot;&quot;) ];

await apiChatApi(&#39;group&#39;, {groupName: &#39;Group with bot&#39;, phones: arrayPhones, messageText: &#39;Welcome!&#39;});

Createan_arrayPhones_array. Add the _author_ variable removing _@ __c__.__us_ and leaving only the phone number in the line.

You can add several phone numbers at once.

Sendarequestto the function with the _group_ method specifying the _groupName_ keys — the name of the chat, the array of users in the _phones_, and the welcome text in the _messageText_.

Well, that&#39;s pretty much it. Your handlers are ready!