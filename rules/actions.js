'using strict';

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
            case 'reply':
                return this.reply(trigger, post, action);
            case 'lock':
                return this.lock(trigger, post);
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
        return new Promise().reject();
    }
    
    async lock(trigger, post) {
        const { wiki, type } = trigger;
        switch (type) {
            case 'discussion-thread':
                return this.DApi.lockThread(wiki, post.id);
        }
        return new Promise().reject();
    }

    async reply(trigger, post, action) {
        const { wiki, type } = trigger;
        const { siteId } = post;
        switch (type) {
            case 'discussion-post':
            case 'discussion-thread':
                return this.DApi.replyString(wiki, siteId, post.threadId, action.message);
        }
        return new Promise().reject();
    }

    async replyJson(trigger, post, action) {
        const { wiki, type } = trigger;
        const { siteId } = post;
        switch (type) {
            case 'discussion-post':
            case 'discussion-thread':
                return this.DApi.replyJsonModel(wiki, siteId, post.threadId, action.jsonModel, action.jsonBody);
        }
        return new Promise().reject();
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
        return new Promise().reject();
    }
}

module.exports = FindActions;