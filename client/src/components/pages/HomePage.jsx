import React from 'react'
import axios, { all } from 'axios'
import { useState, useEffect } from 'react'
import Categories from '../app/Categories'
import Blogs from '../app/Blogs';

function HomePage() {
  const [categories, setCategories] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  function filterBlogs(event){
    let filtered = blogs;
    const category = event.target.innerText;
    if(category !== 'All'){
      filtered = blogs.filter((blog) => {return blog.category === category});
    }
    setFilteredBlogs(filtered);
  }

  useEffect(() => {
    async function fetchCategories(){
      const response = await axios.get(`${backendURL}/api/category/get-all`);
      const allCategories = response.data.allCategories;
      setCategories(allCategories);
    }

    async function fetchBlogs(){
      const response = await axios.get(`${backendURL}/api/blog/get-all`);
      const allBlogs = response.data.blogs;
      setBlogs(allBlogs);
      setFilteredBlogs(allBlogs);
    }
    fetchCategories();
    fetchBlogs();
  }, [])

  return (
    <div className='container max-w-screen-2xl lg:px-20 px-3 lg:my-6 my-20'>
      <Categories categories={categories} clickHandler={filterBlogs}></Categories>
      <Blogs blogs={filteredBlogs}></Blogs>
    </div>
  )
}

export default HomePage
