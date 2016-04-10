'use strict';

var React = require('react-native');
var {
	View,
	Text,
	StyleSheet,
	Navigator
} = React;

var Icon = require('react-native-vector-icons/MaterialIcons');
var NavigationBar = require('react-native-navbar');
var TripStore = require('../stores/TripStore');
var TripActions = require('../actions/TripActions');
var styles = require('../styles/MainStyle');



class Trip extends React.Component {

	constructor(props) {
	  super(props);
	  this.state = {
	    trip: TripStore.getTrip(props.tripIdx)
	  };
	  this._onChange = this._onChange.bind(this);
	}

	componentDidMount() {
      TripStore.addChangeListener(this._onChange);
  	}

	componentWillUnmount() {
	  TripStore.removeChangeListener(this._onChange);
	}

	render() {
		const titleConfig = {
	      title: 'Din resa',
	    };
	    const leftButtonConfig = {
	      title: 'Tillbaka',
	      handler: () => this._closeView()
	    };
		var trip = this.state.trip.LegList.Leg;
		console.log(trip);
		return (
			<View style={styles.nav}>
		        <NavigationBar
		          title={titleConfig} 
		          leftButton={leftButtonConfig}/>
			  	<View style={styles.header}>
        		  <Text style={styles.headerTitle}>{this.state.trip.LegList.Leg[0].Origin.name} </Text>
        		  <View><Icon name="trending-flat" size={25} color="#FFFFFF" /></View>
	              <Text style={styles.headerTitle}> {this.state.trip.LegList.Leg[this.state.trip.LegList.Leg.length-1].Destination.name}</Text>
	          	</View>
			</View>
			)
	}

	_onChange() {
      this.setState({trip: TripStore.getTrip(this.props.tripIdx) });
    }

    _closeView() {
    	this.props.navigator.pop();
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