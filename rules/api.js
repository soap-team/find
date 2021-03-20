/**
 * Handler for retrieving
 * 
 */
'using strict';

// IRC filters publishes messages to 11100
const fetch = require('node-fetch');
class DiscussionsApi {
	constructor() {

	}

	getWikiaPath(wiki, params) {
		if (params) {
			return `https://${wiki}/wikia.php?${new URLSearchParams(params)}`;
		}
		return `https://${wiki}/wikia.php`;
	}

	getPost(wiki, postId) {
		const params = {
			controller: 'DiscussionPost',
			method: 'getPost',
			postId
		};
		return fetch(this.getWikiaPath(wiki, params))
			.then(resp => resp.json());
	}
}

const a = new DiscussionsApi();
a.getPost('dev.fandom.com', '4400000000000015261');

module.exports = DiscussionsApi;