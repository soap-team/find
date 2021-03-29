/**
 * Handler for retrieving
 * 
 */
'using strict';

// IRC filters publishes messages to 11100
const fetch = require('node-fetch');
class DiscussionsApi {
	constructor() {
		this.ua = 'Filters in Discussions (FIND tool); @noreplyz';
	}

	getApiPath(wiki, params) {
		if (params) {
			return `https://${wiki}/api.php?${new URLSearchParams(params)}`;
		}
		return `https://${wiki}/api.php`;
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
		return fetch(this.getWikiaPath(wiki, params), {
			headers: {
				'User-Agent': this.ua
			}
		})
		.then(resp => resp.json());
	}

	getThread(wiki, threadId, data) {
		let params = {
			controller: 'DiscussionThread',
			method: 'getThread',
			threadId
		};
		params = { ...params, ...data };
		return fetch(this.getWikiaPath(wiki, params), {
			headers: {
			'User-Agent': this.ua
			}
		})
		.then(resp => resp.json());
	}

	async getPostWithJsonModel(wiki, postId, threadId) {
		if (!threadId) {
			await this.getPost(wiki, postId).then((data) => {
				threadId = data.threadId;
			});
		}
		const thread = await this.getThread(wiki, threadId, {
			responseGroup: 'full',
			pivot: (BigInt(postId) + 1n).toString(),
			limit: 1
		});
		return new Promise((resolve, reject) => {
			try {
				resolve(thread._embedded['doc:posts'][0]);
			} catch (e) {
				reject(e);
			}
		});
	}

	async getFirstPostFromThread(wiki, threadId) {
		const thread = await this.getThread(wiki, threadId);
		return new Promise((resolve, reject) => {
			try {
				resolve(thread._embedded.firstPost[0]);
			} catch (e) {
				reject(e);
			}
		});
	}

	async getUserDetails(username) {
		// TODO: maybe https://community.fandom.com/wikia.php?controller=UserProfile&method=getUserData&format=json&userId=4133
		let params = {
			action: 'query',
			list: 'users',
			ususers: username,
			usprop: [
				'blockinfo',
				'groups',
				'groupmemberships',
				'implicitgroups',
				'editcount',
				'registration',
				'emailable',
				'gender',
				'centralids',
				'cancreate'
			].join('|'),
			format: 'json'
		};

		let userData = null;
		await fetch(this.getApiPath('community.fandom.com', params), {
			headers: {
			'User-Agent': this.ua
			}
		})
		.then(resp => resp.json())
		.then(data => {
			userData = data.query.users[0];
			if (userData.registration === null && userData.userid < 30000) {
				userData.registration = "2006-06-01T00:00:00Z";
			}
		});
		return new Promise((resolve) => {
			resolve(userData);
		});
	}
}

let DiscussionsUtil = {};

DiscussionsUtil.getLinks = (json) => {
	let links = [];
	if (json.content && json.content.length > 0) {
		json.content.forEach(child => {
			if (child.type === 'text' || child.type == 'openGraph') {
				if (child.attrs && child.attrs.url) {
					links.push(child.attrs.url);
				}
				if (child.marks) {
					child.marks.forEach(mark => {
						if (mark.attrs && mark.attrs.href) {
							links.push(mark.attrs.href);
						}
					});
				}
			}
			if (child.content) {
				links = links.concat(DiscussionsUtil.getLinks(child));
			}
		});
	}
	return links;
};

DiscussionsUtil.prepareMethods = (user, post) => {
	return {
		user,
		post,
		getLinks: () => (DiscussionsUtil.getLinks(JSON.parse(post.jsonModel)))
	}
}

// const a = new DiscussionsApi();
// a.getPost('adoptme.fandom.com', '4400000000019946635').then((d) => console.log(d.id));
// a.getThread('noreply.fandom.com', '4400000000000059204').then((d) => console.log(d));
// a.getPostWithJsonModel('noreply.fandom.com', '4400000000000166544').then((postData) => {
// 	a.getUserDetails(postData.createdBy.name).then((userData) => {
// 		let context = DiscussionsUtil.prepareMethods(userData, postData);
// 		console.log(context.getLinks());
// 	});
// })
// a.getPostWithJsonModel('adoptme.fandom.com', '4400000000019946635', '4400000000004254290').then((d) => console.log(d.id));
// a.getUserDetails('Pcj').then(console.log);

module.exports = {
	DiscussionsApi,
	DiscussionsUtil
};