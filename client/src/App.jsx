import React from "react";
import "./App.css";
import Sidebar from "./components/static/Sidebar";
import RegisterPage from "./components/pages/RegisterPage";
import LoginPage from "./components/pages/LoginPage";
import HomePage from "./components/pages/HomePage";
import CategoriesPage from "./components/pages/CategoriesPage";
import CommunitiesPage from "./components/pages/CommunitiesPage";
import PostBlogPage from "./components/pages/PostBlogPage";
import ProfilePage from "./components/pages/ProfilePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUserFromStorage } from "./redux/features/user/userSlice";
import BlogPage from "./components/pages/BlogPage";
import ViewProfilePage from "./components/pages/ViewProfilePage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    console.log(storedUser);
    if (storedUser) {  // Check if storedUser is not null
      try {
        const parsedUser = JSON.parse(storedUser);
        dispatch(setUserFromStorage(parsedUser));
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }
  }, []);

  return (
    <Router>
      <div className="App bg-base-100 lg:grid-cols-12 lg:grid min-h-screen">
        <div className="lg:col-span-2 z-10">
          <Sidebar></Sidebar>
        </div>

        <div className="lg:col-span-10 z-20">
          <Routes>
            <Route
              path="/register"
              element={<RegisterPage></RegisterPage>}
            ></Route>
            <Route path="/login" element={<LoginPage></LoginPage>}></Route>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route
              path="/categories"
              element={<CategoriesPage></CategoriesPage>}
            ></Route>
            <Route
              path="/communities"
              element={<CommunitiesPage></CommunitiesPage>}
            ></Route>
            <Route
              path="/blog/post"
              element={<PostBlogPage></PostBlogPage>}
            ></Route>
            <Route
              path="/profile"
              element={<ProfilePage></ProfilePage>}
            ></Route>
            <Route
              path="/blog"
              element={<BlogPage></BlogPage>}
            ></Route>
            <Route
              path="/view-profile"
              element={<ViewProfilePage></ViewProfilePage>}
            ></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
