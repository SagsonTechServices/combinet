const Blog = require('../models/Blog');
const User = require('../models/User');
const {readCategoryByID} = require('../services/categoryServices');
const {uploadImageToFirebase} = require('../utils/firebaseUtils');

async function postBlog(blog , userId){
    const {title , content, category, thumbnail} = blog;
    try{
        const fetchedCategory = await readCategoryByID(category);
        const categoryName = fetchedCategory.name;
        const imageURL = await uploadImageToFirebase(thumbnail);

        const newBlog = await Blog.create({
            title: title,
            content: content,
            author: userId,
            category: categoryName,
            categoryId: category,
            thumbnail: imageURL
        });
        return newBlog;
    }catch(error){
        throw error;
    }
}

async function readBlogByID(blogID){
    try{
        const blog = await Blog.findById(blogID);
        return blog;
    }catch(error){
        throw error;
    }
} 

async function updateBlog(blog, blog_id){
    const {title , content} = blog;
    let queryParam = !content ? {"title" : title, "updatedAt": Date.now()} : {"content" : content, "updatedAt" : Date.now()};
    try{
        let updatedBlog = await Blog.findById(blog_id).updateOne(queryParam);
        return updatedBlog;
    }
    catch(error){
        throw error;
    }
}

async function deleteBlog(blog_id){
    try{
        const deletedStatus = await Blog.findByIdAndDelete(blog_id);
        return deletedStatus;
    }
    catch(error){
        throw error;
    }
}

async function readAllBlogs(){
    try{
        const blogs = await Blog.find();
        return blogs;
    }
    catch(error){
        throw error;
    }
}

async function toggleLike(blogId, userId){
    try{
        const blog = await readBlogByID(blogId);
        if(!blog){
            throw new Error('Blog not found');
        }
        const hasLiked = blog.likes.likedBy.includes(userId);
        if(hasLiked){
            blog.likes.count -= 1;
            blog.likes.likedBy = blog.likes.likedBy.filter((id) => id !== userId);
        }
        else{
            blog.likes.count += 1;
            blog.likes.likedBy.push(userId);
        }
        const result = await blog.save();

        return result
    }catch(error){
        throw error;
    }
}

async function saveBlog(blog_id, user_id){
    try{
        const user = await User.findById(user_id);
        user.saved.push(blog_id);

        const result = await user.save();
        return result;
    }catch(error){
        throw error;
    }
}

async function unsaveBlog(blog_id, user_id){
    try{
        const user = await User.findById(user_id);
        user.saved = user.saved.filter((id) => id.toString === blog_id);

        const result = await user.save();
        return result;
    }catch(error){
        throw error;
    }
}

async function postComment(blog_id, user_id, comment_text){
    try{
        const user = await User.findById(user_id);
        const blog = await Blog.findById(blog_id);
        const comment = {
            text: comment_text,
            commentor: user.username
        };
        blog.comments.push(comment);

        const result = await blog.save();
        return result;
    }catch(error){
        throw error;
    }
}

async function readBlogsByUserId(user_id){
    try{
        const blogs = await Blog.find({author: user_id});
        return blogs;
    }catch(error){
        throw error;
    }
}

module.exports = {postBlog, postComment, readBlogByID, updateBlog, deleteBlog, readAllBlogs, toggleLike, saveBlog, unsaveBlog, 
    readBlogsByUserId
};