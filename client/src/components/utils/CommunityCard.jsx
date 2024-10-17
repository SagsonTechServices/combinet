import React from "react";

function CommunityCard({community}) {
  return (
    <div className="card lg:card-side bg-base-100 shadow-xl px-4">
      <figure>
        <img
          src={community.thumbnail}
          alt="Album"
          className="object-cover rounded-xl"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{community.name}</h2>
        <p>{community.description}</p>
        <div className="card-actions justify-start">
          <button className="btn btn-primary btn-outline w-full">Learn more</button>
        </div>
      </div>
    </div>
  );
}

export default CommunityCard;
