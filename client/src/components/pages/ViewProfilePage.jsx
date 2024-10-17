import React from "react";
import { useLocation } from "react-router-dom";
import UserDetails from "../app/UserDetails";
import UserTabs from "../app/UserTabs";

function ViewProfilePage() {
  const location = useLocation();
  const user = location.state.poster;
  return (
    <div className="container max-w-screen-2xl lg:px-20 px-4 lg:my-16 my-32">
      <UserDetails user={user}></UserDetails>
      <div className="lg:w-2/3 mx-auto rounded-xl my-3">
      <UserTabs user={user}></UserTabs>
      </div>
    </div>
  );
}

export default ViewProfilePage;
