import React, { useState } from 'react';
import { FcLikePlaceholder } from "react-icons/fc";
import { FcLike } from "react-icons/fc";
import { Link } from 'react-router-dom';

function BlogCard({ content, author }) {
  const { createdAt, description, banner, title, _id: id, tags } = content;
  const { fullname, username } = author;

  const [count, setCount] = useState(0);
  const [like, setLike] = useState(false);

  const formattedDate = new Date(createdAt).toLocaleDateString();

  const handleLikeClick = () => {
    setCount(count + 1);
    setLike(true);
  };

  return (
    <Link to="/" className="p-6 max-w-7xl  my-6 bg-white">
      <div className="flex ml-2 flex-col mb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          {banner && <img src={banner} alt="Banner" className="h-20 w-20 rounded-lg" />}
        </div>
        <p className="text-sm text-gray-500 mt-2">
          <strong>{fullname}</strong> (@{username}) on {formattedDate}
        </p>
      </div>
      <p className="text-lg ml-2 text-gray-700 mt-4">{description}</p>
      
     
      <div className=" ml-2 flex flex-wrap gap-2 mt-4">
        {tags && tags.map((tag, i) => (
          <span key={i} className="px-3 py-1 bg-gray-200 text-black rounded-full text-sm font-medium">
            {tag.trim()}
          </span>
        ))}
      </div>

      <div className="flex ml-2 items-center mt-4">
        {like ? <FcLike size={24} /> : <FcLikePlaceholder size={24} onClick={handleLikeClick} />}
        <span className="ml-2 text-sm text-gray-700">{count}</span>
      </div>
      <hr className="my-4" />
    </Link>
  );
}

export default BlogCard;
