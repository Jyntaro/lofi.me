const Discord = require('discord.js');
const logger = require('winston');
const auth = require('./auth.json');
const yt = require('ytdl-core');
const pkg = require('./package.json');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
const bot = new Discord.Client();

bot.login(auth.token);

bot.on('ready', () => {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(pkg.name + ' - (' + pkg.author + ')');
});

bot.on('message', message => {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.content.substring(0, 1) == '!') {
        var args = message.content.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'ping':
                message.reply('Pong!');
            break;

            // !greet greets the user
            case 'greet':
                message.reply('Hello, ' + message.member.nickname + '.');
            break;

            // !rolldice will roll a random 6-sided die and output a message with the result
            case 'rolldice':
                var rand = Math.floor(Math.random() * 6) + 1;
                if (rand == 1) {
                    message.reply('Awwww you rolled a 1. Better luck next time!');
                }
                if (rand == 2) {
                    message.reply('You rolled a 2. Could have been better I guess!');
                }
                if (rand == 3) {
                    message.reply('You rolled a 3. Not bad!');
                }
                if (rand == 4) {
                    message.reply('You rolled a 4. I guess it\'s alright.');
                }
                if (rand == 5) {
                    message.reply('You rolled a 5! Nice!');
                }
                if (rand == 6) {
                    message.reply('Wow! You rolled a 6! It must be your lucky day :)');
                }
            break;

            // enter current voice channel and start playing songs
            case 'stream':
                if (!message.guild) return;
                if (message.member.voiceChannel) {
                    message.member.voiceChannel.join()
                        .then(connection => {
                            message.reply('SUCCESSFULLY CONNECTED BEEP BOOP');
                        })
                        .catch(console.log);
                } else {
                    message.reply('You need to join a voice channel first!');
                }
            break;
         }
     }
});
