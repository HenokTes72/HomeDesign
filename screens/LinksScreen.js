import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text } from 'native-base';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Flatemates',
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
    flex: 1,
  }
});
