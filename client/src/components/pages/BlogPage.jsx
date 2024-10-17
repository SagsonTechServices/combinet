import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import loginIcon from "../../assets/images/icons/loginIcon.png";
import like from "../../assets/images/icons/likeIcon.png";
import comment from "../../assets/images/icons/chat.png";
import share from "../../assets/images/icons/share.png";
import save from "../../assets/images/icons/bookmark.png";
import liked from "../../assets/images/icons/liked.png";
import { useSelector } from "react-redux";
import Comments from "../app/Comments";

function BlogPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({});
  const [poster, setPoster] = useState({});
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  let { user } = useSelector((state) => state.user);
  
  const [comment_text, setCommentText] = useState('');
  const commentsRef = useRef(null);

  useEffect(() => {
    async function fetchBlog() {
      const blog = await axios.get(
        `${backendURL}/api/blog/get/${location.state}`
      );
      const response = await axios.get(
        `${backendURL}/api/auth/get/${blog.data.blog.author}`
      );
      console.log(response.data.user);
      setPoster(response.data.user);
      setBlog(blog.data.blog);
    }

    fetchBlog();
  }, [location.state]);

  async function onToggleLikeBtn() {
    console.log(user);
    if (!user) {
      navigate("/login");
      return;
    }
    const response = await axios.get(
      `${backendURL}/api/blog/toggle-like/${blog._id}`,
      {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      }
    );
    setBlog(response.data.likeResult);
  }

  async function handleOnSave() {
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      const response = await axios.get(
        `${backendURL}/api/blog/save-blog/${blog._id}`,
        {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        }
      );
      alert(response.data.message);
    } catch (error) {
      alert(error.data.response.message);
    }
  }

  function handleOnCommentTextChange(event){
    setCommentText(event.target.value);
  }

  async function handleOnCommentPost(){
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      console.log(user);
      const response = await axios.post(
        `${backendURL}/api/blog/post-comment/${blog._id}`,
        {comment_text} ,
        {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        }
      );
      alert(response.data.message);
      setBlog(response.data.postResult);
    } catch (error) {
      alert(error.data.response.message);
    }
  }

  function handleOnCommentsScroll(){
    if(commentsRef.current){
      commentsRef.current.scrollIntoView({behavior: "smooth"});
    }
  }

  function handleOnStalkClick(){
    navigate('/view-profile', {state: {
      poster
    }})
  }

  return (
    <div className="container max-w-screen-2xl md:px-20 px-4 lg:my-10 my-20">
      <div className="grid lg:grid-cols-12 grid-cols-1">
        <div className="col-span-9 lg:order-1 order-2">
          <h1 className="text-4xl text-primary font-bold my-2">{blog.title}</h1>
          <div className="badge badge-primary">{blog.category}</div>
        </div>
        <div className="flex mt-6 gap-2 col-span-3 lg:order-2 order-1">
          <div className="text-center text-primary font-bold">
            <button className="btn btn-circle btn-accent" onClick={handleOnStalkClick}>
              <img src={loginIcon} className="w-8" />
            </button>
            <label className="block">Stalk</label>
          </div>
          <div className="text-center text-primary font-bold">
            <button className="btn btn-circle btn-accent">
              <img src={share} className="w-8" />
            </button>
            <label className="block">Share</label>
          </div>
          <div className="text-center text-primary font-bold">
            <button
              className="btn btn-circle btn-accent"
              onClick={handleOnSave}
            >
              <img src={save} className="w-8" />
            </button>
            <label className="block">Save</label>
          </div>
          <div className="text-center text-primary font-bold">
            <button
              className="btn btn-circle btn-accent"
              onClick={onToggleLikeBtn}
            >
              <img src={like} className="w-8" />
            </button>
            <label className="block">{blog.likes?.count || 0}</label>
          </div>
          <div className="text-center text-primary font-bold">
            <button className="btn btn-circle btn-accent" onClick={handleOnCommentsScroll}>
              <img src={comment} className="w-8" />
            </button>
            <label className="block">17</label>
          </div>
        </div>
      </div>
      <p className="text-lg my-3 text-justify">{blog.content}</p>
      <img src={blog.thumbnail} className="w-full my-5 rounded-xl" />

      <div className="my-5" ref={commentsRef}>
        <h1 className="text-2xl text-primary">Comments</h1>
        <div className="my-3 grid grid-cols-12 gap-3">
          <input
            type="text"
            placeholder="Comment something..."
            className="input input-bordered input-primary col-span-10"
            value={comment_text}
            onChange={handleOnCommentTextChange}
          />
          <button className="col-span-2 btn btn-primary" onClick={handleOnCommentPost}>Add</button>
        </div>
        <Comments comments={blog?.comments || []}></Comments>
      </div>
    </div>
  );
}

export default BlogPage;
