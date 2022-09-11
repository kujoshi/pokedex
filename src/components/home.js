
import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';


const Home = () => {
  console.log('check');
  return (
    <div className="App">
      <ul className="App-header">
              <li>
                <Link to="home">Home</Link>
              </li>
            </ul>
    </div>
  );
}
  
export default Home;