import React, { useCallback, useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, ScrollView,PermissionsAndroid, Platform } from 'react-native';
import UIButton from '../Components/UIButton';
import BackIcon from '../../assets/svg/BackIcon.svg';
import StarIcon from '../../assets/svg/StarIcon.svg';
import { PRIMARY_COLOR } from '../Constants';
import RNFetchBlob from 'rn-fetch-blob';
import HLine from '../Components/HLine';

const PreviewScreen = ({ navigateToScreen, item}) => {

  const authors = useMemo(() => {
    if (!item) {
      return;
    }
    return item.authors?.join(', ') ?? 'UNKNOWN';
  }, [item]);
  const stars = useMemo(() => {
    if (!item) {
      return;
    }
    const starsCount = [];
    const loopCount = item.rating ? parseInt(item.rating, 10) : 0;
    for (var i = 1; i <= 5; i++) {
      if (i <= loopCount) {
        starsCount.push(true);
      } else {
        starsCount.push(false);
      }
    }
    return starsCount;
  }, [item]);

  const downloadFile = useCallback((link, extension) => {
    //get the dirs
    const dirs = RNFetchBlob.fs.dirs;

    //fileCache to download file.
    //Use android download manager. Show a notification. Specify the path.
    //Then fetch the associated book
    console.log(link);
    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:dirs.DownloadDir + `/${item?.title}` + extension,
        description: 'File downloaded by download manager.',
      },
      })
      .fetch('GET', link)
        .then(res => {
          console.log('File saved to path ' + res.path());
        })
        .catch(err => console.log('E', err));
    RNFetchBlob.fs.unlink(dirs.DownloadDir + `/${item?.title}` + extension).then(() => {
      console.log('flushed');
    }).catch(err => console.log(err));

  }, [item]);

  const _onDownloadPressHandler = useCallback((value) => {
    const link = value === 'pdf' ? item.pdfLink : item.epubLink;
    const extension = '.' + value;
    if (Platform.OS === 'ios') {
      downloadFile(link, extension);
    } else {
      try {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'storage title',
            message: 'storage permission', 
          })
          .then(granted => {
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              downloadFile(link, extension);
            } else {
              console.log('no permission');
            }
          });
      } catch (error) {
        console.log('Error', error);
      }
    }
  }, [downloadFile, item]);

  //Due to the way I'm handling navigation. Item might be null for a negligble time.
  //So in order to avoid any errors. return an empty view if this is the case.
  if (!item) {
    return <View/>;
  }
  return (
    <>
    <ScrollView style={styles.mainContainer}>
      <TouchableOpacity style={styles.backButtonStyle}
        onPress={() => navigateToScreen({index: 0})}>
        <BackIcon width={30} height={30}/>
      </TouchableOpacity>
      <View style={styles.header}>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: item.cover }} style={styles.imageStyle} />
        </View>
        <Text style={[styles.commonFontStyle, styles.titleFontStyle]}>
          {item.title}
        </Text>
        <Text style={styles.commonFontStyle}>
          By {authors}
        </Text>
        <View style={styles.starsContainer}>
          { stars.map((star, index) => <StarIcon
                                key={index} width={30} height={20}
                                // eslint-disable-next-line react-native/no-inline-styles
                                style={{color: star ? '#ED8A19' : '#444'}}/>) }
        </View>
        <View style={styles.bottomHeader}>
          <Text>{item.pageCount} pages</Text>
          <View style={styles.circle}/>
          <Text>{item.language}</Text>
        </View>
      </View>
        {item.description &&
          <View style={styles.bodyContainer}>
            <HLine/>
            <View style={styles.bodyTitleWrapper}>
              <Text style={styles.headerFontStyle}>Description</Text>
              <Text style={styles.headerFontStyle}>Free</Text>
            </View>
            <Text style={styles.descriptionText}>{item.description}</Text>
          </View>}
        <View style={styles.buttonContainer}>
          <UIButton title="Download As epub" onPressHandler={() => _onDownloadPressHandler('epub')} disabled={!item.epubLink} buttonStyle={{marginBottom: 0}}/>
          <UIButton title="Download As pdf" onPressHandler={() => _onDownloadPressHandler('pdf')} disabled={!item.pdfLink} />
        </View>
      </ScrollView>
      </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    position: 'relative',
    height: '100%',
  },
  bodyTitleWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    height: 5,
    width: 5,
    borderRadius: 15,
    backgroundColor: 'gray',
    marginHorizontal: 6,
  },
  bottomHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  header: {
    width: '100%',
    paddingTop: 60,
    backgroundColor: PRIMARY_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButtonStyle: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 100,
  },
  imageWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    width: 200,
    height: 280,
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  titleFontStyle: {
    fontSize: 22,
    fontWeight: '500',
    width: '80%',
  },
  headerFontStyle: {
    fontSize: 22,
    color: '#000',
    fontWeight: 'bold',
  },
  commonFontStyle: {
    color: '#000',
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 2,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 6,
    marginBottom: 13,
  },
  bodyContainer: {
    position: 'relative',
    paddingLeft: 10,
    marginHorizontal: 10,
    marginVertical: 8,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  descriptionText: {
    fontSize: 16,
    marginTop: 6,
    lineHeight: 27,
  },
});
export default PreviewScreen;
