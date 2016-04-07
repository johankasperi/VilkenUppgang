'use strict';

var React = require('react-native');
var {
	View,
	Text,
	StyleSheet,
	Navigator
} = React;

var TripStore = require('../stores/TripStore');

var TripActions = require('../actions/TripActions');


class Trip extends React.Component {

	constructor(props) {
	  super(props);
	  this.state = {
	    travel: TripStore.getTrip()
	  };
	  this._onChange = this._onChange.bind(this);
	}

	componentDidMount() {
      TravelStore.addChangeListener(this._onChange);
  	}

	componentWillUnmount() {
	  TravelStore.removeChangeListener(this._onChange);
	}

	render() {
		return (
		<Navigator
          renderScene={this.renderScene.bind(this)}
          navigator={this.props.navigator} />
        )
	}

	renderScene (route, navigator) {
		var trip = this.state.travel.LegList.Leg;
		return (
			<View style={styles.container}>
				<Text>From:</Text>
				<Text>{trip.Origin.name}</Text>
				<Text>To:</Text>
				<Text>{trip.Destination.name}</Text>
			</View>
		)
	}

	_onChange() {
      this.setState({travel: TravelStore.get() });
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

module.exports = Trip;