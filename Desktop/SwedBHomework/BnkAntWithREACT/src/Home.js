import Feed from './transPost/Feed';
import { useContext } from 'react';
import DataContext from './context/DataContext';

const Home = () => {
  const { searchResult, fetchError, isLoading} = useContext(DataContext);

  return(
   <main className="Home" >
     <h4> Account Number : EE12345678910</h4>
     <br />
     <p> Transaction History</p>
     {isLoading && <p className="statusMsg"> is Loading... </p>}
     {!isLoading && fetchError&& <p className="statusMsg" style={{color: "red"}}>{fetchError}</p>}
     {!isLoading && !fetchError && (searchResult.length ? 
     < Feed posts={searchResult} /> : <p style={{marginTop: "2rem"}}>
           No posts to display. </p>)}
   </main>
  )
}

export default Home;
