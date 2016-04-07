import React, {
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC'
  },
  nav: {
    flex: 1,
  },
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 10,
    marginTop: 65,
    alignItems: 'center'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#AAAAAA',
    marginBottom: 10,
    padding: 3,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonActive: {
    backgroundColor: '#48BBEC',
  },
  searchInput: {
    alignSelf: 'stretch',
    height: 36,
    padding: 4,
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#CCCCCC',
  },
  searchInputText: {
    color: '#CCCCCC',
    fontSize: 18,
  },
  searchInputActive: {
    color: '#48BBEC'
  },
  list: {
    alignSelf: 'stretch',
    flex: 1,
    flexDirection: 'row',
  },
  searchListRow: {
    alignSelf: 'stretch',
    height: 36,
  },
  searchListRowText: {
    fontSize: 18
  }
});

module.exports = styles;