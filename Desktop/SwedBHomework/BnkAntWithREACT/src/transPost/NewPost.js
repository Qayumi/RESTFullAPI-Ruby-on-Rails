import { useState, useContext } from 'react';
import api from '../api/posts';
import DataContext from '../context/DataContext';
import { useHistory } from 'react-router-dom';
import {format} from 'date-fns';



const NewPost = () => {

  const [postTitle, setPostTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [details, setDetails] = useState('');
  const {posts, setPosts} = useContext(DataContext);
  const history = useHistory();
 
// CRUD creat
const handleSubmit = async (e) => {
  e.preventDefault();
  const id = posts.length ? posts[posts.length -1].id + 1 : 1;
  const datetime= format (new Date(), 'MMMM dd, yyyy pp');
  const newPost= {id, title: postTitle, datetime, amount: amount, details: details };
  try{
    const response = await api.post('/posts', newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostTitle('');
      setAmount('');
      setDetails('');
      history.push('/home');
  }catch (err) {
    console.log(`Error: ${err.message}`);
  }
}


  return(
   <main className='NewPost'>
   <h2> New Transfer </h2>
      <form className="newPostForm" onSubmit={handleSubmit}>
        <label htmlFor="postTitle"> Title: </label>
          <input
              id="postTitle"
              type='text'
              required
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
          />
            <label htmlFor="amount"> Amount: </label>
            <input
                id="amount"
                required
                value= {amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <label htmlFor="details"> Details </label>
            <input
                id="details"
                required
                value={details}
                onChange={(e) => setDetails(e.target.value)}
            />
            <button type="submit"> Submit </button>
      </form>
   </main>
  )
}

export default NewPost;
