'using strict';

// IRC filters publishes messages to 11100
const messenger = require('messenger');
const irc       = require('irc-upd');
// const db        = require('./database/database.js');
const { VM }    = require('vm2');
const { DiscussionsUtil, DiscussionsApi } = require('./api');

class FindRules {
	/**
	 * Handles rule checking when a post arrives in the listener.
	 * @param  {messenger.Listener} listener
	 */
	constructor(listener) {
		this.listener = listener;
	}
	
	async checkFilter(filter) {
		const DApi = new DiscussionsApi();
		// a.getPost('adoptme.fandom.com', '4400000000019946635').then((d) => console.log(d.id));
		// a.getThread('noreply.fandom.com', '4400000000000059204').then((d) => console.log(d));
		let postData = {};
		let userData = {};
		await DApi.getPostWithJsonModel('noreply.fandom.com', '4400000000000166544').then((data) => { postData = data; });
		await DApi.getUserDetails(postData.createdBy.name).then((data) => { userData = data; });

		let sandbox = DiscussionsUtil.prepareMethods(userData, postData);

		return new VM({sandbox}).run(`
			(function() {
				${filter}
			})();
		`);
	}
}

module.exports = FindRules;