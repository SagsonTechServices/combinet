const Category = require('../models/Category');
const {uploadImageToFirebase, updateImageInFirebase, deleteImageFromFirebase, getImagePathFromURL} = require('../utils/firebaseUtils');

async function addNewCategory(category){
    const {name, desc, image} = category;

    try{
        const imageURL = await uploadImageToFirebase(image);

        const newCategory = await Category.create({
            name: name,
            desc: desc,
            image: imageURL
        });

        return newCategory;
    }catch(error){
        throw error;
    }
}

async function updateCategory(category_id, newCategory){
    try{
        const exisitingCategory = await Category.findById(category_id);
        const exisitingImage = exisitingCategory.image;
        const newImage = newCategory.image;
        try{
            const updatedImageURL = await updateImageInFirebase(exisitingImage, newImage);
            const updatedResult = await exisitingCategory.updateOne({"name": newCategory.name, "desc": newCategory.desc, "image": updatedImageURL});
            return updatedResult;
        }catch(error){
            throw error;
        }
    }catch(error){
        throw error;
    }
}

async function deleteCategory(category_id){
    try{
        const exisitingCategory = await Category.findById(category_id);
        const deleteStatus = await deleteImageFromFirebase(getImagePathFromURL(exisitingCategory.image)); 
        await Category.findByIdAndDelete(category_id);
        return deleteStatus;
    }catch(error){
        throw error;
    }
}

async function readCategoryByID(categoryID){
    try{
        const category = await Category.findById(categoryID);
        return category;
    }
    catch(error){
        throw error;
    }
}

async function readAllCategories(){
    try{
        const allCategories = await Category.find();
        return allCategories;
    }catch(error){
        throw error;
    }
}

module.exports = {addNewCategory, readCategoryByID, updateCategory, deleteCategory, readAllCategories};