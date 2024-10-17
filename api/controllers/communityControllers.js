const communityService = require('../services/communityServices');

async function postCommunity(req, res){
    const user_id = req.userId;
    const {name, description} = req.body;
    const thumbnail = req.file;
    try{
        const postResult = await communityService.createCommunity(user_id, {name, description, thumbnail});
        return res.status(200).json({message: "Community has been created.", postResult});
    }catch(error){
        return res.status(500).json({message: "Could not create community."});
    }
}

async function getCommunitiesByUserId(req, res){
    const user_id = req.params.id;
    try{
        const communities = await communityService.fetchCommunitiesByUserId(user_id);
        return res.status(200).json({communities});
    }catch(error){
        console.log(error);
        return res.status(500).json({message: "Could not fetch communities."});
    }
}

module.exports = {
    postCommunity,
    getCommunitiesByUserId
}