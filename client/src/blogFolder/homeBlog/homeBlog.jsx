import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './HomeBlog.css';

const HomeBlog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get('https://blog-app-2-f51u.onrender.com/blog')
      .then((res) => {
        if (res.data && res.data.blogs) {
          setBlogs(res.data.blogs);
        } else {
          setBlogs([]); 
        }
      })
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://blog-app-2-f51u.onrender.com/blog/delete/${id}`);
      setBlogs((prevBlogs) => prevBlogs.filter(blog => blog._id !== id));
    } catch (error) {
      console.error("Failed to delete blog:", error);
    }
  };

  return (
    <div className='home'>
      <div className='home-head'>
        <h2>Blog Posts</h2>
        <div>
        <Link to="/create-blog" className='btn'>Create Blog</Link>
        <Link to="/" className='btn'>LogOut</Link>
        </div>
      </div>
      <div className='blog-grid'>
        {blogs && blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog._id} className='blog-card'>
              <img src={blog.image} alt={blog.title} className='blog-image'/>
              <h3>{blog.title}</h3>
              <p>{blog.content.slice(0, 100)}...</p>
              <div className='blog-buttons'>
                <Link to={`/edit-blog/${blog._id}`} className='btn'>Edit</Link>
                <button onClick={() => handleDelete(blog._id)} className='btn delete'>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No blogs available.</p>
        )}
      </div>
    </div>
  );
};

export default HomeBlog;


