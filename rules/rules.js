'using strict';

// IRC filters publishes messages to 11100
const messenger = require('messenger');
const irc       = require('irc-upd');
const db        = require('./database/database.js');

class FindRules {
	/**
	 * Handles rule checking when a post arrives in the listener.
	 * @param  {messenger.Listener} listener
	 */
	constructor(listener) {
		this.listener = listener;
	}
	
	
}

module.exports = FindIRC;