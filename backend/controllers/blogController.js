const BlogPost = require("../models/blogPost");
const Authentication = require("../middleware/authenticateUser");

const createBlog = async (req, res) => {
  console.log("Authenticated User:", req.user);
  console.log("id:", req.user._id);

  const { title, content, description, author, banner, tags, activity, draft } =
    req.body;

  const newPost = new BlogPost({
    title,
    content,
    description,
    author: req.user._id,
    tags,
    banner,
    activity,
    draft,
  });

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating new blog:", error);
    res.status(401).json({ error: "Error Creating new Blog" });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ error: "error getting users" });
  }
};

//get latest blogs
const getLatest = async (req, res) => {
  try {
    const posts = await BlogPost.find({ draft: false })
      .populate("author", "fullname username _id")
      .sort({ createdAt: -1 })
      .select("blog_id title description activity tags banner  createdAt")
      .limit(10);
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get trending blogs
const getTrendingBlogs = async (req, res) => {
  try {
    const posts = await BlogPost.find({ draft: false })
      .populate("author", "fullname username _id")
      .select("blog_id title  activity  createdAt ")
      .sort({
        "activity.totalReads": -1,
        "activity.totalLikes": -1,
        createdAt: -1,
      })
      .limit(6);
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//search
const searchBlog = async (req, res) => {
  const { tag } = req.body;
  const findQuery = { tags: tag, draft: false };
  try {
    const posts = await BlogPost.find(findQuery)
      .populate("author", "fullname username -_id")
      .select("blog_id title description activity tags banner createdAt")
      .limit(5);
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getMyBlogs = async (req, res) => {
  try {
    const userId = req.user.id; 

    const blogs = await BlogPost.find({ author: userId })
      .select("title description createdAt tags banner")
      .populate("author", "fullname username _id");

    if (!blogs.length) {
      return res.status(404).json({ message: "No blogs found" });
    }
    

    res.status(200).json({ blogs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports = {
  createBlog,
  getPosts,
  getLatest,
  getTrendingBlogs,
  searchBlog,
  getMyBlogs,
};
