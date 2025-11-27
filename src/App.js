import logo from './logo.svg';
import './App.css';
import Home from './components/homepage/Home.js';

import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'; // phaỉ có browserRouter as Router
import DetailPage from './components/homepage/DetailPage.js';
import Genre from './components/include/Genre.js';
import Trending from './components/homepage/Trending.js';
import Search from './components/homepage/Search.js';



function App() {
  
  return (  
    <Router>
      <Routes>
        <Route path="/" element={<Home></Home>}> </Route>


        <Route path="/comics/:slug" element={<DetailPage></DetailPage>}> </Route>
        <Route path="/genre/:slug" element={<Genre></Genre>}> </Route>
        <Route path="/trending/:slug" element={<Trending></Trending>}> </Route>
        <Route path="/search" element={<Search></Search>}> </Route>

      </Routes>
    </Router>
    



    
    

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
      
    // </div>
  );
}

export default App;
