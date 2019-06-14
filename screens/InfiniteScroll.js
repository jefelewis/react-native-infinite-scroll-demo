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
        // .where('first_name', '==', `${this.props.item_name}`)
        .orderBy('first_name')
        // .limit(this.state.limit)
        .limit(3)

      // Cloud Firestore: Query Snapshot
      let documentSnapshots = await initialQuery.get();
      console.log(`Document Snapshot: ${documentSnapshots.exists()}`)

      // Cloud Firestore: Document Data
      let documentData = documentSnapshots.docs.map(document => document.data());
      console.log('Document Data');
      console.log(documentData);

      // Cloud Firestore: Last Visible Document (To Start From For Proceeding Queries)
      let lastVisible = documentData[documentData.length - 1];
      console.log('Last Visible');
      console.log(typeof lastVisible);
      console.log(lastVisible);

      // Set State
      this.setState({
        data: documentData,
        lastVisible: lastVisible,
        visibles: [...this.state.visibles, lastVisible],
        loading: false,
        refreshing: false,
      });

      console.log('Last Visible');
      console.log(this.state.visibles);
      // console.log(typeof this.state.lastVisible);
      // console.log(this.state.lastVisible);
      // console.log(this.state.visibles[this.state.visibles.length - 1]);

      console.log('FUCK');
      console.log('FUCK');

      console.log(`Limit (Initial): ${this.state.limit}`)
      // Update Limit?
      this.setState({
        limit: this.state.limit + this.state.limit,
      })

      console.log(`Limit (Initial & Updated): ${this.state.limit}`)
      
      // this.setState({ loading: false });
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
      console.log(`Selected: ${item.item_name}`)
    }
    catch(error) {
      console.log(error);
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {/* <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ItemSelector
              item={item.item_name}
              onPress={() => {this.selectItem(item)}}
            />
          )}
          keyExtractor={(item, index) => String(index)}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          // onEndReached={()=> this.retrieveMore}
          onEndReached={() => {
            if (this.state.loading === false) {
              // this.retrieveMore();
              // Change Back And Uncomment the Following Line!!!!
              this.retrieveData();
            }
          }}          
          onEndReachedThreshold={0}
        /> */}

        <Text>Hi</Text>
        {this.retrieveData()}

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