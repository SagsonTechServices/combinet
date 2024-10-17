import axios from "axios";
import React, { useState } from "react";
import AlertSuccess from "../utils/AlertSuccess";
import AlertError from "../utils/AlertError";

function TextEditor({ user, categories }) {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState({
    id: "",
    name: "",
  });
  const [thumbnail, setThumbnail] = useState('');
  const [displaySuccessAlert, setDisplaySuccessAlert] = useState(false);
  const [displayErrorAlert, setDisplayErrorAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!thumbnail){
      setDisplayErrorAlert(true);
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('file', thumbnail);
    formData.append('title', title);
    formData.append('content', value);
    formData.append('category', category.id);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/blog/post`, 
        formData,
        {
         headers: {
          "Authorization": `Bearer ${user}`,
          "Content-Type": 'multipart/form-data'
         } 
        }
      )
      if(displayErrorAlert){setDisplayErrorAlert(false)}
      setDisplaySuccessAlert(true);
    }catch(error){
      console.log(error);
    }finally{
      setLoading(false);
      setTitle('');
      setValue('');
      setCategory({id: "", name: ""})
      setThumbnail('');
    }
  };

  function handleCategoryChange(event) {
    const selectedId = event.target.value;
    const selectedCategory = categories.find(
      (cat) => cat._id === selectedId
    )?.name;

    setCategory({ id: selectedId, name: selectedCategory });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="lg:w-2/3 rounded-xl shadow-xl mx-auto px-6 py-3"
    >
      {loading && <div className="loading loading-spinner text-primary loading-lg text-center block mx-auto my-4"></div>}
      {displaySuccessAlert && <AlertSuccess text={'Your blog has been posted successfully ✅'}></AlertSuccess>}
      {displayErrorAlert && <AlertError text={'Kindly upload a thumbnail for your blog 🤦🏻'}></AlertError>}
      <div className="grid lg:grid-cols-2 grid-cols-1 space-y-4 lg:space-y-0 gap-4 my-10">
        <div className="w-full">
          <label className="label-text text-primary font-bold block">
            Blog Title
          </label>
          <input
            type="text"
            placeholder="Enter your blog's title"
            className="input input-bordered input-primary w-full"
            value={title}
            required={true}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>

        <div className="w-full">
          <label className="label-text text-primary font-bold block">
            Select a category for your blog
          </label>
          <select
            className="select select-primary w-full"
            value={category.id}
            onChange={handleCategoryChange}
          >
            <option value="">Select category</option>
            {categories.map((cat) => {
              return (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div className="my-4">
      <label className="label-text text-primary font-bold block">
          Add a thumbnail to your blog
        </label>
        <input
          type="file"
          className="file-input file-input-bordered file-input-primary w-full"
          onChange={(event) => {setThumbnail(event.target.files[0])}}
          accept="image/*"
        />
      </div>

      <div className="my-6">
        <label className="label-text text-primary font-bold block">
          Write a blog
        </label>
        <textarea
          className="textarea textarea-primary w-full"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          rows={8}
          placeholder="Your blog..."
        ></textarea>
      </div>

      <button type="submit" disabled={loading ? true : false} className="btn btn-primary block mx-auto my-5">
        {`${loading ? 'posting...' : 'post'}`}
      </button>
    </form>
  );
}

export default TextEditor;
