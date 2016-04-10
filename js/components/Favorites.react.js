import React, {
  Navigator,
  Component,
  Text,
  TextInput,
  TouchableHighlight,
  Modal,
  ListView,
  View,
  TouchableOpacity
} from 'react-native';

var Icon = require('react-native-vector-icons/MaterialIcons');
const AppDispatcher = require('../dispatchers/AppDispatcher');
const styles = require('../styles/MainStyle');
const PlacesStore = require('../stores/PlacesStore');

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class PlaceSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritesList: ds.cloneWithRows(PlacesStore.getFavorites()),
      placeType: this.props.placeType
    };
    this._onChange = this._onChange.bind(this)
  }

  componentDidMount() {
    PlacesStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    PlacesStore.removeChangeListener(this._onChange);
  }

  render() {
      return (
          <View style={{paddingTop: 20}}>
          <Text style={styles.fontBold}>Dina favoriter</Text>
          <ListView
            dataSource={this.state.favoritesList}
            renderRow={(rowData) => this._renderRow(rowData)}
          />
          </View>
    );
  }

  _onChange() {
    this.setState({ favoritesList: ds.cloneWithRows(PlacesStore.getFavorites()) });
  }

  _renderRow(rowData) {
    return (
      <View 
        style={styles.list}>
        <TouchableOpacity 
          onPress={()=>this._removeFavorite(rowData)}>
          <Icon name="star" size={25} color="#FFAE00" />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={()=>this._setPlace(rowData)}>
          <Text style={styles.searchListRowText} >{rowData.name}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  _setPlace(data) {
    if(this.state.placeType === "from") {
      AppDispatcher.dispatch({actionType: "DESIRED_TRIP_SETFROM", from: {id: data.id, name: data.name}});
    }
    else {
      AppDispatcher.dispatch({actionType: "DESIRED_TRIP_SETTO", to: {id: data.id, name: data.name}});
    }
    this._closeView();
  }

  _removeFavorite(data) {
    AppDispatcher.dispatch({actionType: "REMOVE_FAVORITE", favorite: {id: data.id, name: data.name}});
  }

  _closeView() {
    this.props.navigator.pop();
  }

};

module.exports = PlaceSearch;