import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ReadBlog.css';

const ReadBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [tags, setTags] = useState(["food", "fitness", "travel", "lifestyle", "technology"]); // Display all keywords as tags
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the specific blog post by ID
    axios.get(`http://localhost:5000/blog/read/${id}`)
      .then((res) => {
        if (res.data && res.data.blog) {
          setBlog(res.data.blog);
        }
      })
      .catch((error) => {
        console.error("Error fetching blog:", error);
      });
  }, [id]);

  if (!blog) {
    return <p>Loading...</p>;
  }

  return (
    <div className="read-blog">
      <div className="content-container">
        <div className="blog-container">
          <h1>{blog.title}</h1>
          <p style={{ marginBottom: "10px", color: "white" }}>Author: {blog.author}</p>
          <img src={blog.image} alt={blog.title} className="blog-image" />
          <p className="blog-content">{blog.content}</p>
          <div className="back-button">
            <button onClick={() => navigate('/')}>Back to Home</button>
          </div>
        </div>

        {/* Tags Section */}
        <div className="tags-card">
          <h3>Read More Blog Posts Based on Tags</h3>
          <div className="tags">
            {tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadBlog;



