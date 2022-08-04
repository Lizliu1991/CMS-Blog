import React,{ useState,useEffect} from 'react'
import moment from 'moment'
import Link from 'next/link'
import { getRecentPosts, getSimilarPosts } from '../services'

const PostWidget = ({ categories, slug}) => {
  console.log(categories,slug)
const[relatedPosts, setRelatedPosts] = useState([])
useEffect(() => {
  //if there is a slug, meaning reading a specific article, then get similar posts
  if(slug){
    getSimilarPosts(categories,slug)
    .then((result) => setRelatedPosts(result))
  } else {
    getRecentPosts()
    .then((result) => setRelatedPosts(result))
  }

},[slug])

  return (
    <div className='bg-white shadow-lg rounded-lg p-8 mb-8'>
    <h3 className='text-xl mb-8 font-semibold border-b  pb-4'>
      {slug ? "Related Posts" : "Recent Posts"}
    </h3>
    {relatedPosts.map((post) => (
      <div key={post.title} className="flex items-center w-full">
        <div className='w-16 flex-none mt-4'>
            <img 
              alt={post.title}
              height="60px"
              width="60px"
              className='align-middle rounded-full'
              src={post.featuredImage.url}
            />
        </div>
        <div className='flex-grow ml-4'>
          <p className='text-gray-500 font-xs'>
            {moment(post.createdAt).format('MMM DD, YYYY')}
          </p>
          <Link href={`/post/${post.slug}`} kley={post.title} className="">
{post.title}
          </Link>
        </div>
      </div>
    ))}
    </div>
  )
}

export default PostWidget