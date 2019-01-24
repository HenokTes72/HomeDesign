import React from 'react';
import { Icon } from 'native-base';

import Colors from '../constants/Colors';

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Icon
        type={this.props.type}
        name={this.props.name}
        size={26}
        style={this.props.focused ? { color: Colors.tabIconSelected, marginBottom: -3 } : { color: Colors.tabIconDefault, marginBottom: -3 }}
      />
    );
  }
}