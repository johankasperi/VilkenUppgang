import React, {
  Component,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  Navigator
} from 'react-native';

const styles = require('../styles/MainStyle');
const PlatsuppslagActions = require('../actions/PlatsuppslagActions');
const PlacesStore = require('../stores/PlacesStore');

function getPlaceItems(place) {
  return (
    <Text>
      {place.Name}
    </Text>
  );
}

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      placeResult: []
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
      <Navigator
        renderScene={this.renderScene.bind(this)}
        navigator={this.props.navigator} />
    );
  }

  renderScene (route, navigator) {
    var placeItems = this.state.placeResult.map(getPlaceItems);
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          onChange={this._search.bind(this)}
          placeholder='Från'/>
        <TextInput
          style={styles.searchInput}
          onChange={this._search.bind(this)}
          placeholder='Till'/>
        <View style={styles.flowRight}>
          <TouchableHighlight style={styles.button}>
            <Text style={styles.buttonText}>Senast framme</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.buttonInactive} key={"departure"} onPress={this._setTimeType.bind(this)}>
            <Text style={styles.buttonText}>Tidigast åka</Text>
          </TouchableHighlight>
        </View>
        <TouchableHighlight style={styles.button} onPress={this._goToSearchResult.bind(this)}>
          <Text style={styles.buttonText}>Sök</Text>
        </TouchableHighlight>
        {placeItems}
      </View>
      )
  }

  _onChange() {
    this.setState({placeResult: PlacesStore.getAll() });
  }

  _search(event) {
    this.setState({searchString: event.nativeEvent.text });
    PlatsuppslagActions.search(this.state.searchString);
  }

  _setTimeType(event) {
    console.log(this);
    console.log(event.nativeEvent);
  }

  _goToSearchResult() {
    this.props.navigator.push({
      id: 'SearchResult'
    });
  }

};

module.exports = Search;