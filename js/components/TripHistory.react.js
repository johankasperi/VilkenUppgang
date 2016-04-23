import React, {
  Component,
  Text,
  ListView,
  View,
  TouchableHighlight,
  Navigator
} from 'react-native';

const Icon = require('react-native-vector-icons/MaterialIcons');
const AppDispatcher = require('../dispatchers/AppDispatcher');
const styles = require('../styles/MainStyle');
const DesiredTripStore = require('../stores/DesiredTripStore');
const Trips = require('../components/Trips.react');

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class TripHistory extends Component {
  constructor(props) {
    super(props);
    AppDispatcher.dispatch({ actionType: "DESIRED_TRIP_LOADSTORAGE"});
    this.state = {
      showHistory: DesiredTripStore.getAllStored().length > 0,
      tripHistoryList: ds.cloneWithRows(DesiredTripStore.getAllStored()),
    };
    this._onChange = this._onChange.bind(this)
  }

  componentDidMount() {
    DesiredTripStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    DesiredTripStore.removeChangeListener(this._onChange);
  }

  render() {
      if(this.state.showHistory) {
        return (
          <View style={{paddingTop: 20}}>
            <Text style={styles.fontBold}>Tidigare resor</Text>
            <ListView
              dataSource={this.state.tripHistoryList}
              renderRow={(rowData) => this._renderRow(rowData)}
            />
          </View>
        );
      }
      else {
        return (<View></View>);
      }

  }

  _renderRow(rowData) {
    return (
      <TouchableHighlight onPress={()=>this._setActive(rowData.id)} underlayColor="#FFFFFF">
        <View style={styles.row}>
          <View style={styles.left}>
            <Text style={styles.centerText}>{this._formatPlaceName(rowData.from.name)}</Text>
          </View>
          <View style={[styles.tripsColumnMid, styles.changesRow]}><Icon name="trending-flat" size={30} color="#CCCCCC"></Icon></View>
          <View style={styles.right}>
            <Text style={styles.centerText}>{this._formatPlaceName(rowData.to.name)}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  _setActive(id) {
    AppDispatcher.dispatch({ actionType: "DESIRED_TRIP_SETFROMSTORAGE", id: id });
    this.props.goToSearchResult();
  }

  _formatPlaceName(name) {
    return name.replace(/ *\([^)]*\) */g, "");
  }

  _onChange() {
    this.setState({ tripHistoryList: ds.cloneWithRows(DesiredTripStore.getAllStored()) });
    this.setState({ showHistory: DesiredTripStore.getAllStored().length > 0 });
  }

};

module.exports = TripHistory;