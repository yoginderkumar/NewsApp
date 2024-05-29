import React, {useState, useEffect, useCallback, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Header,
  HeadlineList,
  ManualDripTrigger,
  PinnedHeadlines,
} from '../components';
import {Article, fetchTopHeadlines, getTopHeadlines} from '../utils/api';

const HomeScreen = () => {
  const [headlines, setHeadlines] = useState<Article[]>([]);
  const [allHeadlines, setAllHeadlines] = useState<Article[]>([]);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [pinnedHeadlines, setPinnedHeadlines] = useState<Article[]>([]);

  const resetAndFetchHeadlines = useCallback(async () => {
    try {
      await AsyncStorage.removeItem('topHeadlines');
      const freshHeadlines = await fetchTopHeadlines();
      setAllHeadlines(freshHeadlines);
      setHeadlines(freshHeadlines.slice(0, 10));
      const dripInterval = setInterval(() => {
        const newHeadlines = [
          ...freshHeadlines.slice(10, 15),
          ...freshHeadlines.slice(0, 10),
        ];
        setHeadlines(newHeadlines);

        if (newHeadlines.length === 10) {
          clearInterval(dripInterval);
          resetAndFetchHeadlines();
        }
      }, 10000);

      return dripInterval;
    } catch (error) {
      console.error('Error resetting and fetching headlines:', error);
    }
  }, []);

  const handlePinHeadline = useCallback((headline: Article) => {
    setPinnedHeadlines(prev => [...prev, headline]);
    setHeadlines(prev => prev.filter(h => h !== headline));
  }, []);

  const handleUnpinHeadline = useCallback((headline: Article) => {
    setPinnedHeadlines(prevPinned => prevPinned.filter(h => h !== headline));
    setHeadlines(prevHeads => [headline, ...prevHeads]);
  }, []);

  const handleDeleteHeadline = useCallback((headline: Article) => {
    setHeadlines(prev => prev.filter(h => h !== headline));
  }, []);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const storedHeadlines = await getTopHeadlines(); // Attempts to fetch stored headlines first
        if (storedHeadlines.length === 0) {
          // No stored headlines, fetch from API
          const freshHeadlines = await fetchTopHeadlines();
          setAllHeadlines(freshHeadlines);
          setHeadlines(freshHeadlines.slice(0, 10));
        } else {
          // Use stored headlines
          setAllHeadlines(storedHeadlines);
          setHeadlines(storedHeadlines.slice(0, 10));
        }
        setIsInitialized(true);
      } catch (error) {
        console.error('Error initializing app:', error);
      }
    };
    initializeApp();
  }, []);

  const startDripTimer = useCallback(
    (heads: Article[]) => {
      const dripInterval = setInterval(() => {
        const newHeadlines = [...heads.slice(10, 15), ...heads.slice(0, 10)];
        setHeadlines(newHeadlines);

        if (newHeadlines.length === 10) {
          clearInterval(dripInterval);
          resetAndFetchHeadlines();
        }
      }, 10000);

      return dripInterval;
    },
    [resetAndFetchHeadlines],
  );

  const handleManualDripTrigger = useCallback(() => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = startDripTimer(allHeadlines);
    }
  }, [allHeadlines, startDripTimer]);

  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (isInitialized) {
      startDripTimer(allHeadlines);
    }
  }, [allHeadlines, isInitialized, startDripTimer]);

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <PinnedHeadlines
        pinnedHeadlines={pinnedHeadlines}
        onUnpin={handleUnpinHeadline}
      />
      <View style={styles.listContainer}>
        <HeadlineList
          headlines={headlines}
          onPin={handlePinHeadline}
          onDelete={handleDeleteHeadline}
        />
      </View>
      <ManualDripTrigger onTrigger={handleManualDripTrigger} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});

export default HomeScreen;
