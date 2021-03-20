/**
 * Handler for IRC events from discussions
 */
'using strict';

// IRC filters publishes messages to 11100
const messenger = require('messenger');
const irc       = require('irc-upd');

class FindIRC {
	/**
	 * Creates an IRC messenger that publishes data to a port
	 * when it matches a wiki
	 * (Rule matching is handled by rules.js)
	 * @param  {irc.Client}        irc connection to the internal IRC feed
	 * @param  {string}            feedChannel name of the internal IRC feed channel
	 * @param  {messenger.Speaker} publisher
	 */
	constructor(irc, feedChannel, publisher, wikis) {
		this.irc = irc;
		this.feedChannel = feedChannel;
		this.publisher = publisher;
		this.wikis = new Set(wikis || []);
		console.log(this.wikis);
	}

	setWikis(wikis) {
		this.wikis = new Set(wikis);
	}

	start() {
		let _this = this;
		this.irc.addListener(`message${this.feedChannel}`, function (from, message) {
			try {
				// Get wiki via splitting
				let postURL = message.split('"url":"https://')[1];
				postURL = postURL.split('","')[0];
				let wiki = postURL.split('/f/p')[0];
				if (_this.wikis.has(wiki)) {
					_this.publisher.send('find:wiki-match', {
						wiki: wiki,
						url: 'https://' + postURL
					});
				}
			} catch (e) {
				console.log(e);
			}
		});
	}
}

module.exports = FindIRC;