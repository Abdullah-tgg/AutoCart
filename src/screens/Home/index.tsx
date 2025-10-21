import React from 'react';
import { StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useNavigation } from '@react-navigation/native';
import AdCard from '../../components/AdCard';
import carData from '../../data.json';

const HomeScreen = () => {
  const navigation = useNavigation<any>();

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
    // onPress={() => navigation.navigate('AdDetails', { item: item })}
    >
      <AdCard item={item} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlashList
        data={carData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
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
