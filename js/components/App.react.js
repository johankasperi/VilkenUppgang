'use strict';

import React, {
  Component,
  View,
  Navigator
} from 'react-native';

const Search = require('./Search.react');
const styles = require('../styles/MainStyle');

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