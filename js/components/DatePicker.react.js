import React, {
  Component,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import DateTimePicker from 'react-native-datetime';

const AppDispatcher = require('../dispatchers/AppDispatcher');

class DatePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
    };

    this.picker = null;
    this._showDatePicker = this._showDatePicker.bind(this);
    this._showTimePicker = this._showTimePicker.bind(this);
  }

  render() {
    return (
      <View>
          <Text style={{textAlign: 'center'}}>
              {this.state.date.toString()}
          </Text>
          <TouchableHighlight onPress={this._showDatePicker}><Text>showDatePicker</Text></TouchableHighlight>
          <TouchableHighlight onPress={this._showTimePicker}><Text>showTimePicker</Text></TouchableHighlight>
          <DateTimePicker cancelText="Cancel" okText="OK" ref={(picker)=>{this.picker=picker}} />
      </View>
    );
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

};

module.exports = DatePicker;