// Imports: Dependencies
import React, { Component } from "react";
import { ActivityIndicator, Dimensions, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import firebaseConfig from '../config/config';
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
      data: [],
      limit: 3,
      lastVisible: null,
      visibles: null,

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

  // Component Did Update
  // componentDidUpdate(prevProps, prevState) {
  //   const isDifferentPage = this.state.currentPage !== prevState.currentPage
  //   if (isDifferentPage) this.getItems()
  // }

  // Retrieve Data
  retrieveData = async () => {
    try {
      console.log('Retrieving Data');

      // Set State: Loading
      this.setState({ loading: true });

      // Cloud Firestore: Query
      let initialQuery = await database.collection('users')
        .where('id', '<=', '20')
        .orderBy('id')
        // .limit(this.state.limit)
        .limit(3)

      // Cloud Firestore: Query Snapshot
      let documentSnapshots = await initialQuery.get();

      // Cloud Firestore: Document Data
      let documentData = documentSnapshots.docs.map(document => document.data());
      console.log('Document Data');
      console.log(documentData);

      // Cloud Firestore: Last Visible Document (To Start From For Proceeding Queries)
      let lastVisible = documentData[documentData.length - 1];
      console.log('Last Visible');
      console.log(lastVisible);

      // Set State
      this.setState({
        data: documentData,
        lastVisible: lastVisible,
        // visibles: [...this.state.visibles, lastVisible],
        loading: false,
        refreshing: false,
      });      
    }
    catch (error) {
      console.log(error);
    }
  }

  // Retrieve More
  retrieveMore = async () => {
    try {
      console.log('Retrieving additional Data');

      // Set State: Refreshing
      this.setState({ refreshing: true });
    }
    catch (error) {
      console.log(error);
    }
  }

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
      if (this.state.loading) {
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
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          // Data takes in an array
          data={this.state.data}
          // Render Items
          renderItem={({ item }) => (
            <ItemSelector
              item={item.first_name}
              onPress={() => {this.selectItem(item)}}
            />
          )}
          // Element Key
          keyExtractor={(item, index) => String(index)}
          // Header (Title)
          ListHeaderComponent={this.renderHeader}
          // Footer (Activity Indicator)
          ListFooterComponent={this.renderFooter}
          // On End Reached takes in a function
          onEndReached={() => {
            if (this.state.loading === false) {
              // this.retrieveMore();
              // Change Back And Uncomment the Following Line!!!!
              this.retrieveData();
            }
          }}
          // How Close To The End Of List Until Next Data Request Is Made
          onEndReachedThreshold={0}
        />

        <Text>Hi</Text>

        {/* <ItemSelector title="Fuck" />
        <ItemSelector title="This" />
        <ItemSelector title="Shit" />
        <ItemSelector title="Think" />
        <ItemSelector title="About" />
        <ItemSelector title="The" />
        <ItemSelector title="Money" /> */}
      </SafeAreaView>
    )
  }
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
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