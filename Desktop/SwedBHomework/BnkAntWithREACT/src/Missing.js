import { Link} from 'react-router-dom';

const Missing = () => {

  return(
   <main>
        
      <h2> Post Not Found </h2>
      <p> Well that's disturbing yes!

      </p>
      <br />
      <p> 

        <Link to='/'> Vist Our Home page </Link>
      </p>
          
   </main>
  )
}

export default Missing;
