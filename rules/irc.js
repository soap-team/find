/**
 * Handler for IRC events from discussions
 * 
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
		this.wikis = wikis || [];
	}

	setWikis(wikis) {
		this.wikis = wikis;
	}

	start() {
		// TODO: config should contain information like IRC channel
		// IRC should addListener to that channel, send to rulesEngine
		// and if matches, send to publisher.
	}

	stop() {
		// TODO: should removeListener from the IRC channel
	}
}

module.exports = FindIRC;