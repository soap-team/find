/**
* Handler for retrieving
* 
*/
'using strict';

// IRC filters publishes messages to 11100
const fetch = require('node-fetch');

const DOMAINS = [
	'fandom.com',
	'gamepedia.com',
	'wikia.org'
];
const DEFAULT_DOMAIN = DOMAINS[0];

class DiscussionsApi {
	constructor(tokens) {
		this.ua = 'Filters in Discussions (FIND tool); @noreplyz';
		this.postSource = 'DISCUSSIONS';
		this.tokens = tokens || {};
	}

	login(username, password) {
		const _this = this;
		let loginPromises = [];
		const params = new URLSearchParams();
		params.append('username', username);
		params.append('password', password);
		return new Promise((resolve, reject) => {
			for (const domain of DOMAINS) {
				let services = `https://services.${domain}/auth/token`;
				loginPromises.push(
					fetch(services, {
						headers: {
							'User-Agent': this.ua,
							'connection': 'keep-alive',
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						method: 'POST',
						body: params
					})
				);
			}
			Promise.all(loginPromises)
			.then(result => Promise.all(result.map(v => v.json())), () => reject())
			.then((auths) => {
				for (const entries of Object.entries(DOMAINS)) {
					const [i, domain] = entries;
					_this.tokens[domain] = auths[i].access_token;
					console.log(auths[i]);
				}
				resolve();
			}, () => reject());
		});
	}

	whoami(domain) {
		return fetch(`https://services.${domain}/whoami`, {
			headers: this.generateHeaders(domain, true, {
				'User-Agent': this.ua
			})
		})
		.then(resp => resp.json());
	}

	generateHeaders(wiki, includeCookie, data) {
		let headers = {
			'User-Agent': this.ua
		};
		if (includeCookie && wiki) {
			headers.cookie = `access_token=${this.tokens[this.getDomain(wiki)]};`;
		}
		return { ...headers, ...data };
	}

	getDomain(wiki) {
		for (const domain of DOMAINS) {
			if (wiki.includes(domain)) return domain;
		}
		return DEFAULT_DOMAIN;
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
		const _this = this;
		const params = {
			controller: 'DiscussionPost',
			method: 'getPost',
			viewableOnly: false,
			postId
		};
		return fetch(this.getWikiaPath(wiki, params), {
			headers: _this.generateHeaders(wiki, false)
		})
		.then(resp => resp.json());
	}
	
	deletePost(wiki, postId) {
		const _this = this;
		const params = {
			controller: 'DiscussionPost',
			method: 'delete',
			postId
		};
		return fetch(this.getWikiaPath(wiki, params), {
			headers: _this.generateHeaders(wiki, true, {
				'Content-Type': 'application/json'
			}),
			method: 'POST'
		})
		.then(resp => resp.json());
	}
	
	getThread(wiki, threadId, data) {
		const _this = this;
		let params = {
			controller: 'DiscussionThread',
			method: 'getThread',
			viewableOnly: false,
			threadId
		};
		params = { ...params, ...data };
		return fetch(this.getWikiaPath(wiki, params), {
			headers: _this.generateHeaders(wiki, true, {
				'Content-Type': 'application/json'
			}),
		})
		.then(resp => resp.json());
	}
	
	deleteThread(wiki, threadId) {
		const _this = this;
		const params = {
			controller: 'DiscussionThread',
			method: 'delete',
			threadId
		};
		return fetch(this.getWikiaPath(wiki, params), {
			headers: _this.generateHeaders(wiki, true)
		})
		.then(resp => resp.json());
	}
	
	lockThread(wiki, threadId) {
		const _this = this;
		const params = {
			controller: 'DiscussionThread',
			method: 'lock',
			threadId
		};
		return fetch(this.getWikiaPath(wiki, params), {
			headers: _this.generateHeaders(wiki, true)
		})
		.then(resp => resp.json());
	}
	
	async getPostWithJsonModel(wiki, postId, threadId) {
		if (!threadId) {
			await this.getPost(wiki, postId).then((data) => {
				threadId = data.threadId;
			}, () => {});
		}
		const thread = await this.getThread(wiki, threadId, {
			responseGroup: 'full',
			viewableOnly: false,
			pivot: (BigInt(postId) + 1n).toString(),
			limit: 1
		});
		return new Promise((resolve, reject) => {
			try {
				if (!thread._embedded) resolve();
				resolve(thread._embedded['doc:posts'][0]);
			} catch (e) {
				reject();
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

	async replyString(wiki, siteId, threadId, message) {
		const jsonModel = {
			"type": "doc",
			"content": [{
				"type": "paragraph",
				"content": [{
					"type": "text",
					"text": message
				}]
			}]
		}
		return this.replyJsonModel(wiki, siteId, threadId, jsonModel, {});
	}

	async replyJsonModel(wiki, siteId, threadId, jsonModel, jsonBody) {
		const _this = this;
		const params = {
			controller: 'DiscussionPost',
			method: 'create'
		};
		let body = {
			body: '',
			jsonModel: JSON.stringify(jsonModel),
			attachments: {
				contentImages: [],
				openGraphs: [],
				atMentions: []
			},
			siteId,
			source: _this.postSource,
			threadId
		};
		body = {
			...body,
			...jsonBody
		};
		
		return fetch(this.getWikiaPath(wiki, params), {
			headers: _this.generateHeaders(wiki, true, {
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(body),
			method: 'POST'
		})
		.then(resp => resp.json());
	}
	
	async getUserDetails(username) {
		const _this = this;
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
			headers: _this.generateHeaders('community.fandom.com', false)
		})
		.then(resp => resp.json())
		.then(data => {
			userData = data.query.users[0];
			if (userData.registration === null && userData.userid < 30000) {
				userData.registration = "2006-06-01T00:00:00Z";
			}
		});
		return userData;
	}
	
	async logDiscord(webhook, content) {
		const _this = this;
		await fetch(webhook, {
			headers: _this.generateHeaders(null, false, {
				'Content-Type': 'application/json'
			}),
			method: 'POST',
			body: JSON.stringify({
				content,
				allowed_mentions: {
					parse: ['users', 'roles'],
				}
			})
		})
	}
}

let DiscussionsUtil = {};

DiscussionsUtil.getLinks = (json) => {
	let links = [];
	if (json && json.content && json.content.length > 0) {
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

DiscussionsUtil.getTextContent = (json) => {
	let blockstr = json.content.map((block) => {
		if (block.type === 'paragraph' && block.content) {
			let str = block.content.map((subBlock) => {
				return subBlock.text;
			});
			return str.join('') + '\n';
		}
		return '';
	});
	return blockstr.join('');
}

DiscussionsUtil.prepareMethods = (user, post, trigger) => {
	let getLinks = () => [];
	if (post) {
		getLinks = () => (DiscussionsUtil.getLinks(JSON.parse(post.jsonModel)));
	}
	return {
		user,
		post,
		trigger,
		getLinks,
		getText: () => (DiscussionsUtil.getTextContent(JSON.parse(post.jsonModel)))
	}
}

// const a = new DiscussionsApi();
// console.log(a.tokens);
// a.replyString('noreply.fandom.com', 1260576, '4400000000000059250', 'abcd').then(
// 	console.log, console.log
// );
// a.deletePost('noreply.fandom.com', '4400000000000166544');
// a.getPost('adoptme.fandom.com', '4400000000019946635').then((d) => console.log(d));
// a.getThread('noreply.fandom.com', '4400000000000059204').then((d) => console.log(d));
// a.getPostWithJsonModel('noreply.fandom.com', '4400000000000166544').then((postData) => {
// 	a.getUserDetails(postData.createdBy.name).then((userData) => {
// 		let context = DiscussionsUtil.prepareMethods(userData, postData);
// 		console.log(context.getLinks());
// 	});
// })
// a.getPostWithJsonModel('adoptme.fandom.com', '4400000000019946635', '4400000000004254290').then((d) => console.log(d));
// a.getUserDetails('Pcj').then(console.log);

module.exports = {
	DiscussionsApi,
	DiscussionsUtil
};