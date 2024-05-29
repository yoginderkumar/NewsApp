import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Article} from '../utils/api';
import HeadlineList from './HeadlineList';

interface PinnedHeadlinesProps {
  pinnedHeadlines: Article[];
  onUnpin: (item: Article) => void;
}

const PinnedHeadlines = ({pinnedHeadlines, onUnpin}: PinnedHeadlinesProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pinned Headlines</Text>
      <HeadlineList
        headlines={pinnedHeadlines}
        onPin={() => {}}
        onDelete={onUnpin}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default PinnedHeadlines;
