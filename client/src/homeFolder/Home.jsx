import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import "./home.css";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
         <div style={{display:"flex", justifyContent:"space-around", alignItems:"center"}}>
         <h2 style={{ marginTop: '20px' }}>Blog Posts</h2>
        
        {/* Search Box */}
        <input
          type="text"
          placeholder="Search by title or author"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-box"
          style={{height:"30px",background:"linear-gradient(135deg,#004e92, #000428)"}}
        />
         </div>

        <div className="blog-grid">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <div key={blog._id} className="blog-card">
                <img src={blog.image} alt={blog.title} className="blog-image" />
                <h3>{blog.title}</h3>
                <p>{blog.author}</p>
                <div className="blog-buttons">
                  <Link to={`/read-blog/${blog._id}`} className="btn">Read More...</Link>
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

