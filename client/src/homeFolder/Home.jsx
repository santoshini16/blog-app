import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import "./home.css"

//twill0 = L511X4FKR4CXU7X4HVNKJRH5

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/blog')
      .then((res) => {
        if (res.data && res.data.blogs) {
          setBlogs(res.data.blogs);
        } else {
          setBlogs([]); 
        }
      })
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);
  return (
    <>
      <div className="home">
        <div className="nav">
          <h4>
            My<em>Blog</em>
          </h4>
          <Link to="/signup">Signup Now</Link>
        </div>
        <div className="lower">
          <p>The Home for Best Blog, <em>Signup Now!</em></p>
        </div>
        <div className="body">
          <img src="/blog.svg" alt="" />
        </div>
        <h2 style={{marginTop:'20px'}}>Blog Posts</h2>
        <div className='blog-grid'>
        {blogs && blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog._id} className='blog-card'>
              <img src={blog.image} alt={blog.title} className='blog-image'/>
              <h3>{blog.title}</h3>
              <p>{blog.content.slice(0, 100)}...</p>
              <div className='blog-buttons'>
                <Link to={`/read-blog/${blog._id}`} className='btn'>Read More...</Link>
              </div>
            </div>
          ))
        ) : (
          <p>No blogs available.</p>
        )}
      </div>
      </div>
    </>
  );
};

export default Home;
