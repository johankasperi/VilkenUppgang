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
          leftButton={leftButtonConfig}/>
        <View style={styles.container}>
          <View style={styles.searchInput}>
            <TextInput
              style={[styles.searchInput, styles.searchInputText]}
              onChange={this._setSearchString.bind(this)}
              value={this.state.searchString}
              placeholder='Sök'/>
          </View>
          <ListView
            style={styles.list}
            dataSource={this.state.placeList}
            renderRow={(rowData) => this._renderRow(rowData)}
          />
          <Favorites placeType={this.state.placeType} navigator={this.props.navigator} />
        </View>
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
      if(this.state.favorites[i].id === rowData.SiteId) {
        isFavorite = true;
      }
    }
    return (
      <View 
        style={styles.list}>
        <TouchableOpacity 
          style={[styles.button, !isFavorite && styles.buttonActive]}
          onPress={()=>this._addFavorite(rowData, isFavorite)}>
          <Text style={styles.buttonText}>Favorite</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={()=>this._setPlace(rowData)}>
          <Text style={styles.searchListRowText} >{rowData.Name}</Text>
        </TouchableOpacity>
      </View>

    )
  }

  _setPlace(data) {
    if(this.state.placeType === "from") {
      AppDispatcher.dispatch({actionType: "setFrom", from: {id: data.SiteId, name: data.Name}});
    }
    else {
      AppDispatcher.dispatch({actionType: "setTo", to: {id: data.SiteId, name: data.Name}});
    }
    this._closeView();
  }

  _addFavorite(data, isFavorite) {
    console.log(isFavorite);
    if(isFavorite) {
      AppDispatcher.dispatch({actionType: "REMOVE_FAVORITE", favorite: {id: data.SiteId, name: data.Name}});
    }
    else {
      AppDispatcher.dispatch({actionType: "ADD_FAVORITE", favorite: {id: data.SiteId, name: data.Name}});
    }
  }

  _closeView() {
    this.props.navigator.pop();
  }

};

module.exports = PlaceSearch;