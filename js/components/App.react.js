'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  Text
} = React;


//var DesiredTravelStore = require('../stores/DesiredTravelStore');
var TravelStore = require('../stores/TravelStore');
var TravelView = require('./TravelView.react');


class App extends React.Component {
  componentDidMount () {
    //DesiredTravelStore.addChangeListener(this._onChange);
    TravelStore.addChangeListener(this._onChange);
  }

  componentWillUnmount () {
    //DesiredTravelStore.removeChangeListener(this._onChange);
    TravelStore.removeChangeListener(this._onChange);
  }
  render() {
    return (
      //<Header />
      <TravelView />
      //<Footer />
    );
  }
  _onChange() {
    console.log("change");
  }
}

module.exports = App;