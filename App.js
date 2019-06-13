// Imports: Dependencies
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Imports: Screens
import InfiniteScroll from './screens/InfiniteScroll';

// React Native: App
export default function App() {
  return (
    <View style={styles.container}>
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      <InfiniteScroll />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
