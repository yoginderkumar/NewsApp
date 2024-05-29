import React from 'react';
import {View, Button, StyleSheet} from 'react-native';

interface ManualDripTriggerProps {
  onTrigger: () => void;
}

const ManualDripTrigger = ({onTrigger}: ManualDripTriggerProps) => {
  return (
    <View style={styles.container}>
      <Button title="Trigger Manual Drip" onPress={onTrigger} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#ffffff',
    elevation: 4,
  },
});

export default ManualDripTrigger;
