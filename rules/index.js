'using strict';
const messenger = require('messenger');
const irc       = require("irc-upd");
const {
    FindIRC
} = require('./irc.js');
const config    = require('../config.json');
const mvpRules  = require('./database/mvpdata.json');
const FindRules = require('./rules.js');
const {
    DiscussionsUtil,
    DiscussionsApi
} = require('./api');
const FindActions = require('./actions.js');

let pub = messenger.createSpeaker(11100),
    sub = messenger.createListener(11100),
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
    [
        'community.fandom.com:discussion:created',
        'adoptme.fandom.com:discussion:created',
        'adoptme.fandom.com:discussion:modified',
        'noreply.fandom.com:discussion:created',
        'noreply.fandom.com:discussion:modified',
        'noreply.fandom.com:message-wall:created',
        'noreply.fandom.com:message-wall:modified',
        'noreply.fandom.com:article-comment:created',
        'noreply.fandom.com:article-comment:modified',
    ]
);

findClient.start();

let discussionsApi = new DiscussionsApi({
    'fandom.com': '',
    'gamepedia.com': '',
    'wikia.org': ''
});

let rulesClient = new FindRules(sub, mvpRules, discussionsApi, DiscussionsUtil, new FindActions(discussionsApi));

rulesClient.start();