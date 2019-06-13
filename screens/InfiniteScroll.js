// Imports: Dependencies
import React, { Component } from "react";
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native';

// Screen Dimensions
const { height, width } = Dimensions.get('window');

// Screen: InfiniteScroll
export default class InfiniteScroll extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Infinite Scroll</Text>
      </SafeAreaView>
    )
  }
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: '400',
    color: '#222222',
  },
});