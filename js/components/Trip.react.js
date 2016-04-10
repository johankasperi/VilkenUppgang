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

var lineColors = {};
lineColors[10] = "#3B73B9"; //Blå
lineColors[11] = "#3B73B9"; //Blå
lineColors[13] = "#D43A34"; //Röd
lineColors[14] = "#D43A34"; //Röd
lineColors[17] = "#77ae5a"; //Grön
lineColors[18] = "#77ae5a"; //Grön
lineColors[19] = "#77ae5a"; //Grön



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
	      title: 'Färdbeskrivning',
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
        		  <Text style={styles.headerTitle}>{trip[0].Origin.name} </Text>
        		  <View><Icon name="trending-flat" size={25} color="#FFFFFF" /></View>
	              <Text style={styles.headerTitle}> {trip[trip.length-1].Destination.name}</Text>
	          	</View>
	          	<View style={styles.changesContainer}><View style={styles.timeline}>{this._renderTripChanges(trip)}</View></View>
			</View>
			)
	}

	_renderTripChanges(trip) {
		var changes = [];
		var instructions;
		var type;
		for(var i=0;i<trip.length;i++) {
			var hide = false;
	        if("hide" in trip[i]) {
	          if(trip[i].hide === "true") {
	            hide = true;
	          }
	        }
        	if(!hide) {
        		var originTitle = styles.originTitle;
        		var destinationTitle = styles.destinationTitle;
        		if(i === 0) {
        			originTitle = styles.firstOriginTitle;
        		}
        		else if(i === trip.length-1) {
        			destinationTitle = styles.lastDestinationTitle;
        		}
        		var color = "#CCCCCC";
				instructions = this._capitalizeFirstLetter(trip[i].name) + " mot " + trip[i].dir;
				if(trip[i].type === "METRO") {
	              color = lineColors[parseInt(trip[i].line)];
	              type = "subway";
	            }
	            else if(trip[i].type === "TRAM") {
	              type = "tram";
	            }
	            else if(trip[i].type === "BUS" || trip[i].type === "NARBUSS") {
	              if(trip[i].name.indexOf("blåbuss") > -1) {
	                color = "#3B73B9";
	              }
	              else {
	                color = "#D43A34";
	              }
	              type = "directions-bus";
	            }
	            else if(trip[i].type === "FERRY" || trip[i].type === "SHIP") {
	              type = "directions-boat";
	            }
	            else if(trip[i].type === "WALK") {
	              type = "directions-walk";
	              instructions = "Gå " + trip[i].dist + "m";
	            }
	            else if(trip[i].type === "TRAIN") {
	              type = "train";
	            }
				changes.push(
					<View style={styles.changeContainer}>
					  <View style={styles.rowContainer}><Text style={originTitle}> {trip[i].Origin.time} {trip[i].Origin.name}</Text></View>
					  <View style={styles.journeyDetails}><Icon name={type} size={25} color={color} /><Text> {instructions}</Text></View>
					  <View style={styles.rowContainer}><Text style={destinationTitle}> {trip[i].Destination.time} {trip[i].Destination.name}</Text></View>
					  <Text style={styles.bulletPoint}>•</Text>
					</View>
				);
			}
		}
		return changes;
	}

	_capitalizeFirstLetter(string) {
    	return string.charAt(0).toUpperCase() + string.slice(1);
	}

	_onChange() {
      this.setState({trip: TripStore.getTrip(this.props.tripIdx) });
    }

    _closeView() {
    	this.props.navigator.pop();
  	}
}

module.exports = Trip;