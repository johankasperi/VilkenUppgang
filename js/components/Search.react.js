import React, {
  Component,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

const styles = require('../styles/MainStyle');
const PlatsuppslagActions = require('../actions/PlatsuppslagActions');
const PlacesStore = require('../stores/PlacesStore');

function getSearchItems(resultItem) {
  return (
    <Text>
      {resultItem.Name}
    </Text>
  );
}

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      searchResult: []
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
    var searchResult = this.state.searchResult.map(getSearchItems);
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
        <TouchableHighlight style={styles.button}>
          <Text style={styles.buttonText}>Sök</Text>
        </TouchableHighlight>
        {searchResult}
      </View>
    );
  }

  _onChange() {
    console.log(PlacesStore.getAll());
    this.setState({searchResult: PlacesStore.getAll() });
  }

  _search(event) {
    this.setState({searchString: event.nativeEvent.text });
    PlatsuppslagActions.search(this.state.searchString);
  }

};

module.exports = Search;