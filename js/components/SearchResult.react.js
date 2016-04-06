'use strict';

var React = require('react-native');
var {
	View,
	Text,
	StyleSheet,
	Navigator
} = React;

var TripActions = require('../actions/TripActions');


class SearchResult extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			trips: TripActions.getTrips()
		}
		console.log(this.state.trips);

	}

	render() {
		return(
		  <Navigator
            renderScene={this.renderScene.bind(this)}
            navigator={this.props.navigator} />
        )
	}

	renderScene(route, navigator) {
		return (
			<View style={styles.container}><Text>{this.state.trips}</Text></View>
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

module.exports = SearchResult;