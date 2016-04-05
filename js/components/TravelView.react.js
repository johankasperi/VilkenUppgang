'use strict';

var React = require('react-native');
var {
	View,
	Text,
	StyleSheet
} = React;

var TravelStore = require('../stores/TravelStore');
var travel = TravelStore.get();

class TravelView extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>From:</Text>
				<Text>{travel.from}</Text>
				<Text>To:</Text>
				<Text>{travel.to}</Text>
			</View>
			)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

module.exports = TravelView;