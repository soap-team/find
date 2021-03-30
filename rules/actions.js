'using strict';

class FindActions {
    constructor(discussionsApi) {
        this.DApi = discussionsApi;
    }
    
    async delete(wikiTriggerData, postData) {
        const { deletePost, deleteThread } = this.DApi;
        const { wiki, type } = wikiTriggerData;
        switch (type) {
            case 'discussion-post':
                return deletePost(wiki, postData.id);
            case 'discussion-thread':
                return deleteThread(wiki, postData.id);
        }
    }

    async logDiscord(wikiTriggerData, action) {
        
    }
}

module.exports = FindActions;