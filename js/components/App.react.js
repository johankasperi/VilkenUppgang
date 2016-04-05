import React, {
  Component
} from 'react-native';

var DesiredTravelStore = require('../stores/DesiredTravelStore');
var Search = require('./Search.react');

class App extends Component {

  componentDidMount() {
    DesiredTravelStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    DesiredTravelStore.removeChangeListener(this._onChange);
  }

  render() {
    return (
      <Search/>
    );
  }

  _onChange() {
    console.log("change");
  }

};

module.exports = App;