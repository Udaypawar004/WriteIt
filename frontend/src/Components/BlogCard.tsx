import { Link } from 'react-router-dom'
import Avatar from './Avatar'

interface blogCardProps{
    authorName: string,
    title: string,
    content: string,
    publishedDate: string,
    id: string
}

const BlogCard = ({authorName, title, content, publishedDate, id}: blogCardProps) => {
  return (
    <Link to={`/blog/${id}`} className='text-gray-300'>
        <div className='border-b-2 border-gray-800 p-3 cursor-pointer'>
        <div className='flex gap-2 justify-start items-center text-md'>
            <Avatar authorName={authorName} size={"small"}/>
            <div className='text-xl'>•</div>
            <div className='font-semibold opacity-70 text-lg'>{authorName}</div>
            <div className='text-xl'>•</div>
            <div className='opacity-65'>{publishedDate}</div>
        </div>
        <div className='mt-3 text-3xl font-bold font-sans'>
            {title}
        </div>
        <div className='mt-1 text-2xl opacity-80 font-serif tracking-wide'>
            {content.length > 100 ? content.slice(0, 100) + "..." : content}
        </div>
        <div className='mt-2 text-sm opacity-50 font-medium'>
            {`${content.length / 100} min read`}
        </div>
    </div>
    </Link>
  )
}

export default BlogCard