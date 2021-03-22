import './App.css';
import SingerProfile from './SingerProfile';
import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      all: null, 
      row: null,
    };
  }

  //  This example shows us how to get data from our database
  //  Note: in order for this to work, you need to deploy this
  //  application at least once, so that `app/data.php` exists
  //  on Heroku. It uses a library called axios. Think of this
  //  as an alternative to jQuery's .get, .post
  //  https://www.npmjs.com/package/axios#example

  all() {
    let that = this;  //  "this" changes inside of the then() function, so we'll save a reference to it
    return axios.get(process.env.REACT_APP_URL + '/data.php')
      .then(function(res) {
        //  We'll set our local state to the rows returned from the example
        that.setState({all: res.data.data});
        return res.data.data;
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  get(id) {
    let that = this;  //  "this" changes inside of the then() function, so we'll save a reference to it
    return axios.get(`${process.env.REACT_APP_URL}/data.php?id=${id}`)
      .then(function(res) {
        //  We'll set our local state to the row returned from the example
        that.setState({row: res.data.data});
        return res.data.data;
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  update(id, name, amazingLevel, country) {
    let that = this;  //  "this" changes inside of the then() function, so we'll save a reference to it
    let params = {
      name: name, 
      amazing_level: amazingLevel,
      country: country
    };
    axios.put(`${process.env.REACT_APP_URL}/data.php?id=${id}`, params)
      .then(function(res) {
        that.setState({row: res.data.data});
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  delete(id) {
    let that = this;  //  "this" changes inside of the then() function, so we'll save a reference to it
    axios.delete(`${process.env.REACT_APP_URL}/data.php?id=${id}`, {})
      .then(function(res) {
        that.setState({row: null});
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  create(name, amazingLevel, country) {
    let that = this;  //  "this" changes inside of the then() function, so we'll save a reference to it
    let params = {
      name: name, 
      amazing_level: amazingLevel,
      country: country
    };
    axios.post(`${process.env.REACT_APP_URL}/data.php`, params)
      .then(function(res) {
        that.setState({row: res.data.data});
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  runTests() {
    console.log("Test: get a single row");
    this.get(1)
      .then(function(res) {
        console.table(res);
      })
      .catch(function(err) {
        console.log("Failed");
        console.table(err);
      });

    console.log("Test: get all rows");
    this.all()
      .then(function(res) {
        console.table(res);
      })
      .catch(function(err) {
        console.log("Failed");
        console.table(err);
      });

    console.log("Test: delete row 1");
    this.delete(1)
      .then(function(res) {
        console.table(res);
      })
      .catch(function(err) {
        console.log("Failed");
        console.table(err);
      });

    console.log("Test: delete a single row");
    this.delete(1)
      .then(function(res) {
        console.table(res);
      })
      .catch(function(err) {
        console.log("Failed");
        console.table(err);
      });

    console.log("Test: create a single row");
    this.create("Robyn", 10, "Denmark")
      .then(function(res) {
        console.table(res);
      })
      .catch(function(err) {
        console.log("Failed");
        console.table(err);
      });

  }

  //  componentDidMount runs when React has finished loading
  //  and rendering the component. A great time to try to
  //  get data.
  componentDidMount() {
    this.runTests();
  }

  render() {
    return (
      <div className="App">
        <SingerProfile profile={this.state.data} />
      </div>
    );
  }
}

export default App;
