import './App.css';
import SingerProfile from './SingerProfile';
import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: null};
  }

  //  This example shows us how to get data from our database
  //  Note: in order for this to work, you need to deploy this
  //  application at least once, so that `app/data.php` exists
  //  on Heroku. It uses a library called axios. Think of this
  //  as an alternative to jQuery's .get, .post
  //  https://www.npmjs.com/package/axios#example

  getDataExample() {
    let that = this;  //  "this" changes inside of the then() function, so we'll save a reference to it
    axios.get(process.env.REACT_APP_URL + '/data.php')
      .then(function(res) {
        //  We'll set our local state to the record returned from the example
        that.setState({data: res.data.record});
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  //  componentDidMount runs when React has finished loading
  //  and rendering the component. A great time to try to
  //  get data.
  componentDidMount() {
    this.getDataExample();
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
