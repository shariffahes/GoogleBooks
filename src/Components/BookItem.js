import React, { useMemo } from 'react';
import { View, StyleSheet, Text, Image, useWindowDimensions } from 'react-native';
import StarIcon from '../../assets/svg/StarIcon.svg';
import { PRIMARY_COLOR } from '../Constants';

const BookItem = ({ book }) => {
  const { width } = useWindowDimensions();
  const dynamicStyles = useMemo(() => StyleSheet.create({
    header: {
      width: width * 0.45,
      height: 220,
    },
    footer: {
      backgroundColor: PRIMARY_COLOR,
      width: width * 0.45,
    },
  }), [width]);

  //Any title that exceeds 30 characters will be displayed with ellipsis
  const showEllipse = useMemo(() => {
    return book.title?.length > 30;
  }, [book]);
  return (
    <View style={styles.viewWrapper}>
      <View style={[styles.header, dynamicStyles.header]}>
        <Image source={{uri: book.cover}} style={styles.coverStyle}/>
        <View style={styles.ratingContainer}>
          <StarIcon width={20} height={20} style={styles.starStyle}/>
          <Text style={styles.ratingTextStyle}>{book.rating}</Text>
        </View>
      </View>
      <View style={[styles.footer, dynamicStyles.footer]}>
        <Text style={styles.title}>
          {book.title.substring(0, 30)}{showEllipse && '....'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewWrapper: {
    marginVertical: 6,
  },
  coverStyle: {
    height: '100%',
    width: '100%',
    backgroundColor: PRIMARY_COLOR,
    position: 'relative',
  },
  header: {
    overflow: 'hidden',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    marginHorizontal: 8,
    elevation: 100,
  },
  ratingContainer: {
    backgroundColor: '#eee',
    flexDirection: 'row',
    padding: 4,
    borderRadius: 14,
    bottom: 12,
    left: 7,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingTextStyle: {
    marginHorizontal: 5,
    color: '#000',
    fontSize: 13,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 8,
    padding: 7,
    borderBottomLeftRadius: 13,
    borderBottomRightRadius: 13,
  },
  title: {
    color: '#000',
    fontSize: 13,
    fontWeight: '500',
    width: '70%',
    height: 35,
  },
  date: {
    color: '#000',
    fontSize: 13,
    fontWeight: '500',
  },
  starStyle: {
    color: '#ED8A19',
  },
});
export default BookItem;
