import { Link} from 'react-router-dom';


const Nav = () => {
  

  return(
   <nav className="Nav">
   
          <ul>
              <li>
                <Link to="/" > Home </Link> &nbsp;
                <Link to="/home" > Transactions </Link> &nbsp; &nbsp;
                <Link to="/post" > New Transfer </Link> &nbsp; &nbsp;
                <Link to="/curncy" > Currency </Link> &nbsp; &nbsp;
                <Link to="/about" > About </Link>
              </li>

          </ul>

   </nav>
  )
}

export default Nav;
