/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text, Image, useWindowDimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import BookItem from '../Components/BookItem';
import UIInput from '../Components/UIInput';
import { PRIMARY_COLOR } from '../Constants';
import { getBooksFor } from '../Store/actions/books';
import SearchIcon from '../../assets/svg/SearchIcon.svg';
import Cancel from '../../assets/svg/Cancel.svg';
import Toast from 'react-native-toast-message';

const DashboardScreen = ({ navigateToScreen }) => {
  //get the populated books
  const books = useSelector(state => state.booksProvider.books);
  const [isLoading, setLoading] = useState(false);

  //navigateToScreen is our custom navigator.
  //you can pass props to the next screen such the item information
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => navigateToScreen({index: 1, props: {item}})}>
        <BookItem book={item} />
      </TouchableOpacity>);
  };
  return (
     <View style={{height: '100%'}}>
       <FlatList
         ListHeaderComponentStyle={styles.header}
         ListHeaderComponent={<ListHeader setLoading={setLoading}/>}
         contentContainerStyle={styles.gridStyle}
         data={books}
         renderItem={renderItem}
         numColumns={2}
         ListFooterComponent={() => isLoading && <ActivityIndicator size="large"/>}/>
      </View>
  );
};

const ListHeader = ({ setLoading }) => {
  const { width } = useWindowDimensions();
  const [searchQuery, setSearchQuery] = useState();
  //we need some user info such as the name
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  //if search query is empty. Clear the books result.
  useEffect(() => {
    if (searchQuery === '') {
      dispatch({type: 'clear'});
    }
  }, [searchQuery, dispatch]);


  const _onSearchInputChange = useCallback((value) => {
    setSearchQuery(value);
  }, [setSearchQuery]);

  //Search for the entered query
  const _onSubmitSearch = useCallback(() => {
    setLoading(true);
    const _onFail = (err) => {
      setLoading(false);
      Toast.show({
        type: 'errorToast',
        visibilityTime: 3000,
        bottomOffset: 20,
        position: 'bottom',
        props: {
          message: err,
        },
      });
    };
    dispatch(getBooksFor(searchQuery))
      .then(_ => setLoading(false))
      .catch(_onFail);
  }, [searchQuery, dispatch, setLoading]);

  //Just set query to empty
  const _onPressCancel = useCallback(() => {
    setSearchQuery('');
  }, [setSearchQuery]);

  //render different icon by checking if query is empty or not
  const renderIcon = () => {
    return (
      <View style={{ marginLeft: 10 }}>
        {searchQuery ? <TouchableOpacity onPress={_onPressCancel}>
                        <Cancel width={25} height={25}/>
                       </TouchableOpacity>
                     : <SearchIcon width={30} height={30} /> }
      </View>
    );
  };

  return (
    <View style={styles.headerWrapper}>
      <View style={[styles.header, { width: width * 0.8 }]}>
        <Text style={styles.fontStyle}>Hello, {user.name}!</Text>
        <View style={{ height: 45, width: 45, borderRadius: 25, overflow: 'hidden' }}>
          <Image source={{ uri: user.photo }} resizeMode="cover" style={styles.profileStyle} />
        </View>
      </View>
      <View style={styles.searchViewWrappper}>
        <UIInput style={styles.searchContainer} placeholder="Search for an author" onChangeInputHandler={_onSearchInputChange} value={searchQuery} onSubmit={_onSubmitSearch} icon={renderIcon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gridStyle: {
    alignItems: 'center',
  },
  fontStyle: {
    fontSize: 26,
    color: '#000',
    fontWeight: 'bold',
  },
  header: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchViewWrappper: {
    padding: 15,
    alignItems: 'center',
  },
  searchContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 12,
    borderRadius: 12,
    margin: 10,
    borderBottomWidth: 0,
  },
  profileStyle: {
    width: '100%',
    height: '100%',
  },
  headerWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 12,
    padding: 8,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 30,
  },
});
export default DashboardScreen;
