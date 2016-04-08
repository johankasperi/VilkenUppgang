'use strict';

var React = require('react-native');
var {
	View,
	Text,
	ListView,
	TouchableHighlight
} = React;

var TripActions = require('../actions/TripActions');
var TripStore = require('../stores/TripStore');
var styles = require('../styles/MainStyle');
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var i = 0;

class Trips extends React.Component {

	constructor(props) {
		TripActions.getTrips();
		super(props);
    	this.state = {
      		dataSource: ds.cloneWithRows(TripStore.getAll()),
      		origin:"",
      		destiantion:""
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
		var trip = [];
		if(!Array.isArray(rowData.LegList.Leg)) {
			trip.push(rowData.LegList.Leg)
		}
		else {
			trip = rowData.LegList.Leg;
		}
	    return (
	      <TouchableHighlight
	          underlayColor='#dddddd'>
	        <View>
	          <Text>{this.tripChanges(trip)}</Text>
	          <Text>{rowData.dur} min</Text>
	        </View>
	      </TouchableHighlight>
	    );
  	}

  	tripChanges(trip) {
  		var changes = "";
  		for(var i=0; i<trip.length;i++) {
  			changes = changes + trip[i].type + " - ";
  		}
  		return changes;
  	}

	render() {
		return(
			<View style={styles.container}>
			  <Text>{this.state.origin} - {this.state.destiantion}</Text>
		      <ListView style={styles.list}
		        dataSource={this.state.dataSource}
		        renderRow={this.renderRow.bind(this)} />
		    </View>
        )
	}

	_onChange() {
      this.setState({dataSource: ds.cloneWithRows(TripStore.getAll()),origin: TripStore.getOrigin(), destiantion: TripStore.getDestination() });
      console.log(this.state.dataSource);
	}

}


module.exports = Trips;