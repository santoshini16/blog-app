import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import './EditBlog.css';
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({ title: '', content: '', image: '', author: '' });
  const navigate = useNavigate(); 
  useEffect(() => {
    axios.get(`https://blog-app-2-f51u.onrender.com/blog/${id}`).then(res => setBlog(res.data.blog));
  }, [id]);

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://blog-app-2-f51u.onrender.com/blog/update/${id}`, blog);
      toast.success("Blog updated successfully");
      setTimeout(() => {
        navigate("/home");
      }, 5000);
    } catch (error) {
      console.error("Failed to update blog:", error);
    }
  };

  return (
    <div className='edit-blog'>
      <h2>Edit Blog</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" name="title" value={blog.title} onChange={handleChange} />
        <input type="text" placeholder="Image URL" name="image" value={blog.image} onChange={handleChange} />
        <textarea name="content"  placeholder="Content" value={blog.content} onChange={handleChange}></textarea>
        <button type="submit" className='btn'>Update</button>
      </form>
    </div>
  );
};

export default EditBlog;
