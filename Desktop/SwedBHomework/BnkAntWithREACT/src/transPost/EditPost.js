import {useEffect, useContext, useState } from "react";
import {useParams, Link, useHistory } from "react-router-dom";
import DataContext from '../context/DataContext';
import api from '../api/posts';
import {format} from 'date-fns';



const EditPost = () => {

  const {posts, setPosts} = useContext(DataContext);

  const {id} = useParams();
  const post = posts.find(post => (post.id).toString() === id);
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const history = useHistory();


    useEffect(()=>{
        if(post){
            setEditTitle(post.title);
            setEditBody(post.body);
        }

    }, [post, setEditTitle,setEditBody])

    //CRUD update

  const handleEdit = async (id) => {
    const datetime= format (new Date(), 'MMMM dd, yyyy pp');
    const updatedPost= {id, title: editTitle, datetime, body: editBody};
        try{
                const response = await api.put(`/posts/${id}`, updatedPost);
                setPosts(posts.map(post => post.id === id ? {...response.data} : post));
                setEditTitle('');
                setEditBody('');
                history.push('/');
            } catch (err) {
            console.log(`Error: ${err.message}`);
      }
    
    }
    
  return(
    <main className='NewPost'>
        {editTitle && 
        <>
             <h2> Edit post</h2>
                <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="postTitle"> Title: </label>
                    <input
                        id="postTitle"
                        type='text'
                        required
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                    />
                        <label htmlFor="postBody"> Post: </label>
                        <textarea
                            id="postBody"
                            required
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                        />
                        <button type="submit" onClick={()=> handleEdit(post.id)}> Submit </button>
                </form>
            </>
        }  
        { !editTitle &&
          <>
            <h2> Post Not Found </h2>
            <p> 

              <Link to='/'> Vist Our Home page</Link>
            </p>
          </>
        } 
    </main>
  )
};

export default EditPost;