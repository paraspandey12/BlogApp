import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { editorContext } from "./Editor";
import EditorJS from "@editorjs/editorjs";
import { Tools } from "./Tools";
import { AuthContext } from "../context/AuthContext";
const BlogEditor = () => {
  const {authtoken}=useContext(AuthContext)
  const [bannerUrl, setBannerUrl] = useState(null);
  const navigate= useNavigate()
  const {
    blog,
    blog: { title, banner, description, content },
    setBlog,
    textEditor,
    setTextEditor,
    setEditorState,
    draft
  } = useContext(editorContext);

  useEffect(() => {
    setTextEditor(
      new EditorJS({
        holder: "textEditor",
        data: content,
        tools: Tools,
        placeholder: "Let's write an awesome story",
      })
    );
  }, []);

  const handleBannerUpload = async (e) => {
    console.log(e);
    let img = e.target.files[0];
    if (!img) return;

    const formData = new FormData();
    formData.append("file", img);

    try {
      const loadingToast = toast.loading("uploading...");
      const response = await axios.post(
        "http://localhost:3000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data && response.data.fileUrl) {
        toast.dismiss(loadingToast);
        toast.success("uploaded!");
        setBannerUrl(response.data.fileUrl);
        setBlog({ ...blog, banner: response.data.fileUrl });
        console.log("file uploaded successfully");
      }
    } catch (error) {
      console.error("error uploading file", error);
    }
  };

  const handlePublishEvent = () => {
    if (!banner.length) {
      return toast.error("upload a blog banner to publish it");
    }
    if (!title.length) {
      return toast.error("write blog title to publish it");
    }
    if (textEditor.isReady) {
      textEditor
        .save()
        .then((data) => {
          if (data.blocks.length) {
            setBlog({ ...blog, content: data });
            setEditorState("publish");
          } else {
            toast.error("write something in your blog to publish");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const handleTitleChange = (e) => {
    const input = e.target;

    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";
    setBlog({ ...blog, title: input.value });
  };
  const handleTitleKeyDown = (e) => {
    if (e.keyCode === 13) {
      //enter key
      e.preventDefault();
    }
  };
  const handleSaveDraft = async () => {
    let blogObj = {
      title,
      banner,
      description,
      content,
      draft: true,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/createBlog",
        blogObj,
        {
          headers: {
            Authorization: `Bearer ${authtoken}`,
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      toast.success("saved Draft");
      setTimeout(() => {
        navigate("/")
      }, 500);
    } catch (error) {
      console.error("error saving blog draft", error);
      toast.error(" draft not saved");
    }
  };

  return (
    <>
      <nav className="flex items-center justify-between sticky">
        <div className="flex gap-4 items-center">
          <Link to="/" className="">
            <img className="w-24 sm:w-32 h-auto" src="download.png" />
          </Link>
          <p className="  text-2xl sm:text-3xl font-medium text-black line-clamp-1 w-full">
            {title.length ? title : "New Blog"}
          </p>
        </div>
        <div className="flex gap-4 mr-3 md:mr-8">
          <button
            onClick={handlePublishEvent}
            className="border rounded-full border-black bg-black text-white hover:bg-white hover:text-black  px-2 py-1 md:p-3 md:px-4  "
          >
            Publish
          </button>
          <button
            onClick={handleSaveDraft}
            className="border rounded-full  bg-slate-100 text-black hover:bg-white hover:text-black  px-2 py-1 md:p-3 md:px-4"
          >
            Save Draft
          </button>
        </div>
      </nav>
      <section>
        <div className="mx-auto max-w-[900px] w-full">
          <div className="relative aspect-3/2 hover:opacity-80 bg-white border-4 border-gray">
            <label htmlFor="uploadBanner">
              <img src={banner || "blog banner.png"} className="z-20" />
              <input
                id="uploadBanner"
                type="file"
                accept=".png,.jpg,.jpeg"
                hidden
                onChange={handleBannerUpload}
              />
            </label>
          </div>
          <textarea
            defaultValue={title}
            onChange={handleTitleChange}
            onKeyDown={handleTitleKeyDown}
            className="h-20 md:h-20 w-full outline-none  text-4xl font-medium  resize-none mt-5 leading-tight placeholder:opacity-40 "
            placeholder="Blog Title"
          ></textarea>

          <hr className=" w-full my-3 " />

          <div id="textEditor" className="font-gelasio"></div>
        </div>
      </section>
      <Toaster />
    </>
  );
};

export default BlogEditor;
