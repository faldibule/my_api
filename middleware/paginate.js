const paginate = {
    home: async (model, currentPage, currentLimit) =>{
        const page = currentPage || 1;
        const limit = currentLimit || 3;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const result = {}
        result.currentPage = page;
        result.message = 'Data'
        result.totalPage = Math.ceil(await model.countDocuments() / limit)
        result.data = await model.find()
            .skip(startIndex)
            .limit(limit)
            .sort({ _id: -1 })
            .populate({ path: 'user', select: ['email', 'nama', 'username', 'image']})
            .exec();
        if(endIndex < await model.countDocuments()){
            result.next = {
                page: page + 1,
                limit
            }
        }
        if(startIndex > 0){
            result.previous = {
                page:page - 1,
                limit
            }
        }
        return result;
    },

    userPost: async (model, currentPage, currentLimit, userId) =>{
        const page = currentPage || 1;
        const limit = currentLimit || 3;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const result = {}
        result.currentPage = page;
        result.message = 'Data'
        result.totalPage = Math.ceil(await model.countDocuments({user: userId}) / limit)
        result.data = await model.find({user: userId})
            .skip(startIndex)
            .limit(limit)
            .sort({ _id: -1 })
            .populate({ path: 'user', select: ['email', 'nama', 'username', 'image']})
            .exec();
        if(endIndex < await model.countDocuments({user: userId})){
            result.next = {
                page: page + 1,
                limit
            }
        }
        if(startIndex > 0){
            result.previous = {
                page:page - 1,
                limit
            }
        }
        return result;
    },

    comment: async (model, currentPage, currentLimit, postId) =>{
        const page = currentPage || 1;
        const limit = currentLimit || 3;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const result = {}
        result.currentPage = page;
        result.message = 'Data'
        result.totalPage = Math.ceil(await model.countDocuments({post: postId}) / limit)
        result.data = await model.find({post: postId})
            .skip(startIndex)
            .limit(limit)
            .sort({ _id: -1 })
            .populate({ path: 'user', select: ['email', 'nama', 'username', 'image']})
            .exec();
        if(endIndex < await model.countDocuments({post: postId})){
            result.next = {
                page: page + 1,
                limit
            }
        }
        if(startIndex > 0){
            result.previous = {
                page:page - 1,
                limit
            }
        }
        return result;
    },
}

module.exports = paginate