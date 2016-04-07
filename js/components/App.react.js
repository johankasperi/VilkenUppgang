'use strict';

import React, {
  Component,
  Navigator
} from 'react-native';

var DesiredTravelStore = require('../stores/DesiredTravelStore');
var TripStore = require('../stores/TripStore');
var Trip = require('./Trip.react');
var Search = require('./Search.react');
var Trips = require('./Trips.react');

class App extends Component {

  renderScene(route, navigator) {
    var Component = route.component;
    return (
        <Component {...route.passProps} navigator={navigator} route={route}/>
    );
  }

  render() {
    return (
      <Navigator
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FloatFromRight;
        }}
        initialRoute={{
          component: Search,
        }}
        renderScene={this.renderScene}
      />
    );
  }

};

module.exports = App;