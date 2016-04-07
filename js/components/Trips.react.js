'use strict';

var React = require('react-native');
var {
	View,
	Text,
	StyleSheet,
	Navigator
} = React;

var TripActions = require('../actions/TripActions');
var TripStore = require('../stores/TripStore');


class SearchResult extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			SearchResult: TripActions.getTrips()
		}
	}

	componentDidMount() {
      TripStore.addChangeListener(this._onChange);
  	}

	componentWillUnmount() {
	  TripStore.removeChangeListener(this._onChange);
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
			<View style={styles.container}><Text>SearchResult</Text></View>
		)
	}

	_onChange() {
		this.state.SearchResult = TripActions.getTrips();
		console.log(this.state.trips);

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