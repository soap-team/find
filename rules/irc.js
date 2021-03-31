/**
 * Handler for IRC events from discussions
 */
'using strict';

const WIKI_LANGUAGES = ['de', 'en', 'es', 'fr', 'it', 'ja', 'pl', 'pt-br', 'ru', 'zh', 'zh-tw', 'aa', 'ab', 'ace',
	'af', 'ak', 'aln', 'am', 'anp', 'ar', 'arc', 'arn', 'ary', 'arz', 'as', 'av', 'avk', 'ay', 'az', 'ba', 'bat-smg',
	'bcc', 'bcl', 'be', 'be-tarask', 'be-x-old', 'bg', 'bh', 'bho', 'bi', 'bjn', 'bm', 'bn', 'bo', 'bpy', 'bqi', 'br',
	'brh', 'bs', 'bug', 'bxr', 'ca', 'cbk-zam', 'cdo', 'ce', 'ceb', 'ch', 'cho', 'chr', 'chy', 'ckb', 'co', 'cps', 'cr',
	'crh', 'crh-cyrl', 'crh-latn', 'cs', 'csb', 'cu', 'cv', 'cy', 'da', 'de', 'diq', 'dsb', 'dtp', 'dv', 'dz', 'ee',
	'el', 'eml', 'en', 'eo', 'es', 'et', 'eu', 'ext', 'fa', 'ff', 'fi', 'fiu-vro', 'fj', 'fo', 'fr', 'frp', 'frr',
	'fur', 'fy', 'ga', 'gag', 'gan', 'gan-hans', 'gan-hant', 'gd', 'gl', 'glk', 'gn', 'got', 'grc', 'gsw', 'gu',
	'gv', 'ha', 'hak', 'haw', 'he', 'hi', 'hif', 'hif-latn', 'hil', 'ho', 'hr', 'hsb', 'ht', 'hu', 'hy', 'hz', 'id',
	'ig', 'ii', 'ik', 'ike-cans', 'ike-latn', 'ilo', 'inh', 'io', 'is', 'it', 'iu', 'ja', 'jam', 'jbo', 'jut', 'jv',
	'ka', 'kaa', 'kab', 'kbd', 'kbd-cyrl', 'kg', 'khw', 'ki', 'kiu', 'kj', 'kk', 'kk-arab', 'kk-cn', 'kk-cyrl', 'kk-kz',
	'kk-latn', 'kk-tr', 'kl', 'km', 'kn', 'ko', 'ko-kp', 'koi', 'kr', 'krc', 'kri', 'krj', 'ks', 'ks-arab', 'ks-deva',
	'ku', 'ku-arab', 'ku-latn', 'kv', 'kw', 'ky', 'la', 'lad', 'lb', 'lbe', 'lez', 'lfn', 'lg', 'li', 'lij', 'liv',
	'lmo', 'ln', 'lo', 'loz', 'lt', 'ltg', 'lv', 'lzh', 'lzz', 'mai', 'map-bms', 'mdf', 'mg', 'mh', 'mhr', 'mi', 'min',
	'mk', 'ml', 'mn', 'mo', 'mr', 'mrj', 'ms', 'mt', 'mus', 'my', 'myv', 'mzn', 'na', 'nah', 'nan', 'nap', 'ne', 'new',
	'ng', 'niu', 'nl', 'nl-informal', 'nn', 'no', 'nov', 'nrm', 'nso', 'nv', 'ny', 'oc', 'om', 'or', 'os', 'pa', 'pag',
	'pam', 'pap', 'pcd', 'pi', 'pih', 'pl', 'pms', 'pnb', 'pnt', 'prg', 'ps', 'pt', 'pt-br', 'qu', 'qug', 'rgn', 'rif',
	'rm', 'rmy', 'rn', 'ro', 'roa-rup', 'roa-tara', 'ru', 'rue', 'rup', 'ruq', 'ruq-cyrl', 'ruq-latn', 'rw', 'sa',
	'sah', 'sc', 'scn', 'sco', 'sd', 'sdc', 'se', 'sei', 'sg', 'sgs', 'sh', 'shi', 'shi-latn', 'shi-tfng', 'si', 'sk',
	'sl', 'sli', 'sm', 'sma', 'sn', 'so', 'sq', 'sr', 'sr-ec', 'sr-el', 'srn', 'ss', 'st', 'stq', 'su', 'sv', 'sw',
	'szl', 'ta', 'tcy', 'te', 'tet', 'tg', 'tg-cyrl', 'tg-latn', 'th', 'ti', 'tk', 'tl', 'tly', 'tn', 'to', 'tpi',
	'tr', 'ts', 'tt', 'tt-cyrl', 'tt-latn', 'tum', 'tw', 'ty', 'tyv', 'udm', 'ug', 'ug-arab', 'ug-latn', 'uk', 'ur',
	'uz', 'val', 've', 'vec', 'vep', 'vi', 'vls', 'vmf', 'vo', 'vot', 'vro', 'wa', 'war', 'wo', 'wuu', 'xal', 'xh',
    'xmf', 'yi', 'yo', 'yue', 'za', 'zea', 'zh', 'zh-hk', 'zh-tw', 'zu'];

const PLATFORM_TYPE = {
    'article-comment-thread': 'article-comment',
    'article-comment-reply': 'article-comment',
    'message-wall-thread': 'message-wall',
    'message-wall-post': 'message-wall',
    'discussion-thread': 'discussion',
    'discussion-post': 'discussion',
    'discussion-report': 'report'
};

const ACTIONS = [
    'created',
    'modified',
    'moved',
    'deleted',
    'un-deleted' // deleted, un-deleted should not trigger ever
];

class FindIRC {
	/**
	 * Creates an IRC messenger that publishes data to a port
	 * when it matches a wiki
	 * (Rule matching is handled by rules.js)
	 * @param  {irc.Client}        irc connection to the internal IRC feed
	 * @param  {string}            feedChannel name of the internal IRC feed channel
	 * @param  {messenger.Speaker} publisher
	 * @param  {Array<String>}     wikiactions array of wiki:actions (e.g. community.fandom.com/de:discussions-post)
	 */
	constructor(irc, feedChannel, publisher, wikiactions) {
		this.irc = irc;
		this.feedChannel = feedChannel;
		this.publisher = publisher;
		this.wikiactions = new Set(wikiactions || []);
		this.overflow = '';
		console.log(this.wikiactions);
	}

	/**
	 * Trims URL and other fluff from a wiki
	 * @param {String} url Uncleaned link to the wiki (or link to a user)
	 * @returns {String} a wiki in the form test.fandom.com/es, null if wiki not found
	 */
	_cleanWiki(url) {
		// Clean up leading/trailing spaces
		url = url.trim();
		// Remove <>
		url = url.replace(/[<>]/g, '');
		// Remove http/s
		url = url.replace(/(https?:)?\/\//g, '');
		// Add a / at the end
		url = url.replace(/\/+$/g, '');
		url = url.toLowerCase();

		// Figure out language
		let lang = '';
		var match = url.match(/\.(fandom|gamepedia|wikia)\.(com|org|io)\/([^/]*).*/i);
		if (match) {
			if (WIKI_LANGUAGES.indexOf(match[3]) > -1) {
				lang = match[3];
			}
		}
		url = url.replace(/\/.*$/g, '');
        if (lang) {
            url = `${url}/${lang}`;
		}
		return url;
	}

	setWikis(wikiactions) {
		this.wikiactions = new Set(wikiactions);
	}

	start() {
		let _this = this;
        this.irc.addListener(`message${this.feedChannel}`, function(from, message) {
            // handle overflow
            if (message.startsWith('{')) {
                _this.overflow = '';
            }
            if (!message.endsWith('}')) {
                _this.overflow = `${_this.overflow}${message}`;
                return;
            } else {
                message = `${_this.overflow}${message}`;
            }
            
			try {
				// Get wiki via splitting
				const post = JSON.parse(message);
				if (post.url === '') return;

                const { type, action, url } = post;
                const wiki = _this._cleanWiki(post.url);
                const trigger = `${wiki}:${PLATFORM_TYPE[type]}:${action}`;

                if (_this.wikiactions.has(trigger)) {
                    _this.publisher.send('find:wiki-trigger-match', {
                        wiki,
                        type,
                        action,
                        trigger,
                        url
                    });
                }
			} catch (e) {
                console.log(e);
                console.log(message);
			}
		});
	}
}

module.exports = {
    FindIRC,
    PLATFORM_TYPE
};