// Imports: Dependencies
import React, { Component } from "react";
import { Dimensions, Image, View, SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Screen Dimensions
const { height, width } = Dimensions.get('window');

// Item Selector
export default class ItemSelector extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={styles.container}>
          <Icon name="ios-arrow-forward" size={22} style={styles.arrowForward}/>
          <Text style={styles.titleText}>{this.props.title}</Text>
        </View>
    </TouchableOpacity>
    )
  }
}

// Styles
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width,
    height: 70,
    backgroundColor: '#fff',
    borderColor: '#D4D4D2',
    borderTopWidth: .2,
  },
  arrowForward: {
    color: '#D4D4D2',
    opacity: .8,
    position: 'absolute',
    right: 20,
  },
  titleText: {
    fontFamily: 'System',
    fontSize: 18,
    color: '#000',
    fontWeight: '400',
    marginLeft: 16,
  },
});