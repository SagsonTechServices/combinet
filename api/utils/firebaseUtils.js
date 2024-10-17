const {storage, auth} = require('../config/firebase.config');
const {v4: uuidv4} = require('uuid');
const {ref, getDownloadURL, uploadBytes, deleteObject} = require('firebase/storage');
const { signInWithEmailAndPassword } = require('firebase/auth');

function getImagePathFromURL(url) {
    const path = url.split('/o/')[1].split('?')[0]; // Extract path and remove query params
    return decodeURIComponent(path); // Decode URL-encoded characters (e.g., %2F -> /)
}

async function authUser(){
    try{
        const authStatus = await signInWithEmailAndPassword(auth, "sagsontech26@gmail.com", "Syed123*");
        return authStatus;
    }catch(error){
        throw error;
    }
}

async function uploadImageToFirebase(file){
    const filename = `${uuidv4()}_${file.originalname}`;
    const storageRef = ref(storage, `images/${filename}`);

    const metadata = {
        contentType: file.mimetype
    }

    try{
        await authUser();
        await uploadBytes(storageRef, file.buffer, metadata);
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
    }catch(error){
        throw error;
    }
}

async function deleteImageFromFirebase(filename){
    console.log(filename);
    const storageRef = ref(storage , filename);
    try{
        await authUser();
        const deleteResult = await deleteObject(storageRef);
        return deleteResult;
    }catch(error){
        throw error;
    }
}

async function updateImageInFirebase(exisitingImage , newImage){
    const exisitingImageName = getImagePathFromURL(exisitingImage);
    // delete the exisiting image
    try{
        await deleteImageFromFirebase(exisitingImageName);
        console.log("image deleted");

        // add new image 
        const downloadURL = await uploadImageToFirebase(newImage);
        return downloadURL;
    }catch(error){
        throw error;
    }
}

module.exports = {uploadImageToFirebase, updateImageInFirebase, deleteImageFromFirebase, getImagePathFromURL}