import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_KEY = 'f87891d4557a462dbb5201a41155c159';
const API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

export interface Article {
  source: {id: string; name: string};
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export const fetchTopHeadlines = async (): Promise<Article[]> => {
  try {
    const response = await axios.get(API_URL);
    const {articles} = response.data;
    const topHeadlines = articles.slice(0, 100);
    await AsyncStorage.setItem('topHeadlines', JSON.stringify(topHeadlines));
    return topHeadlines;
  } catch (error) {
    console.error('Error fetching top headlines:', error);
    return [];
  }
};

export const getTopHeadlines = async (): Promise<Article[]> => {
  try {
    const headlinesJson = await AsyncStorage.getItem('topHeadlines');
    return headlinesJson ? JSON.parse(headlinesJson) : [];
  } catch (error) {
    console.error('Error retrieving top headlines:', error);
    return [];
  }
};
