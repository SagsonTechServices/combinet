import React from "react";

function Card1({category, clickHandler}) {
    return(
        <button className="btn bg-gray-500 text-white hover:bg-gray-600 btn-sm" onClick={clickHandler}>{category}</button>
    );
}

export default Card1;
