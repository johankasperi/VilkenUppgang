'use strict';

var React = require('react-native');
var {
	ActivityIndicatorIOS,
	Component
} = React;

var styles = require('../styles/MainStyle');

class ActivityIndicator extends Component {
	render () {
		return (
			<ActivityIndicatorIOS
      style={[styles.activityIndicator, {height: 80}]}
      size="large" />
    )
	}
}

module.exports = ActivityIndicator;

