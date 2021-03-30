'using strict';

// IRC filters publishes messages to 11100
// const db        = require('./database/database.js');
const { VM } = require('vm2');

class FindRules {
	/**
	 * Handles rule checking when a post arrives in the listener.
	 * @param  {messenger.Listener} listener
	 */
	constructor(listener, rules, discussionsApi, discussionsUtil) {
		this.listener = listener;
		this.rules = rules;
		this.DApi = discussionsApi;
		this.DiscussionsUtil = discussionsUtil;
		this.timing = {};
	}
	
	start() {
		let _this = this;
		this.listener.on('find:wiki-trigger-match', async function(msg, data) {
			let context = null;
			
			for (const filter of _this.rules.filters) {
				if (filter.triggers.includes(data.trigger)) {
					if (!context) {
						const { wiki, type, url } = data;
						context = await _this.getContext(wiki, type, url);
					}
					_this.checkFilter(filter.filter, context).then((res) => {
						console.log(`${data.trigger} - ${res}`);
					});
				}
			}
		});
	}

	async getContext(wiki, type, url) {
		let postData = {};
		let userData = {};
		const components = url.split(/[/=#]/g);
		let id = components[components.length - 1];
		switch (type) {
			case 'discussion-thread': {
				await this.DApi.getThread(wiki, id).then((data) => {
					postData = data;
				});
				break;
			}
			case 'discussion-post': {
				await this.DApi.getPostWithJsonModel(wiki, id).then((data) => {
					postData = data;
				});
			}
		}
		await this.DApi.getUserDetails(postData.createdBy.name).then((data) => {
			userData = data;
		});
		return {
			userData,
			postData
		};
	}
	
	async checkFilter(filter, context) {
		const { userData, postData } = context;
		let sandbox = this.DiscussionsUtil.prepareMethods(userData, postData);

		const result = new VM({ sandbox }).run(`
			(function() {
				${filter}
			})();
		`);
		return result;
	}
}

module.exports = FindRules;