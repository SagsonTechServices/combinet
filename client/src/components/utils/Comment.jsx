import React from "react";
import userIcon from "../../assets/images/icons/profile-user.png";

function Comment({ comment }) {
  return (
    <div className="mb-5 bg-base-200 rounded-xl px-5 py-3 flex-col flex-wrap align-middle h-auto justify-start space-y-3">
      <h1 className="text-primary text-lg text-bold">
        <span>
          <img src={userIcon} className="w-5 inline-block mx-3" />
        </span>
        {comment.commentor}
      </h1>
      <p>{comment.text}</p>
    </div>
  );
}

export default Comment;
