import React, {
  PropTypes,
  Navigator,
  Component,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  ListView,
  View
} from 'react-native';
import DateTimePicker from 'react-native-datetime';
const NavigationBar = require('react-native-navbar');
const AppDispatcher = require('../dispatchers/AppDispatcher');
const styles = require('../styles/MainStyle');
const PlatsuppslagActions = require('../actions/PlatsuppslagActions');
const DesiredTripStore = require('../stores/DesiredTripStore');
const PlaceSearch = require('./PlaceSearch.react')

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      from: "Från",
      to: "Till",
      showPlaceModal: false,
      placeType: "from",
      departure: false,
      arrival: true,
      date: new Date(),
    };

    this.picker = null;
    this._showDatePicker = this._showDatePicker.bind(this);
    this._showTimePicker = this._showTimePicker.bind(this);
    this._onChange = this._onChange.bind(this)
  }

  componentDidMount() {
    DesiredTripStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    DesiredTripStore.removeChangeListener(this._onChange);
  }

  render() {
    var titleConfig = {
      title: 'Sök resa',
    };
    return (
      <View style={styles.nav}>
        <NavigationBar
          style={styles.navBar}
          title={titleConfig} />
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.searchInput}
            onPress={this._searchFrom.bind(this)}
            >
            <Text style={styles.searchInputText}>{this.state.from}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.searchInput}
            onPress={this._searchTo.bind(this)}
            >
            <Text style={styles.searchInputText}>{this.state.to}</Text>
          </TouchableOpacity>
          <View style={styles.flowRight}>
            <TouchableHighlight style={[styles.button, this.state.arrival && styles.buttonActive]} onPress={this._setTimeTypeArrival.bind(this)}>
              <Text style={styles.buttonText}>Senast framme</Text>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.button, this.state.departure && styles.buttonActive]} onPress={this._setTimeTypeDeparture.bind(this)}>
              <Text style={styles.buttonText}>Tidigast åka</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.flowRight}>
            <TouchableHighlight style={styles.button, styles.buttonActive} onPress={this._showDatePicker}>
              <Text style={styles.buttonText}>showDatePicker</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button, styles.buttonActive} onPress={this._showTimePicker}>
              <Text style={styles.buttonText}>showTimePicker</Text>
            </TouchableHighlight>
          </View>
          <TouchableHighlight style={[styles.button, styles.buttonActive]}>
            <Text style={styles.buttonText}>Sök</Text>
          </TouchableHighlight>
          <DateTimePicker cancelText="Cancel" okText="Done" ref={(picker)=>{this.picker = picker}} />
        </View>
      </View>
    );
  }

  _searchFrom(event) {
    this.setState({ placeType: "from"});
    this._openPlacesSearch();
  }

  _searchTo(event) {
    this.setState({ placeType: "to"});
    this._openPlacesSearch();
  }

  _openPlacesSearch() {
    this.props.navigator.push({
        sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
        component: PlaceSearch,
        passProps: { placeType: this.state.placeType }
    });
  }

  _setTimeTypeDeparture(event) {
    AppDispatcher.dispatch({ actionType: "setTimeType", timeType: "departure" });
    this.setState({ departure: true });
    this.setState({ arrival: false });
  }

  _setTimeTypeArrival(event) {
    AppDispatcher.dispatch({ actionType: "setTimeType", timeType: "arrival" });
    this.setState({ departure: false });
    this.setState({ arrival: true });
  }

  _showDatePicker() {
    var date = this.state.date;
    this.picker.showDatePicker(date, (d)=>{
      this.setState({date:d});
    });
  }

  _showTimePicker() {
    var date = this.state.date;
    this.picker.showTimePicker(date, (d)=>{
      this.setState({date:d});
    });
  }

  _onChange() {
    var from = DesiredTripStore.get().from;
    var to = DesiredTripStore.get().to;
    if(from.name !== null) {
      this.setState({ from: from.name });
    }
    else {
      this.setState({ from: "Från" });
    }
    if(to.name !== null) {
      this.setState({ to: to.name });
    }
    else {
      this.setState({ to: "Till" });
    }
  }

};

module.exports = Search;