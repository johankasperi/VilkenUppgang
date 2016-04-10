import React, {
  Component,
  Text,
  ListView,
  View,
  TouchableOpacity
} from 'react-native';

const AppDispatcher = require('../dispatchers/AppDispatcher');
const styles = require('../styles/MainStyle');
const DesiredTripStore = require('../stores/DesiredTripStore');

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
          <View>
          <Text>Tidigare resor</Text>
          <ListView
            style={styles.list}
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
      <View
        style={styles.list}>
        <TouchableOpacity 
          onPress={()=>this._setActive(rowData.id)}>
          <Text>{rowData.from.name + " > " + rowData.to.name}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  _setActive(id) {
    console.log("setactive");
    AppDispatcher.dispatch({ actionType: "DESIRED_TRIP_SETFROMSTORAGE", id: id });
  }

  _onChange() {
    console.log("history on change");
    this.setState({ tripHistoryList: ds.cloneWithRows(DesiredTripStore.getAllStored()) });
    this.setState({ showHistory: DesiredTripStore.getAllStored().length > 0 });
  }

};

module.exports = TripHistory;