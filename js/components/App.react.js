'use strict';

import React, {
  Component
} from 'react-native';

var DesiredTravelStore = require('../stores/DesiredTravelStore');
var TravelStore = require('../stores/TravelStore');
var TravelView = require('./TravelView.react');
var Search = require('./Search.react');

class App extends Component {

  componentDidMount() {
    DesiredTravelStore.addChangeListener(this._onChange);
    TravelStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    DesiredTravelStore.removeChangeListener(this._onChange);
    TravelStore.removeChangeListener(this._onChange);
  }

  render() {
    return (
      <Search/>
      <TravelView />
    );
  }

  _onChange() {
    console.log("change");
  }

};

module.exports = App;