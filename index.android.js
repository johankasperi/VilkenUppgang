'use strict';
 
var React = require('react-native');
var {
  AppRegistry,
  Component
} = React;

var App = require('./js/components/App.react');

class VilkenUppgang extends Component {
  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('VilkenUppgang', () => VilkenUppgang);
