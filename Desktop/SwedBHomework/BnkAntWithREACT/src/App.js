import Header from './Header';
import Footer from './Footer';
import Nav from './Nav';
import Home from './Home';
import NewPost from './transPost/NewPost';
import PostPage from './transPost/PostPage'
import About from './About';
import Missing from './Missing'
import EditPost from './transPost/EditPost';
import { Route, Switch} from 'react-router-dom';
import {DataProvider} from './context/DataContext';
import CurrConverter from './api/exchCurrency/CurrConverter';
import Index from "./transPost/Index";



function App() {
 

  return (
 <div className="App">
    

   <Header title ="Swedbank Test Account"/>
      <DataProvider>
      <Nav />
         <Switch>
          <Route exact  path="/" component={Index}  />
          <Route exact  path="/home" component={Home} />
          <Route exact  path="/curncy" component={CurrConverter} />
          <Route exact path="/post" component={NewPost} />
          <Route exact path="/edit/:id" component={EditPost} />
          <Route path="/post/:id" component={PostPage} />
          <Route path="/about" component={About} />
          <Route path="*" component={Missing} />
       </Switch>
       </DataProvider>
       
      <Footer /> 
    </div>
  );
}

export default App;
