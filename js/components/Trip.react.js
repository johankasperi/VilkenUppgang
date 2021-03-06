'use strict';

var React = require('react-native');
var {
	View,
	Text,
	StyleSheet,
	Navigator,
	TouchableHighlight
} = React;

var MapView = require('react-native-maps');
var Icon = require('react-native-vector-icons/MaterialIcons');
var NavigationBar = require('react-native-navbar');
var TripStore = require('../stores/TripStore');
var DesiredTripStore = require('../stores/DesiredTripStore');
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
	    trip: TripStore.getTrip(props.tripIdx),
      page: 1
	  };
    for(var i=0;i<this.state.trip.LegList.Leg.length;i++) {
      var trip = this.state.trip.LegList.Leg[i];
      TripActions.getCoordinates(trip.GeometryRef.ref, props.tripIdx, i);
    }
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
		return (
			<View style={styles.nav}>
        <NavigationBar
          title={titleConfig} 
          leftButton={this._renderLeftButton()}/>
        <View style={styles.header}>
    		  <Text style={styles.headerTitle}>{trip[0].Origin.name} </Text>
    		  <View><Icon name="trending-flat" size={25} color="#FFFFFF" /></View>
          <Text style={styles.headerTitle}> {trip[trip.length-1].Destination.name}</Text>
        </View>
        {this._renderContent()}
        <View style={styles.footer}>
          <TouchableHighlight style={styles.footerLeft} underlayColor="#FFFFFF" onPress={()=>this.setState({page:1})}>
            <View style={styles.footerLeft}>
              <Icon name="directions" size={25} color={this.state.page == 1 ? "#4F8EF7" : "#CCCCCC"} />
              <Text style={styles.footerText}>Rutt</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={styles.footerMid} underlayColor="#FFFFFF" onPress={()=>this.setState({page: 2})}>
            <View style={styles.footerMid}>
              <Icon name="transfer-within-a-station" size={25} color={this.state.page == 2 ? "#4F8EF7" : "#CCCCCC"} />
              <Text style={styles.footerText}>Vilken uppgång?</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={styles.footerRight} underlayColor="#FFFFFF" onPress={()=>this.setState({page: 3})}>
            <View style={styles.footerRight}>
              <Icon name="map" size={25} color={this.state.page == 3 ? "#4F8EF7" : "#CCCCCC"} />
              <Text style={styles.footerText}>Karta</Text>
            </View>
          </TouchableHighlight>
        </View>
			</View>
			)
	}

  _renderContent() {
    var trip = this.state.trip.LegList.Leg;
    if(this.state.page == 1) {
      return (
      <View style={styles.tripContainer}>
        {this._renderTripChanges(trip)}
      </View>
      )
    }
    else if(this.state.page == 2) {
      var exits = [];
      for(var i=0;i<trip.length;i++) {
        if(trip[i].exitInfo != null) {
          var color = lineColors[parseInt(trip[i].line)];
          exits.push(
            <View style={styles.row}><Icon name="subway" size={25} color={color} /><Text style={styles.wrap}> Vid <Text style={styles.fontBold}>{trip[i].Destination.name}</Text> ta uppgången <Text style={styles.fontBold}>{trip[i].exitInfo.exitName}</Text> </Text></View>
          );
        }
      }
      return (
        <View style={styles.changesContainer}>{exits}</View>
      )
    }
    else if(this.state.page == 3) {
      var markers = [];
      var middleLat = (parseFloat(trip[0].Origin.lat) + parseFloat(trip[trip.length-1].Destination.lat))/2;
      var middleLon = (parseFloat(trip[0].Origin.lon) + parseFloat(trip[trip.length-1].Destination.lon))/2;
      var lengthLat = Math.abs(parseFloat(trip[0].Origin.lat) - parseFloat(trip[trip.length-1].Destination.lat));
      var lengthLon = Math.abs(parseFloat(trip[0].Origin.lon) - parseFloat(trip[trip.length-1].Destination.lon));
      var coordinates = [];
      for(var i=0;i<trip.length;i++) {
        markers.push(<MapView.Marker title={trip[i].Origin.name} coordinate={{latitude: parseFloat(trip[i].Origin.lat), longitude: parseFloat(trip[i].Origin.lon)}} />);
        markers.push(<MapView.Marker title={trip[i].Destination.name} coordinate={{latitude: parseFloat(trip[i].Destination.lat), longitude: parseFloat(trip[i].Destination.lon)}} />);
        if("GeometryPoints" in trip[i]) {
          for(var j=0;j<trip[i].GeometryPoints.Point.length;j++) {
            coordinates.push({latitude: parseFloat(trip[i].GeometryPoints.Point[j].lat), longitude: parseFloat(trip[i].GeometryPoints.Point[j].lon)});
          }
        }
      }

      return (
        <View style={ styles.map }>
        <MapView 
          style={ styles.map }
          initialRegion={{
            latitude: middleLat,
            longitude: middleLon,
            latitudeDelta: lengthLat+0.1,
            longitudeDelta: lengthLon+0.1,
          }}
        >
        <MapView.Polyline coordinates= {coordinates} strokeWidth={2} />
        {markers}
        {this._renderMapChanges(trip)}
        </MapView>
        </View>
      )
    }
  
  }

  _renderMapChanges(trip) {
    

  }

	_renderTripChanges(trip) {
		var changes = [];
		var instructions;
		var type;
		for(var i=0;i<trip.length;i++) {
			var hide = false;
      var exitInfo = "";
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
          if(trip[i].exitInfo) {
            exitInfo = "Ta uppgången "+trip[i].exitInfo.exitName;
          }
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
					<View style={styles.tripRow}>
            <View style={i == 0 ? styles.firstTripRight : styles.tripRight}>
              <View style={styles.journeyDetails}><Icon name={type} size={25} color={color} /><Text style={styles.wrap}>{instructions}</Text></View>
            </View>
            {this._renderIfFirstTitle(trip, i)}
            {this._renderIfFirstCircle(trip, i)}
            <Text style={i == 0 ? styles.firstOriginTime : styles.originTime}>{trip[i].Origin.time}</Text>
            <Text style={i == trip.length-1 ? styles.lastDestTime : styles.destTime}>{trip[i].Destination.time}</Text>
            <Text style={i == trip.length-1 ? styles.lastDestText : styles.destText}>{trip[i].Destination.name}</Text>
            <View style={styles.rightCircle}></View>
					</View>
				);
			}
		}
		return changes;
	}

  _renderIfFirstTitle (trip, i) {
    if(i == 0){
      return (
          <Text style={styles.originText}>{trip[0].Origin.name}</Text>
      )
    }
  }

  _renderIfFirstCircle (trip, i) {
    if(i == 0){
      return (
          <View style={styles.firstCircle}></View>
      )
    }
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

	 _renderLeftButton () {
    return (
      <View style={styles.leftNavButton}>
      <TouchableHighlight onPress={()=>this._closeView()} underlayColor="#FFFFFF">
          <Icon name="keyboard-arrow-left" size={30} color="#4F8EF7" />
      </TouchableHighlight>
      </View>
    )
  }
}

module.exports = Trip;