import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AdCard from '../../components/AdCard';
import carData from '../../data.json';
import Carousel from 'react-native-reanimated-carousel';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation<any>();

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('AdDetails', { item: item })}
    >
      <AdCard item={item} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Carousel
        width={SCREEN_WIDTH}
        height={SCREEN_HEIGHT}
        data={carData}
        vertical={true}
        pagingEnabled={true}
        snapEnabled={true}
        loop={false}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    height: '100%',
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
  },
  title: { fontSize: 18, fontWeight: '600' },
  price: { color: '#555', marginTop: 4 },
});
