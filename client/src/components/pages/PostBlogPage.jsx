import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import TextEditor from '../app/TextEditor';
import axios from 'axios';

function PostBlogPage() {
  const {user} = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(user);
    if(user === undefined){return;}
    async function fetchCategories(){
      try{
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/category/get-all`);
        console.log(response.data.allCategories);
        setCategories(response.data.allCategories);
      }catch(error){
        console.log(error);
      }finally{
        setIsLoading(false);
      }
    }

    if(user === null){return;}

    if(!user){
      console.log('hi')
      navigate('/login');
    }else{
      fetchCategories();
    }
  }, [user, navigate]);

  if(isLoading){
    return(
      <div className='loading loading-spinner text-primary text-center mx-auto my-20 loading-lg'></div>
    );
  }

  return (
    <div className='container max-w-screen-2xl lg:px-20 px-4 lg:my-10 my-28'>
      <h1 className='text-primary text-center text-3xl font-bold'>Write an awesome technical blog</h1>
      <div className='my-4'>
        <TextEditor user={user} categories={categories}></TextEditor>
      </div>
    </div>
  )
}

export default PostBlogPage
