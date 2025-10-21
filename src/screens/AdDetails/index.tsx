import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';

type AdDetailsRouteProp = RouteProp<RootStackParamList, 'AdDetails'>;

const AdDetailsScreen = () => {
  const route = useRoute<AdDetailsRouteProp>();
  const { adId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ad Details</Text>
      <Text style={styles.text}>Ad ID: {adId}</Text>
    </View>
  );
};

export default AdDetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  text: { fontSize: 16, color: '#333' },
});
