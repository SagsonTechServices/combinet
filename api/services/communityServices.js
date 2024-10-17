const Community = require('../models/Community');
const User = require('../models/User');
const firebaseUtils = require('../utils/firebaseUtils');

async function createCommunity(user_id, community){
    const {name, description, thumbnail } = community;
    try{
        const user = await User.findById(user_id);

        const image = await firebaseUtils.uploadImageToFirebase(thumbnail);
        const result = await Community.create({
            name: name,
            description: description,
            thumbnail: image,
            admin: user_id
        });

        user.created_communities.push(result._id);
        await user.save();
        
        return result;
    }catch(error){
        throw error;
    }
}

async function fetchCommunitiesByUserId(user_id){
    try{
        const communities = await Community.find({admin: user_id});
        return communities;
    }catch(error){
        throw error
    }
}

module.exports = {
    createCommunity,
    fetchCommunitiesByUserId
}