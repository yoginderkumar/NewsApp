import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {Article} from '../utils/api';

interface HeadlineItemProps {
  item: Article;
  onPin: (item: Article) => void;
  onDelete: (item: Article) => void;
}

const HeadlineItem = ({item, onPin, onDelete}: HeadlineItemProps) => {
  const renderRightActions = () => (
    <View style={styles.swipeAction}>
      <Text style={styles.swipeActionText} onPress={() => onPin(item)}>
        Pin
      </Text>
    </View>
  );

  const renderLeftActions = () => (
    <View style={styles.swipeAction}>
      <Text style={styles.swipeActionText} onPress={() => onDelete(item)}>
        Delete
      </Text>
    </View>
  );

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      renderLeftActions={renderLeftActions}>
      <View style={styles.container}>
        <Image source={{uri: item.urlToImage}} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.metadataContainer}>
            <Text style={styles.author}>{item.author}</Text>
            <Text style={styles.publishedAt}>{item.publishedAt}</Text>
          </View>
        </View>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  metadataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  sourceIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  author: {
    fontSize: 14,
    color: '#666666',
    marginRight: 8,
  },
  publishedAt: {
    fontSize: 12,
    color: '#999999',
  },
  swipeAction: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#cccccc',
  },
  swipeActionText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default HeadlineItem;
