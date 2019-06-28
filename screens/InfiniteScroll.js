// Imports: Dependencies
import React, { Component } from "react";
import { ActivityIndicator, Dimensions, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { database } from '../App';

// Imports: Components
import ItemSelector from '../components/ItemSelector';
import Title from '../components/Title';

// Screen Dimensions
const { height, width } = Dimensions.get('window');

// Screen: InfiniteScroll
export default class InfiniteScroll extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      documentData: [],
      limit: 9,
      lastVisible: null,
      loading: false,
      refreshing: false,
    };
  }

  // Component Did Mount
  componentDidMount = async () => {
    try {
      // Cloud Firestore: Initial Query (Infinite Scroll)
      this.retrieveData()
    }
    catch (error) {
      console.log(error);
    }
  }

  // Retrieve Data
  retrieveData = async () => {
    try {
      console.log('Retrieving Data');

      // Set State: Loading
      this.setState({ loading: true });

      // Cloud Firestore: Query
      let initialQuery = await database.collection('users')
        .where('id', '<=', 20)
        .orderBy('id')
        .limit(this.state.limit)

      // Cloud Firestore: Query Snapshot
      let documentSnapshots = await initialQuery.get();

      // Cloud Firestore: Document Data
      let documentData = documentSnapshots.docs.map(document => document.data());
      console.log('Document Data');
      console.log(documentData);

      // Cloud Firestore: Last Visible Document (To Start From For Proceeding Queries)
      let lastVisible = documentData[documentData.length - 1].id;
      console.log('Last Visible ID');
      console.log(lastVisible);

      // Set State
      this.setState({
        documentData: documentData,
        lastVisible: lastVisible,
        loading: false,
      });

      console.log('State: Document Data');
      console.log(this.state.documentData);

      console.log('State: Last Visible ID');
      console.log(this.state.lastVisible);

      console.log('State: Loading');
      console.log(this.state.loading);
    }
    catch (error) {
      console.log(error);
    }
  };

  // Retrieve More
  retrieveMore = async () => {
    try {
      console.log('Retrieving additional Data');

      // Set State: Refreshing
      this.setState({ refreshing: true });

      // Check If Last Visible Exists
      console.log('Retrieving More Last Visible');
      console.log(this.state.lastVisible);

      // Cloud Firestore: Query (Additional Query)
      let additionalQuery = await database.collection('users')
        .where('id', '<=', 20)
        .orderBy('id')
        .startAfter(this.state.lastVisible)
        .limit(this.state.limit)

      // Cloud Firestore: Query Snapshot
      let documentSnapshots = await additionalQuery.get();

      // Cloud Firestore: Document Data
      let documentData = documentSnapshots.docs.map(document => document.data());
      console.log('Document Data');
      console.log(documentData);

      // Cloud Firestore: Last Visible Document (To Start From For Proceeding Queries)
      let lastVisible = documentData[documentData.length - 1].id;
      console.log('Last Visible Id');
      console.log(lastVisible);

      // Set State
      this.setState({
        documentData: [...this.state.documentData, ...documentData],
        lastVisible: lastVisible,
        refreshing: false,
      });
    }
    catch (error) {
      console.log(error);
    }
  };

  // Render Header
  renderHeader = () => {
    try {
      return (
        <Title title="Items" />
      )
    }
    catch (error) {
      console.log(error);
    }
  };

  // Render Footer
  renderFooter = () => {
    try {
      // Check If Loading
      if (this.state.loading || this.state.refreshing) {
      // if (this.state.loading) {
        return (
          <View style={styles.activityIndicator}>
            <ActivityIndicator />
          </View>
        )
      }
      else {
        return null;
      }
    }
    catch (error) {
      console.log(error);
    }
  };

  // Select Item
  selectItem = (item) => {
    try {
      console.log(`Selected: ${item.first_name}`)
    }
    catch(error) {
      console.log(error);
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          // Data 
          data={this.state.documentData}
          // Render Items
          renderItem={({ item }) => (
            <ItemSelector
              item={item}
              // onPress={() => {this.selectItem(item)}}
            />
          )}
          // Element Key
          keyExtractor={(item, index) => String(index)}
          // Header (Title)
          ListHeaderComponent={this.renderHeader}
          // Footer (Activity Indicator)
          ListFooterComponent={this.renderFooter}
          // On End Reached (Takes in a function)
          onEndReached={this.retrieveMore}
          // How Close To The End Of List Until Next Data Request Is Made
          onEndReachedThreshold={0}
          // Refreshing (Set To True When End Reached)
          refreshing={this.state.refreshing}
        />
      </SafeAreaView>
    )
  }
}

// Styles
const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
  },
  text: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: '400',
    color: '#222222',
  },
});