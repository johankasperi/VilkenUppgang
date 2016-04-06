'use strict';

import React, {
  Component,
  Navigator
} from 'react-native';

var DesiredTravelStore = require('../stores/DesiredTravelStore');
var TravelStore = require('../stores/TravelStore');
var TravelView = require('./TravelView.react');
var Search = require('./Search.react');
var SearchResult = require('./SearchResult.react');

class App extends Component {


  render() {
    return (
      <Navigator
          initialRoute={{id: 'Search'}}
          renderScene={this.renderScene.bind(this)}
          configureScene={(route) => {
            if (route.sceneConfig) {
              return route.sceneConfig;
            }
            return Navigator.SceneConfigs.FloatFromRight;
          }} />
    );
  }

  renderScene(route, navigator) {
    var routeId = route.id;
    if (routeId === 'Search') {
      return (
        <Search
          navigator={navigator} />
      );
    }
    if (routeId === 'TravelView') {
      return (
        <TravelView
          navigator={navigator} />
      );
    }
    if (routeId === 'SearchResult') {
      return (
        <SearchResult 
          navigator={navigator} />
      )
    }
  }

  _onChange() {
    console.log("change");
  }

};

module.exports = App;