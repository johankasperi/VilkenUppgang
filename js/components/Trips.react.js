'use strict';

var React = require('react-native');
var {
	View,
	Text,
	ListView,
	TouchableHighlight,
  Navigator
} = React;

import DateTimePicker from 'react-native-datetime';
const AppDispatcher = require('../dispatchers/AppDispatcher');
var Icon = require('react-native-vector-icons/MaterialIcons');
var NavigationBar = require('react-native-navbar');
var DesiredTripStore = require('../stores/DesiredTripStore');
var TripActions = require('../actions/TripActions');
var TripStore = require('../stores/TripStore');
var Trip = require('./Trip.react');
var styles = require('../styles/MainStyle');
var ActivityIndicator = require('./ActivityIndicator');
//var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var i = 0;

var lineColors = {};
lineColors[10] = "#3B73B9"; //Blå
lineColors[11] = "#3B73B9"; //Blå
lineColors[13] = "#D43A34"; //Röd
lineColors[14] = "#D43A34"; //Röd
lineColors[17] = "#77ae5a"; //Grön
lineColors[18] = "#77ae5a"; //Grön
lineColors[19] = "#77ae5a"; //Grön




class Trips extends React.Component {

	constructor(props) {
		TripActions.getTrips();
		super(props);
    	this.state = {
      		dataSource: new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
          }),
          loaded: false,
      		origin:DesiredTripStore.get().from.name,
      		destiantion:DesiredTripStore.get().to.name,
          date: DesiredTripStore.get().date,
          formattedDate: DesiredTripStore.getFormattedDate(),
          formattedTime: DesiredTripStore.getFormattedTime(),
    	};

    this._onChangeDesiered = this._onChangeDesiered.bind(this)

    this.picker = null;
    this._showDatePicker = this._showDatePicker.bind(this);
    this._showTimePicker = this._showTimePicker.bind(this);
    this._reverseDirection = this._reverseDirection.bind(this);
    this._onChange = this._onChange.bind(this);



	}

	componentDidMount() {
      TripStore.addChangeListener(this._onChange);
      DesiredTripStore.addChangeListener(this._onChangeDesiered);
  	}

	componentWillUnmount() {
	  TripStore.removeChangeListener(this._onChange);
    DesiredTripStore.removeChangeListener(this._onChangeDesiered);
	}

	renderRow(rowData, sectionID, rowID) {
		var trip = rowData.LegList.Leg;
    var lastIdx = trip.length-1;
	    return (
        <TouchableHighlight onPress={()=>this._goToTrip(rowID)} underlayColor="#FFFFFF">
        <View style={styles.tripsRow}>
	        <View style={styles.tripsColumn}>
            <Text>{trip[0].Origin.time}</Text>
	          <View style={styles.changesRow}>{this.tripChanges(trip)}</View>
          </View>
          <View style={styles.tripsColumnMid}><Icon name="trending-flat" size={30} color="#CCCCCC" /></View>
          <View style={styles.tripsColumnRight}>
            <Text>{trip[lastIdx].Destination.time}</Text>
	          <Text style={styles.timeDur}>{rowData.dur} min</Text>
          </View>
        </View>
        </TouchableHighlight>
	    );
  	}

  	tripChanges(trip) {

  		var changes = [];
      var type = "";
  		for(var i=0; i<trip.length;i++) {
        var hide = false;
        if("hide" in trip[i]) {
          if(trip[i].hide === "true") {
            hide = true;
          }
        }
        if(!hide) {
            var shortType = "";
            var color = "#CCCCCC";
            if(trip[i].type === "METRO") {
              color = lineColors[parseInt(trip[i].line)];
              type = "subway";
              shortType = "T";
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
              shortType = "B";
            }
            else if(trip[i].type === "FERRY" || trip[i].type === "SHIP") {
              type = "directions-boat";
            }
            else if(trip[i].type === "WALK") {
              type = "directions-walk";
              shortType = trip[i].dist + "m";
            }
            else if(trip[i].type === "TRAIN") {
              type = "train";
              shortType = "P";
            }
      			changes.push(
              <View style={styles.changesColumn}>
                <Icon name={type} size={20} color={color} />
                <Text style={styles.lineNumber}>{shortType}{trip[i].line}</Text>
              </View>
            );
            if(i < trip.length-1) {
              changes.push(<Icon name="keyboard-arrow-right" size={20} color="#CCCCCC"/>);
            }
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
    var timeType;
    if(DesiredTripStore.get().timeType === "departure") {
      timeType = "Avgår";
    }
    else {
      timeType = "Framme";
    }
    
		return(
      <View style={styles.nav}>
        <NavigationBar
          title={titleConfig} 
          leftButton={this._renderLeftButton()}/>
  			<View style={styles.listContainer}>
  			  <View style={styles.header}>
            <Text style={styles.headerTitle}>{this._formatPlaceName(this.state.origin)} </Text>
            <View><Icon name="trending-flat" size={25} color="#FFFFFF" /></View>
            <Text style={styles.headerTitle}> {this._formatPlaceName(this.state.destiantion)}</Text>
          </View>
  	      {this._renderContent()}
  		  </View>
        <View style={styles.footer}>
          <TouchableHighlight style={styles.footerLeft} underlayColor="#FFFFFF" onPress={()=>this._showDatePicker()}>
            <View style={styles.footerLeft}>
              <Icon name="today" size={25} color="#4F8EF7" />
              <Text style={styles.footerText}>{this.state.formattedDate}</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={styles.footerMid} underlayColor="#FFFFFF" onPress={()=>this._showTimePicker()}>
            <View style={styles.footerMid}>
              <Icon name="access-time" size={25} color="#4F8EF7" />
              <Text style={styles.footerText}>{timeType} {this.state.formattedTime}</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={styles.footerRight} underlayColor="#FFFFFF" onPress={()=>this._reverseDirection()}>
            <View style={styles.footerRight}>
              <Icon style={styles.reverseDir} name="compare-arrows" size={25} color="#4F8EF7" />
              <Text style={styles.footerText}>Byt riktning</Text>
            </View>
          </TouchableHighlight>
        </View>
        <DateTimePicker cancelText="Cancel" okText="Done" ref={(picker)=>{this.picker = picker}} />
      </View>
    )
	}

  _renderContent() {
    if (!this.state.loaded) {
      return (
          <ActivityIndicator />
        )
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}
        renderHeader={this._renderHeader.bind(this)}
        renderFooter={this._renderFooter.bind(this)} />
    )
  }

  _renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Hämtar resan...
        </Text>
      </View>
    );
  }

  _renderHeader() {
    return (
          <TouchableHighlight onPress={()=>this._getEarlierTrips()} underlayColor="#FFFFFF">
            <View style={styles.listFooter}>
              <Icon name="keyboard-arrow-up" size={30} color="#4F8EF7" />
            </View>
          </TouchableHighlight>
      )
  }

  _renderFooter() {
    return (
          <TouchableHighlight onPress={()=>this._getLaterTrips()} underlayColor="#FFFFFF">
            <View style={styles.listFooter}>
              <Icon name="keyboard-arrow-down" size={30} color="#4F8EF7" />
            </View>
          </TouchableHighlight>
      )
  }

  _getEarlierTrips () {
    TripActions.getTrips(TripStore.getFirstArrival(), true);
  }

  _getLaterTrips () {
    TripActions.getTrips(TripStore.getLastDeparture());
  }

  _reverseDirection() {
    this.state.loaded = false;
    var to = DesiredTripStore.get().from;
    var from = DesiredTripStore.get().to;
    this.state.origin = from.name;
    this.state.destiantion = to.name;
    AppDispatcher.dispatch({actionType: "DESIRED_TRIP_SETFROM", from: from});
    AppDispatcher.dispatch({actionType: "DESIRED_TRIP_SETTO", to: to});
    TripActions.getTrips();
  }

  _goToTrip(idx) {
    this.props.navigator.push({
      sceneConfig: Navigator.SceneConfigs.FloatFromRight,
      component: Trip,
      passProps: { tripIdx: idx }
    });
  }

  _showDatePicker() {
    var date = this.state.date;
    this.picker.showDatePicker(date, (d) => {
      this.state.loaded = false;
      AppDispatcher.dispatch({ actionType: "DESIRED_TRIP_SETDATE", date: d });
      this.setState({ date: d });
      TripActions.getTrips();
    });
  }

  _showTimePicker() {
    var date = this.state.date;
    this.picker.showTimePicker(date, (d) => {
      this.state.loaded = false;
      AppDispatcher.dispatch({ actionType: "DESIRED_TRIP_SETDATE", date: d });
      this.setState({ date: d });
      TripActions.getTrips();
    });
  }

  _closeView() {
    this.props.navigator.pop();
  }

	_onChange() {
      this.setState({dataSource: this.state.dataSource.cloneWithRows(TripStore.getAll()), loaded: true, origin: TripStore.getOrigin(), destiantion: TripStore.getDestination() });
	}
  _onChangeDesiered() {
    this.setState({formattedDate: DesiredTripStore.getFormattedDate(), formattedTime: DesiredTripStore.getFormattedTime() });
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

  _formatPlaceName(name) {
    return name.replace(/ *\([^)]*\) */g, "");
  }

}


module.exports = Trips;