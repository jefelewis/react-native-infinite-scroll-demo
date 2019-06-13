// Imports: Dependencies
import React, { Component } from "react";
import { Dimensions, View, SafeAreaView, StyleSheet, Text } from 'react-native';

// Screen Dimensions
const { height, width } = Dimensions.get('window');

// Component: Title
export default class Title extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.filterTitleContainer}>
          <Text style={styles.filterTitle}>{this.props.title}</Text>
        </View>
      </View>
    )
  }
}

// Styles
const styles = StyleSheet.create({
  container: {
    height: 'auto',
  },
  filterTitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    marginRight: 16,
    marginTop: 45,
    marginBottom: 7,
    alignItems: 'flex-end',
  },
  filterTitle: {
    alignSelf: 'flex-start',
    fontFamily: 'System',
    fontSize: 36,
    fontWeight: '700',
    color: '#000',
  },
});