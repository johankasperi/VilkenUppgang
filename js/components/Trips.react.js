'use strict';

var React = require('react-native');
var {
	View,
	Text,
	ListView,
	TouchableHighlight,
  Navigator
} = React;

var NavigationBar = require('react-native-navbar');
var TripActions = require('../actions/TripActions');
var TripStore = require('../stores/TripStore');
var Trip = require('./Trip.react');
var styles = require('../styles/MainStyle');
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var i = 0;

class Trips extends React.Component {

	constructor(props) {
		TripActions.getTrips();
		super(props);
    	this.state = {
      		dataSource: ds.cloneWithRows(TripStore.getAll()),
      		origin:TripStore.getOrigin(),
      		destiantion:TripStore.getDestination()
    	};

		this._onChange = this._onChange.bind(this)

	}

	componentDidMount() {
      TripStore.addChangeListener(this._onChange);
  	}

	componentWillUnmount() {
	  TripStore.removeChangeListener(this._onChange);
	}

	renderRow(rowData, sectionID, rowID) {
		var trip = rowData.LegList.Leg;
    var lastIdx = trip.length-1;
    console.log(rowID);
	    return (
        <TouchableHighlight onPress={()=>this._goToTrip(rowID)}>
        <View style={styles.tripsRow}>
	        <View style={styles.tripsColumn}>
            <Text>{trip[0].Origin.time}</Text>
	          <Text>{this.tripChanges(trip)}</Text>
          </View>
          <View style={styles.tripsColumnMid}><Text>-></Text></View>
          <View style={styles.tripsColumnRight}>
            <Text>{trip[lastIdx].Destination.time}</Text>
	          <Text>Restid: {rowData.dur} min</Text>
          </View>
        </View>
        </TouchableHighlight>
	    );
  	}

  	tripChanges(trip) {
  		var changes = "";
  		for(var i=0; i<trip.length;i++) {
  			changes = changes + trip[i].type;
        if(i+1 < trip.length) {
          changes = changes + " -> ";
        }
  		}
  		return changes;
  	}

	render() {
    const titleConfig = {
      title: 'Din resa',
    };
    const leftButtonConfig = {
      title: 'Tillbaka',
      handler: () => this._closeView()
    };
		return(
      <View style={styles.nav}>
        <NavigationBar
          style={styles.navBar}
          title={titleConfig} 
          leftButton={leftButtonConfig}/>
  			<View>
  			  <Text>{this.state.origin} - {this.state.destiantion}</Text>
  	      <ListView
  	        dataSource={this.state.dataSource}
  	        renderRow={this.renderRow.bind(this)} />
          <TouchableHighlight onPress={()=>this._getLaterTrips()}>
            <View>
              <Text>Senare</Text>
            </View>
          </TouchableHighlight>
  		  </View>
      </View>
    )
	}

  _getLaterTrips () {
    var date = new Date(TripStore.getLastDeparture().getTime() + 60000);
    console.log(date);
    TripActions.getTrips(date);
  }

  _goToTrip(idx) {
    this.props.navigator.push({
      sceneConfig: Navigator.SceneConfigs.FloatFromRight,
      component: Trip,
      passProps: { tripIdx: idx }
    });
  }

  _closeView() {
    this.props.navigator.pop();
  }

	_onChange() {
      this.setState({dataSource: ds.cloneWithRows(TripStore.getAll()), origin: TripStore.getOrigin(), destiantion: TripStore.getDestination() });
      console.log(this.state.dataSource);
	}

}


module.exports = Trips;