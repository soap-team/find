## Documentation
The rules system is separated into a few 'services' that communicate with each other using messenger.

* `irc.js`: FindIRC listens to posts from IRC and sends activity (for certain wikis) to the rules engine
* `activityfeed.js`: FindActivityFeed listens to posts from a wiki's Special:SocialActivity and sends it to the rules engine
* `rules.js`: FindRules listens to messenger activity and checks for matches against rules

We also have some more helper/backend stuff:
* `api.js`: Discussions API
* `database/`: ways to communicate to the db

## Terminology
* 'trigger': a Discussions related action determined from the input feed, formatted `wiki:type:action`
* 'action': a FIND action performed by the bot after a filter matches

## Messenger schema
Messages are published on port 11100.

**find:wiki-trigger-match**
```js
{
    wiki: 'dev.fandom.com',
    trigger: 'dev.fandom.com:discussion:created',
    type: 'discussion-post',
    action: 'created',
    url: 'https://dev.fandom.com/f/p/4400000000000005551/r/4400000000000015261'
}
```