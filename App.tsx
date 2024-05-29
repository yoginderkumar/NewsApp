import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import HomeScreen from './app/screens/Home';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={styles.gesture}>
        <HomeScreen />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  gesture: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginTop: 0,
  },
});

export default App;
