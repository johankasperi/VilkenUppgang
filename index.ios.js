import React, {
  Component,
  AppRegistry
} from 'react-native';

var App = require('./js/components/App.react');

class VilkenUppgang extends Component {
  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('VilkenUppgang', () => VilkenUppgang);
