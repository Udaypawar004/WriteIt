import { useState } from "react";
import Appbar from "../Components/Appbar"
import BlogCard from "../Components/BlogCard"
import Loading from "../Components/Loading";
import { useBlogs } from "../hooks"

const Blogs = () => {
  const {loading, blogs} = useBlogs();

  if (loading) {
    return <div>
      <Loading />
    </div>
  }
  
  return (
    <div>
      <Appbar isWriting={false}/>
      <div className='flex justify-center'>
        <div className='max-w-xl lg:max-w-2xl'>
          {blogs.map(blog => (
            <BlogCard id={blog.id} authorName={blog.author.name || "Anonymous"} title={blog.title} content={blog.content} publishedDate='Dec 21, 2024' />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Blogs