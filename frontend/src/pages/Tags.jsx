import { useContext } from "react";
import { editorContext } from "./Editor";

const Tags = ({tag}) => {
  const { blog, setBlog } = useContext(editorContext);
  const { tags } = blog;
  const handleDelete = () => {
    const updatedtags = tags.filter((t) => t != tag);
    setBlog({ ...blog, tags: updatedtags });
  };
  return (
    <div className="  p-2 px-4 mt-2 mr-2  bg-white rounded-full  hover:bg-opacity-50  flex ">
      <p className="text-black  ">{tag}</p>
      <button
        className=" pl-2 text-2xl font-semibold text-black"
        onClick={handleDelete}
      >
        x
      </button>
    </div>
  );
};

export default Tags;
