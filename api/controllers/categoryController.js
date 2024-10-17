const {addNewCategory, updateCategory, deleteCategory, readAllCategories, readCategoryByID} = require('../services/categoryServices');

async function addCategory(req, res){
    const name = req.body.name;
    const desc = req.body.desc;
    const image = req.file;

    try{
        const newCategory = await addNewCategory({name, desc, image});
        return res.status(200).json({message: "Category has been added", newCategory});
    }catch(error){
        console.log(error);
        return res.status(500).json({message: "failed to add the category"});
    }
}

async function update(req , res){
    const exisitingCategoryID = req.params.id;
    const {name, desc} = req.body;
    const image = req.file;
    console.log(exisitingCategoryID);
    try{
        const updateResult = await updateCategory(exisitingCategoryID, {name, desc, image});
        return res.status(200).json({message: "Category has been updated"});
    }catch(error){
        console.log(error);
        return res.status(500).json({message: "Could not update category"});
    }
}

async function del(req , res){
    const category_id = req.params.id;
    try{
        await deleteCategory(category_id);
        return res.status(200).json({message: "Category has been deleted"});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message: "Could not delete category"});
    }
}

async function readAll(req , res){
    try{
        const allCategories = await readAllCategories();
        return res.status(200).json({allCategories});
    }catch(error){
        console.log(error);
        return res.status(500).json({message: "Cannot read categories"});
    }
}

async function readByID(req, res){
    const category_id = req.params.id;
    try{
        const category = await readCategoryByID(category_id);
        return res.status(200).json({category});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message: "Cannot fetch the category"});
    }
}



module.exports = {addCategory, update, del, readAll, readByID};