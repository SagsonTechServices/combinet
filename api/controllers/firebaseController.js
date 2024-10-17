const firebaseUtils = require('../utils/firebaseUtils');

async function postImage(req, res){
    const image = req.file;
    try{
        const imageUrl = await firebaseUtils.uploadImageToFirebase(image);
        return res.status(200).json({message: "Image has been uploaded", imageUrl});
    }catch(error){
        console.log(error);
        return res.status(500).json({message: "Image could not be uploaded to the cloud."});
    }
}

module.exports = {
    postImage
};