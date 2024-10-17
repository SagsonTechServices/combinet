const {
  postBlog,
  readBlogByID,
  postComment,
  saveBlog,
  unsaveBlog,
  updateBlog,
  deleteBlog,
  readAllBlogs,
  toggleLike,
  readBlogsByUserId,
} = require("../services/blogServices");
const { findUserById } = require("../services/authServices");

async function post(req, res) {
  const { title, content, category } = req.body;
  const userId = req.userId;
  const thumbnail = req.file;

  try {
    const newBlog = await postBlog(
      { title, content, category, thumbnail },
      userId
    );
    return res.status(200).json({ message: "Blog has been posted", newBlog });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "could not post the blog" });
  }
}

async function readByID(req, res) {
  const blogId = req.params.id;
  try {
    const blog = await readBlogByID(blogId);
    return res.status(200).json({ blog });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Could not fetch the blog" });
  }
}

async function update(req, res) {
  const blog_id = req.params.id;
  const { title, content } = req.body;
  try {
    const updatedBlog = await updateBlog({ title, content }, blog_id);
    return res
      .status(200)
      .json({ message: "blog has been updated", updatedBlog });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Blog could not be updated" });
  }
}

async function del(req, res) {
  const blog_id = req.params.id;
  try {
    const deletedStatus = await deleteBlog(blog_id);
    return res
      .status(200)
      .json({ message: "Blog has been deleted", deletedStatus });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Could not delete blog" });
  }
}

async function readAll(req, res) {
  try {
    const blogs = await readAllBlogs();
    return res.status(200).json({ blogs });
  } catch (error) {
    console.log(error);
    res.status(500).jsoN({ message: "Cannot fetch blogs" });
  }
}

async function changeLikes(req, res) {
  const userId = req.userId;
  const blogId = req.params.id;
  try {
    const likeResult = await toggleLike(blogId, userId);
    return res
      .status(200)
      .json({ message: "You have liked the blog", likeResult });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Unable to like the blog" });
  }
}

async function save(req, res) {
  const blog_id = req.params.id;
  const user_id = req.userId;
  let result;
  try {
    const user = await findUserById(user_id);

    if (user.saved.includes(blog_id)) {
      const result = await unsaveBlog(blog_id, user_id);
      return res.status(200).json({ message: "Unsaved.", result });
    }

    const result = await saveBlog(blog_id, user_id);
    return res.status(200).json({ message: "Saved.", result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Unable to save the blog" });
  }
}

async function addComment(req, res) {
  const comment_text = req.body.comment_text;
  const user_id = req.userId;
  const blog_id = req.params.id;

  try {
    const postResult = await postComment(blog_id, user_id, comment_text);
    return res.status(200).json({ message: "Comment posted", postResult });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Cannot post comment" });
  }
}

async function readByUserId(req, res){
    const user_id = req.params.id;
    try{
        const blogs = await readBlogsByUserId(user_id);
        return res.status(200).json({blogs});
    }catch(error){
        return res.status(500).json({message: "Cannot fetch blogs"});
    }
}

module.exports = {
  post,
  readByID,
  update,
  del,
  readAll,
  changeLikes,
  save,
  addComment,
  readByUserId
};
