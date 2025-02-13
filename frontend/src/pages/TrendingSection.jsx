
import { Link } from 'react-router-dom';
function TrendingSection({ blog ,index }) {
  const{title,_id:id, author:{fullname, username}, createdAt}=blog;
  const formattedDate = new Date(createdAt).toLocaleDateString();
  return (
   <Link to={`/blog/${id}`} className='flex gap-5 max-w-3xl mb-4'>
   <h1 className='text-4xl font-bold text-gray-200 pb-3'>{index <10 ?  "0"+(index+1):index }</h1>
   <div className="flex flex-col mb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          <strong>{fullname}</strong> (@{username}) on {formattedDate}
        </p>
        <hr className="my-4" />
      </div>
   
   </Link>
  )
}

export default TrendingSection
