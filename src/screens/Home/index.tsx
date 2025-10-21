import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useNavigation } from '@react-navigation/native';

const ads = [
  { id: '1', title: 'Toyota Corolla 2022', price: '$22,000' },
  { id: '2', title: 'Honda Civic 2023', price: '$24,500' },
  { id: '3', title: 'Suzuki Alto 2021', price: '$12,000' },
];

const HomeScreen = () => {
  const navigation = useNavigation<any>();

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('AdDetails', { adId: item.id })}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlashList
        data={ads}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
  },
  title: { fontSize: 18, fontWeight: '600' },
  price: { color: '#555', marginTop: 4 },
});
