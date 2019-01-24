import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text } from 'native-base';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json',
  };

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentCont}>
        <Text>Flatemates</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  contentCont: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
});
