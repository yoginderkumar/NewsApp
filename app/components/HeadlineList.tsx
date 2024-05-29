import React from 'react';
import {FlatList} from 'react-native';
import {Article} from '../utils/api';
import HeadlineItem from './HeadlineItem';

interface HeadlineListProps {
  headlines: Article[];
  onPin: (item: Article) => void;
  onDelete: (item: Article) => void;
}

const HeadlineList = ({headlines, onPin, onDelete}: HeadlineListProps) => {
  return (
    <FlatList
      data={headlines}
      keyExtractor={item => item.title}
      renderItem={({item}) => (
        <HeadlineItem item={item} onPin={onPin} onDelete={onDelete} />
      )}
    />
  );
};

export default HeadlineList;
