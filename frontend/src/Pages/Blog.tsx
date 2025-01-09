import { useBlog } from '../hooks'
import FullBlog from '../Components/FullBlog';
import { useParams } from 'react-router-dom';
import Loading from '../Components/Loading';

const Blog = () => {
  const { id } = useParams();
  const {loading, blog} = useBlog({ id: id || ''});

  if (loading) {
    return <div>
      <Loading />
    </div>
  }
  
  return (
    <div>
      <FullBlog blog={blog} />
    </div>
  )
}

export default Blog