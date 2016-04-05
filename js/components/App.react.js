var React = require('react');
var DesiredTravelStore = require('../stores/DesiredTravelStore');

var App = React.createClass({

  componentDidMount: function() {
    DesiredTravelStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    DesiredTravelStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
      <div>
        "hej"
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the TodoStore
   */
  _onChange: function() {
    console.log("change");
  }

});

module.exports = App;