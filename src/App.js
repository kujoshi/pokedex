// import './App.css';
// import PokedexList from './PokedexList';

// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Link
// } from 'react-router-dom';

// const App = () => {
//   return (
//     <div className="App">
//       <header className="App-header">
//         hello
//       </header>
//       <Routes>
//                  <Route exact path='/' element={<PokedexList />}></Route>
//           </Routes>
//     </div>
//   );
// }

// export default App;


import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Home from './components/home';
import './App.css';
  

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        hello
      </header>
      <ul className="App-header">
              <li>
                <Link to="home">Home</Link>
              </li>
            </ul>
    </div>
  );
}

export default App;
