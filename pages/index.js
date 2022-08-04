import Head from 'next/head'
import Image from 'next/image';
import { PostCard, PostWidget, Category } from '../components';
import { getPosts } from '../services';


export default function Home({ posts }) {

  return (
    <div className='container mx-auto px-10 mb-8 '>
      <Head>
        <title>CMS Blog</title>
        <link rec="icon" href='/favicon.ico' />
      </Head>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 bg-gray-100'>
        <div className='lg:col-span-8 col-span-1'>
          {posts.map((post,index) => <PostCard post={post.node} key={index} />)}
        </div>
        <div className='lg:col-span-4 col-span-1'>
          <div className='lg:sticky relative top-8'>
            <PostWidget />
            <Category />
          </div>
        </div>
      </div>

    </div>

  )
}


export async function getStaticProps() {
  const posts = (await getPosts()) || [];
  return {
    props: { posts }

  }
}

