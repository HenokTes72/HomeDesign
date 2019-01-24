import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Homes',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      type="Ionicons"
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-home'
          : 'md-home'
      }
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Flatemates',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      type="Ionicons"
      name={Platform.OS === 'ios' ? 'ios-contacts' : 'md-contacts'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Message',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      type="MaterialIcons"
      focused={focused}
      name="message"
    />
  ),
};

const MoreStack = createStackNavigator({
  More: SettingsScreen,
});

MoreStack.navigationOptions = {
  tabBarLabel: 'More',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      type="Ionicons"
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-more' : 'md-more'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
  MoreStack,
}, {
    tabBarOptions: {
      style: {
        borderTopColor: 'transparent',
        shadowOpacity: 1,
        shadowRadius: 2,
        shadowColor: 'red',
        shadowOffset: {
          width: 10,
          height: 10
        },
        elevation: 10
      },
    }
  });
