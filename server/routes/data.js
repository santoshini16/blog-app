import express from "express";
import BlogModel from "../model/Blog.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // Fetch all blogs from the database
    const blogs = await BlogModel.find();
    res.status(200).json({ blogs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/read/:id", async (req, res) => {
  const { id } = req.params; // Extract the blog ID from the URL parameter
  try {
    // Find the blog by its ID
    const blog = await BlogModel.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    // Return the blog data if found
    res.status(200).json({ blog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}); 

router.post("/create", async (req, res) => {
  const { title, image, content, author } = req.body;
  console.log(req.body)
  try {
    const blog = new BlogModel({ title, image, content, author });
    await blog.save();
    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  console.log("Attempting to delete blog with ID:", id); // Log the ID for debugging
  try {
    const blog = await BlogModel.findByIdAndDelete(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "Blog Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { title, image, content } = req.body;
  try {
    const blog = await BlogModel.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    blog.title = title || blog.title;
    blog.image = image || blog.image;
    blog.content = content || blog.content;

    await blog.save();
    res.status(200).json({ message: "Blog Updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
