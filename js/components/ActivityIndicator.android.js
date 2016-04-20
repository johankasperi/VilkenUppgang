'use strict';

var React = require('react-native');
var {
	Component,
	View
} = React;

var ProgressBar = require('ProgressBarAndroid');
var styles = require('../styles/MainStyle');

class ActivityIndicator extends Component {
	render () {
		return (
			<View style={styles.activityIndicator}>
			<ProgressBar styleAttr="Normal" color= "#4F8EF7"/>
			</View>
    )
	}
}

module.exports = ActivityIndicator;

