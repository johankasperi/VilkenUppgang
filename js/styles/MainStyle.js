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
  },
  datePickerWrap: {
    flex: 1
  },
  tripsColumn: {
    flex: 1,
    flexDirection: 'column',

  },
  tripsColumnMid: {
    padding: 10,
  },
  tripsColumnRight: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  tripsRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 0.7,
    borderBottomColor: '#CCCCCC'
  },
  listContainer: {
    flex: 1,
  },
  listFooter: {
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
      height: -3,
      width: 0
    },
  },
  footerRight: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  footerLeft: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  footerText: {
    fontSize: 12,
  },
  header: {
    backgroundColor: '#4F8EF7',
    height: 50,
    justifyContent:'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
      height: 3,
      width: 0
    },
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  changesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  changesColumn: {
    paddingRight: 5,
    alignItems: 'center',
  },
  lineNumber: {
    fontSize: 11,
  },
  timeDur: {
    fontWeight: 'bold',
  }
});

module.exports = styles;