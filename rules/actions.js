'using strict';
const {
    DiscussionsApi
} = require('./api');

const DISCORD_REGEX = /discord(app)?.com\/api\/webhooks\/([^\/]+)\/([^\/]+)$/i;
class FindActions {
    constructor(discussionsApi) {
        this.DApi = discussionsApi;
    }

    actionHandler(trigger, post, action) {
        switch (action.action) {
            case 'delete':
                return this.delete(trigger, post);
            case 'log':
                return this.logDiscord(trigger, action);
        }
        return new Promise().reject();
    }
    
    async delete(trigger, post) {
        const { wiki, type } = trigger;
        switch (type) {
            case 'discussion-post':
                return this.DApi.deletePost(wiki, post.id);
            case 'discussion-thread':
                return this.DApi.deleteThread(wiki, post.id);
        }
    }

    async logDiscord(trigger, action) {
        let res = action.webhook.match(DISCORD_REGEX);
        let modifiedContent = action.content;
        if (res && res.length === 4) {
            for (const key of Object.keys(trigger)) {
                modifiedContent = modifiedContent.replace(new RegExp(`\\$${key}`, 'g'), trigger[key]);
            }
            return this.DApi.logDiscord(action.webhook, modifiedContent);
        }
    }
}

module.exports = FindActions;