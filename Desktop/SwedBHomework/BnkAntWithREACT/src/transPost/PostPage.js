import { useParams, Link , useHistory} from 'react-router-dom';
import { useContext } from 'react';
import api from '../api/posts';
import DataContext from '../context/DataContext';


const PostPage = () => {

  const {posts, setPosts} = useContext(DataContext);
  const {id} = useParams();
  const post= posts.find(post => (post.id).toString()=== id);
  const history = useHistory();

  
    // CRUD Delete
    const handleDelete = async (id) => {
      try{
          await api.delete(`/posts/${id}`);
          const postsList = posts.filter(post => post.id !== id);
          setPosts(postsList);
          history.push('/');
          } catch (err) {
              console.log(`Error: ${err.message}`);
      }
    }

  return(
    <main className='PostPage'>
     <article>
        {post && 
        <>
            <h2>{post.title}</h2>
            <p className='postDate'> {post.datetime}</p>
            <p className='amount'> {post.amount}</p>
            <p className='details'> {post.details}</p>

            <Link to='/home'> Back </Link>
        </>
        }
        { !post &&
          <>
            <h2> Post Not Found </h2>
            <p> 

              <Link to='/'> Vist Our Home page</Link>
            </p>
          </>
        }
     </article>
     
   </main>
  )
}

export default PostPage;
