import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DummyScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dummy screen</Text>
    </View>
  );
};

export default DummyScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  text: { fontSize: 16, color: '#333' },
});
