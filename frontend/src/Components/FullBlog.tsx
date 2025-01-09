import { Blog } from "../hooks"
import Appbar from "./Appbar"
import Avatar from "./Avatar";

const FullBlog = ( { blog } : {blog: Blog | undefined}) => {
  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
  <div className="flex flex-col gap-8">
      <Appbar isWriting={false} />  
      <div className="flex justify-center">
        <div className="grid grid-cols-12 max-w-screen-2xl w-full px-20 ">

          <div className="col-span-7 px-5">
            <div className="text-[3.5rem]  font-extrabold font-serif leading-tight">
              {blog.title || ""}
            </div>
            <div className="text-lg text-gray-500 font-medium">
              Posted on August 26, 2024
            </div>
            <div className="text-[1.3em] text-gray-300 font-medium pt-6 font-mono">
              {blog.content || ""}
            </div>
          </div>

          <div className="col-span-4 border-l-2 border-gray-900 ">
            <div className=" text-2xl p-8 ">
              Author
            </div>

            <div className="flex">
              <div className="col-span-4 text-2xl p-8">
                <Avatar authorName={blog.author.name} size="big"/>
              </div>
              <div className="font-bold">
                <h1 className="text-3xl text-gray-300 pb-2">{blog.author.name}</h1>
                <h3 className="text-gray-400">Some random jibrish about the author</h3>
              </div>
              
            </div>

          </div>
        </div>
      </div>
  </div>
  )
}

export default FullBlog