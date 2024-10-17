import React from "react";
import { useNavigate } from "react-router-dom";

function Card2({blog}) {
    const imageURL = blog.thumbnail;
    const content = (blog.content).substr(0 , 200) + '...';
    const navigate = useNavigate();

    function redirectToBlogPage(){
        navigate('/blog' , {state: blog._id});
    }

  return (
    <div className="card card-compact bg-base-200 w-80 lg:mx-0 mx-auto shadow-xl">
      <figure>
        <img
          src={imageURL}
          alt={blog.title}
          className="h-56"
        />
      </figure>
      <div className="card-body">
        <div className="flex align-middle justify-between">
        <h2 className="card-title text-primary">{blog.title}</h2>
        <div className="badge badge-primary">{blog.category}</div>
        </div>
        <p>{content}</p>
        <div className="card-actions justify-start">
            <button className="btn btn-primary btn-sm" onClick={redirectToBlogPage}>Read more</button>
        </div>
      </div>
    </div>
  );
}

export default Card2;
