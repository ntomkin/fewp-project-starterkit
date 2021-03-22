import logo from './logo.svg';
import './App.css';
import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: null};

    this.getDataExample();
  }

  //  This example shows us how to get data from our database
  //  Note: in order for this to work, you need to deploy this
  //  application at least once, so that `app/data.php` exists
  //  on Heroku. It uses a library called axios. Think of this
  //  as an alternative to jQuery's .get, .post
  //  https://www.npmjs.com/package/axios#example

  getDataExample() {
    axios.get(process.env.REACT_APP_URL + '/data.php')
      .then(function(res) {
        console.log(res.data.data);
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
    }
}

export default App;
