import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { ImCancelCircle } from "react-icons/im";
import { editorContext } from "./Editor";
import Tags from "./Tags";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";


const BlogPublish = () => {
  const navigate=useNavigate()
  const characterLength = 200;
   const{authtoken}=useContext(AuthContext)
  const tagLimit = 10;
  const {
    setEditorState,
    blog,
    setBlog,
    blog: { title, banner, tags, description,content, draft , activity},
  } = useContext(editorContext);

  const handleCancel = () => {
    setEditorState("editor");
  };

  const handleBlogTitleChange = (e) => {
    setBlog({ ...blog, title: e.target.value });
  };
  const handleDescriptionChange = (e) => {
    setBlog({ ...blog, description: e.target.value });
  };

  const handleTagKeyDown = (e) => {
    if (e.keyCode == 13 || e.keyCode == 188) {
      e.preventDefault();
      let tag = e.target.value;

      if (tags.length < tagLimit) {
        if (!tags.includes(tag) && tag.length) {
          setBlog({ ...blog, tags: [...tags, tag] });
        }
      } else {
        toast.error("tag limit is over");
      }
      e.target.value = "";
    }
  };
  const handleSubmit = async () => {
    let blogObj={
      title,banner, tags, description,content,draft:false, activity:[]}
    
     
    try {
      const response = await axios.post(
        "http://localhost:3000/api/createBlog",
        blogObj,
        { 
           headers:{
             "Authorization":`Bearer ${authtoken}`
           },
           withCredentials: true,
          }
        
      );
      console.log(response.data);
      toast.success("blog published");
      
      setTimeout(() => {
        navigate("/Dashboard")
      }, 500);
      
    } catch (error) {
      console.error("error creating blog", error);
      toast.error("can't publish blog");
    }
  }

  const handleKeyDown = (e) => {
    if (e.keyCode == 13) {
      e.preventDefault();
    }
  };
  return (
    <>
      <section className="w-screen min-h-screen grid items-center lg:grid-cols-2  lg:gap-4 py-16">
        <Toaster />
        <button
          className="w-12 h-12 absolute right-[5vw] z-10 top-[5%] lg:top[10%]"
          onClick={handleCancel}
        >
          <ImCancelCircle />
        </button>

        <div className="max-w-[550px] block mx-auto">
          <p className="text-gray-700  text-3xl  text-center pb-10 top-0 font-medium mb-1">Preview</p>

          <div className="w-full aspect-video rounded-lg overflow-hidden bg-gray-300 mt-4 ">
            <img src={banner} />
          </div>
          <h1 className="text-4xl font-medium mt-2 leading-tight line-clamp-2">
            {title}
          </h1>
          <p className="font-gelasio line-clamp-2 text-xl leading-7 my-4">
            {description}
          </p>
        </div>

        <div className="  border-grey lg:border-1 pl-4 lg:pl-8 ">
          <p className="text-gray-500 ">Blog Title</p>
          <input
            type="text"
            placeholder="title"
            defaultValue={title}
            onChange={handleBlogTitleChange}
            className=" w-full  mr-8  bg-gray-200 h-12 rounded-lg  pl-4"
          />

          <p className="text-gray-500 ">Blog Description</p>
          <textarea
            className="bg-gray-200 pl-4 rounded-lg h-40  w-full resize-none leading-7"
            maxLength={characterLength}
            placeholder="short description of your blog"
            defaultValue={description}
            onKeyDown={handleKeyDown}
            onChange={handleDescriptionChange}
          ></textarea>
          <p className="text-right text-sm mt-1  text-gray-400">
            {characterLength - description.length} characters left
          </p>

          <p className="text-gray-800  mb-2 mt-9">
            Topics-(Helps is searching and ranking your blog)
          </p>
          <div className="relative bg-gray-200  pl-2 py-2 pr-4 flex flex-wrap">
            <input
              type="text"
              placeholder="Topic"
              className="sticky  p-2 w-full"
              onKeyDown={handleTagKeyDown}
            />
            {tags.map((tag, i) => (
              <Tags tag={tag} key={i} />
            ))}
          </div>
          <button
            className="border p-2 mt-2 rounded-lg bg-black text-white hover:bg-white hover:text-black"
            onClick={handleSubmit}
          >
            Publish
          </button>
        </div>
      </section>
    </>
  );
};

export default BlogPublish;
