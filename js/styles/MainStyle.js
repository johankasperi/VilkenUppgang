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
    backgroundColor: "#FFFFFF",
  },
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 10,
  },
  wrap: {
    flexWrap: 'wrap',
    flex: 1,
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  flowItemLeft: {
    marginRight: 7.5
  },
  flowItemRight: {
    marginLeft: 7.5
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
    backgroundColor: '#CCCCCC',
    marginBottom: 10,
    padding: 3,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  fontBold: {
    fontWeight: 'bold',
  },
  buttonActive: {
    backgroundColor: '#4F8EF7',
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
    color: '#4F8EF7'
  },
  list: {
    alignSelf: 'stretch',
    flex: 1,
    flexDirection: 'row',
  },
  center: {
    alignItems: 'center',
  },
  leftNavButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchListRow: {
    alignSelf: 'stretch',
    height: 36,
  },
  searchListRowText: {
    fontSize: 18,
  },
  centerText: {
    textAlign: 'center'
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
  footerMid: {
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
  },
  reverseDir: {
    transform: [{rotate: '90deg'}],
  },
  timeline: {
    marginTop: 20,
    borderLeftColor: "#000000",
    borderLeftWidth: 1,
  },
  changesContainer: {
    padding: 10,
    flex: 1,
  },
  journeyDetails: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  originTitle: {
    backgroundColor: 'rgba(0,0,0,0)',
    paddingTop: 5,
  },
  firstOriginTitle: {
    backgroundColor: 'rgba(0,0,0,0)',
    marginTop: -10,
    fontSize: 15,
    fontWeight: 'bold',
  },
    destinationTitle: {
      paddingBottom: 5,
  },
  lastDestinationTitle: {
    backgroundColor: 'rgba(0,0,0,0)',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: -13,
  },
  changeContainer: {
    paddingLeft: 10,
  },
  bulletPoint: {
    color: '#4F8EF7',
    backgroundColor: 'rgba(0,0,0,0)',
    marginLeft: -17,
    marginTop: -15,
    marginBottom: -15,
    fontSize: 30,
  },
  rowContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  activityIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  map: {
    flex: 1,
  },
  mapCont: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 0.7,
    borderBottomColor: '#CCCCCC'
  },
  left: {
    flex: 1,
  },
  right: {
    flex: 1,
  },
  rowContainer: {
    flex: 1,
  },
  tripContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },
  tripRight: {
    flex:1,
    marginLeft: 75,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#CCCCCC",
  },
  firstTripRight: {
    flex:1,
    marginLeft: 75,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#CCCCCC",
  },
  tripLast: {
    flex:1,
    marginLeft: 75,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 0,
    borderLeftWidth: 4,
    borderLeftColor: "#CCCCCC",
  },
  tripLeft: {
    width: 75,
  },
  tripRow: {
    //flex:1,
    flexDirection: "row",
  },
  rightCircle: {
    justifyContent: "flex-start",
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#4F8EF7",
    position: "absolute",
    bottom: 0,
    left: 67,
  },
  firstCircle: {
    justifyContent: "flex-start",
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#4F8EF7",
    position: "absolute",
    top: 0,
    left: 67,
  },
  originTime: {
    position: 'absolute',
    top: -5,
    left: 10,
    fontWeight: 'bold',
    fontSize: 12,
  },
  firstOriginTime: {
    position: 'absolute',
    top: 0,
    left: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  destTime: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    fontSize: 12,
  },
  lastDestTime: {
    position: 'absolute',
    bottom: 0,
    left: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  destText: {
    position: 'absolute',
    bottom: 0,
    left: 95,
    fontSize: 14,
  },
  lastDestText: {
    position: 'absolute',
    bottom: 0,
    left: 95,
    fontWeight: 'bold',
    fontSize: 16,
  },
  originText: {
    position: 'absolute',
    top: 0,
    left: 95,
    fontWeight: 'bold',
    fontSize: 16,
  },

});

module.exports = styles;