'using strict';

// IRC filters publishes messages to 11100
// const db        = require('./database/database.js');
const { VM } = require('vm2');

class FindRules {
	/**
	 * Handles rule checking when a post arrives in the listener.
	 * @param  {messenger.Listener} listener
	 */
	constructor(listener, rules, discussionsApi, discussionsUtil, findActions) {
		this.listener = listener;
		this.rules = rules;
		this.DApi = discussionsApi;
		this.DiscussionsUtil = discussionsUtil;
		this.findActions = findActions;
		this.timing = {};
	}
	
	start() {
		let _this = this;
		this.listener.on('find:wiki-trigger-match', async function(msg, triggerMatch) {
			let context = null;
			
			for (const filter of _this.rules.filters) {
				if (filter.triggers.includes(triggerMatch.trigger)) {
					if (!context) {
						const { wiki, type, url } = triggerMatch;
						context = await _this.getContext(wiki, type, url);
					}
					_this.checkFilter(filter.filter, context, triggerMatch).then((res) => {
						if (res) {
							console.log(triggerMatch);
							for (const action of filter.actions) {
								_this.findActions.actionHandler(triggerMatch, context.postData, action);
							}
						}
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
	
	async checkFilter(filter, context, trigger) {
		const { userData, postData } = context;
		let sandbox = this.DiscussionsUtil.prepareMethods(userData, postData, trigger);

		const result = new VM({ sandbox }).run(`
			(function() {
				${filter}
			})();
		`);
		return result;
	}
}

module.exports = FindRules;