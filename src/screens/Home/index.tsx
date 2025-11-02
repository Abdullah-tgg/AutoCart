import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  View,
  Text,
  Image,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AdCard from '../../components/AdCard';
import Carousel from 'react-native-reanimated-carousel';
import Filter from '../../assets/svg/Filter.tsx';
import { useAds } from '../../contexts/AdsContext.tsx';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const { ads } = useAds();
  const insets = useSafeAreaInsets()

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => navigation.navigate('AdDetails', { item: item })}
    >
      <AdCard item={item} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/smallLogo.png')}
            style={styles.logo}
          />
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => navigation.navigate('CreateAd')}
            style={styles.adButton}
          >
            <Text style={styles.logoText}>Place Ad +</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => navigation.navigate('Filter')}
          >
            <Filter />
          </TouchableOpacity>
        </View>
      </View>
      {ads.length > 0 ? (
        <Carousel
          width={SCREEN_WIDTH}
          height={SCREEN_HEIGHT - 120}
          data={ads}
          vertical={true}
          pagingEnabled={true}
          snapEnabled={true}
          loop={false}
          renderItem={renderItem}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Post your first ad to kick off your selling journey.
          </Text>
          <Text>The sooner you start, the faster you sell. </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('CreateAd')}
            style={styles.adButton}
          >
            <Text style={styles.logoText}>Place your first Ad</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: '10%',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingLeft: 10,
    marginBottom: 8,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 40,
    paddingLeft: 20,
    resizeMode: 'contain',
  },
  logoText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#fff',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  adButton: {
    height: 30,
    paddingHorizontal: 5,
    borderRadius: 8,
    backgroundColor: '#07B007',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButton: {
    width: 60,
    height: 30,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterIcon: {
    fontSize: 20,
  },
  title: { fontSize: 18, fontWeight: '600' },
  price: { color: '#555', marginTop: 4 },
});
