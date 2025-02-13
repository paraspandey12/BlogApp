import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import InPageNavigation from "./InPageNavigation";
import axios from "axios";
import BlogCard from "./BlogCard";
import TrendingSection from "./TrendingSection";
import { FaArrowTrendUp } from "react-icons/fa6";
import NoData from "./NoData";
import { ClipLoader } from "react-spinners";

const Home = () => {
  const [posts, setPosts] = useState(null);
  const [trendingBlog, setTrendingBlog] = useState(null);
  const activeTab = useRef();

  const categories = [
    "Entertainment",
    "Finance",
    "Travelling",
    "Social media",
    "Tech",
    "Health",
    "Vegan",
  ];
  const [pageState, setPageState] = useState("home");

  const fetchLatestBlogs = () => {
    axios
      .get("http://localhost:3000/api/getLatest")
      .then(({ data }) => {
        console.log(data.posts);
        setPosts(data.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchTrendingBlogs = () => {
    axios
      .get("http://localhost:3000/api/getTrendingBlog")
      .then(({ data }) => {
        console.log(data.posts);
        setTrendingBlog(data.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadBlogByCategory = (e) => {
    const category = e.target.innerText.toLowerCase();

    setPosts(null);

    if (pageState === category) {
      setPageState("home");
    } else {
      setPageState(category);
    }
  };

  const searchThroughTab = () => {
    axios
      .post("http://localhost:3000/api/searchBlog", { tag: pageState })
      .then(({ data }) => {
        console.log(data.posts);
        setPosts(data.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    activeTab.current.click();
    if (pageState == "home") {
      fetchLatestBlogs();
    } else {
      searchThroughTab();
    }

    if (!trendingBlog) {
      fetchTrendingBlogs();
    }
  }, [pageState]);

  return (
    <>
      <Navbar />
      <section className="h-screen flex justify-center gap-10">
        <div className="w-full">
          <InPageNavigation
            routes={["home", "trending blogs"]}
            defaultHidden={["trending blogs"]}
            activeTab={activeTab}
          >
            <>
              {posts == null ? (
               
                  <p className="mx-10">Loading blogs<span><ClipLoader className="mx-5" color="#"  size={30} /></span></p>
                  
               
              ) : posts.length ? (
                posts.map((blog, i) => (
                  <BlogCard key={i} content={blog} author={blog.author} />
                ))
              ) : (
                <NoData message={"No Blogs Published"} />
              )}
            </>
            <>
              {trendingBlog == null ? (
                <h1 className="ml-10 font-semibold">
                  ...Loading trending Blogs
                </h1>
              ) :  trendingBlog.length ?(
                trendingBlog.map((blog, i) => (
                  <TrendingSection key={i} blog={blog} index={i} />
                ))
              ):
              <NoData message={"No trending Blogs"}/>}
            </>
          </InPageNavigation>
        </div>

        <div className="min-w-[40%] lg:min-w-[500px] lg:mr-3 border-l max-w-min 3  pl-8 pt-3 max-md:hidden">
          <div className="flex flex-col gap-4">
            <h1 className="font-medium text-xl mb-8">
              Stories from all interest
            </h1>
            <div className="flex gap-4 flex-wrap mb-10">
              {categories.map((category, i) => (
                <div key={i}>
                  <button
                    onClick={loadBlogByCategory}
                    className={`border text-lg  p-3 rounded-full ${
                      pageState == category.toLowerCase()
                        ? " text-white bg-black"
                        : " bg-gray-200 text-black"
                    }`}
                  >
                    {category}
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h1 className="font-medium flex text-xl mb-8">
              Trending
              <FaArrowTrendUp />
            </h1>
            {trendingBlog == null ? (
              <h1 className="ml-10 font-semibold">...Loading trending Blogs</h1>
            ) :  trendingBlog.length?(
              trendingBlog.map((blog, i) => (
                <TrendingSection key={i} blog={blog} index={i} />
              ))
            ): <NoData message={"No trending Blogs"}/>
            }
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
