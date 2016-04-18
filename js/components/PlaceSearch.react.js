import React, {
  Navigator,
  Component,
  Text,
  TextInput,
  TouchableHighlight,
  Modal,
  ListView,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native';


var Icon = require('react-native-vector-icons/MaterialIcons');
const NavigationBar = require('react-native-navbar');
const AppDispatcher = require('../dispatchers/AppDispatcher');
const styles = require('../styles/MainStyle');
const PlatsuppslagActions = require('../actions/PlatsuppslagActions');
const PlacesStore = require('../stores/PlacesStore');
const DesiredTripStore = require('../stores/DesiredTripStore');
const Favorites = require('./Favorites.react')

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class PlaceSearch extends Component {
  constructor(props) {
    super(props);
    AppDispatcher.dispatch({actionType: "LOAD_FAVORITES"});

    var searchString = '';
    if(props.placeType === 'from') {
      searchString = DesiredTripStore.get().from.name;
    }
    else {
      searchString = DesiredTripStore.get().to.name;
    }
    searchString = searchString === null ? '' : searchString;
    this.state = {
      placeType: props.placeType,
      searchString: searchString,
      placeList: ds.cloneWithRows([]),
      favorites: PlacesStore.getFavorites()
    };
    if(this.state.searchString !== '') {
      this._search();
    }
    this._onChange = this._onChange.bind(this)
  }

  componentDidMount() {
    PlacesStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    PlacesStore.removeChangeListener(this._onChange);
  }

  render() {
      const titleSuffix = this.state.placeType === "from" ? "från" : "till";
      const titleConfig = {
        title: 'Välj ' + titleSuffix,
      };
      const leftButtonConfig = {
        title: 'Tillbaka',
        handler: () => this._closeView()
      };

      return (
      <View style={styles.nav}>

        <NavigationBar
          style={styles.navBar}
          title={titleConfig}
          leftButton={this._renderLeftButton()}/>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.searchInput}>
            <TextInput
              style={[styles.searchInput, styles.searchInputText]}
              onChange={(event) => this._setSearchString(event)}
              value={this.state.searchString}
              placeholder='Sök'/>
          </View>
          <ListView
            dataSource={this.state.placeList}
            renderRow={(rowData) => this._renderRow(rowData)}
          />
          <Favorites placeType={this.state.placeType} navigator={this.props.navigator} />
        </ScrollView>
      </View>
    );
  }

  _onChange() {
    this.setState({ placeList: ds.cloneWithRows(PlacesStore.getAll()) });
    this.setState({ favorites: PlacesStore.getFavorites() });
  }

  _setSearchString(event) {
    this.setState({ searchString: event.nativeEvent.text });
    this._search();
  }

  _search() {
    PlatsuppslagActions.search(this.state.searchString);
  }

  _renderRow(rowData) {
    var isFavorite = false;
    for(var i = 0; i < this.state.favorites.length; i++) {
      if(this.state.favorites[i].name === rowData.Name) {
        isFavorite = true;
      }
    }
    var starType = "star-border";
    if(isFavorite) {
      starType = "star";
    }
    return (
      <View 
        style={[styles.list, styles.center]}>
        <TouchableOpacity
          onPress={()=>this._addFavorite(rowData, isFavorite)}>
          <Icon name={starType} size={25} color="#FFAE00" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.changesRow]}
          onPress={()=>this._setPlace(rowData)}>
          <Text style={styles.searchListRowText} >{rowData.Name}</Text>
        </TouchableOpacity>
      </View>

    )
  }

  _setPlace(data) {
    console.log(data.X);
    var lon = data.X.slice(0, 2) + "." + data.X.slice(2, -1);
    console.log(lon);
    var lat = data.Y.slice(0, 2) + "." + data.Y.slice(2, -1);
    if(this.state.placeType === "from") {
      AppDispatcher.dispatch({actionType: "DESIRED_TRIP_SETFROM", from: {id: data.SiteId, name: data.Name, lat: lat, lon: lon }});
    }
    else {
      AppDispatcher.dispatch({actionType: "DESIRED_TRIP_SETTO", to: {id: data.SiteId, name: data.Name, lat: lat, lon: lon }});
    }
    this._closeView();
  }

  _addFavorite(data, isFavorite) {
    var lon = data.X.slice(0, 2) + "." + data.X.slice(2, -1);
    var lat = data.Y.slice(0, 2) + "." + data.Y.slice(2, -1);
    if(isFavorite) {
      AppDispatcher.dispatch({actionType: "REMOVE_FAVORITE", favorite: {id: data.SiteId, name: data.Name, lat: lat, lon: lon }});
    }
    else {
      AppDispatcher.dispatch({actionType: "ADD_FAVORITE", favorite: {id: data.SiteId, name: data.Name, lat: lat, lon: lon }});
    }
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

};

module.exports = PlaceSearch;