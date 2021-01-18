'using strict';
const messenger = require('messenger');
const irc       = require("irc-upd");
const FindIRC   = require('./irc.js');
const config    = require('../config.json');

let pub = messenger.createSpeaker(11100),
    ircClient = new irc.Client(
        config.irc.host,
        config.irc.nickname, {
            channels: [config.irc.channels.discussions],
            retryCount: 15,
            userName: config.irc.nickname,
            realName: config.irc.realname,
            debug: false,
            autoConnect: true,
            port: config.irc.port
        }
    );

let findClient = new FindIRC(
    ircClient, 
    config.irc.channels.discussions, 
    pub, 
    ['community.fandom.com', 'adoptme.fandom.com']
);

findClient.start();

console.log(findClient);