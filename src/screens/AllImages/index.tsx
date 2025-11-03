import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  SafeAreaView,
  StatusBar,
  Pressable,
  Text,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import type { ImageSourcePropType } from 'react-native';
import LeftChevron from '../../assets/svg/LeftChevron.tsx';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AllImages = ({ route, navigation }) => {
  const { images, initialIndex = 0 } = route.params;
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const insets = useSafeAreaInsets();
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent={false} />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <LeftChevron />
        </Pressable>

        <Text style={styles.counter}>{currentIndex + 1}/{images.length}</Text>

        <Pressable
          style={styles.viewAllButton}
          onPress={() => navigation.navigate('ImageGrid', { images })}
        >
          <Text style={styles.viewAllText}>📊 View All</Text>
        </Pressable>
      </View>

      {/* Carousel */}
      <View style={styles.carouselContainer}>
        <Carousel
          width={SCREEN_WIDTH}
          height={SCREEN_HEIGHT * 0.8} // dynamic & safe
          data={images}
          defaultIndex={initialIndex}
          onSnapToItem={setCurrentIndex}
          renderItem={({ item }) => (
            <View style={styles.imageContainer}>
              <Image
                source={item}
                style={[styles.image, { width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.8 }]}
                resizeMode="contain"
              />
            </View>
          )}
        />

        {/* Dots */}
        <View style={[styles.dotsContainer, { bottom: insets.bottom + 10 }]}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, index === currentIndex && styles.activeDot]}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counter: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  viewAllButton: {
    backgroundColor: '#07B007',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  viewAllText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  carouselContainer: {
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'contain',
  },
  dotsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e8e8e8',
  },
  activeDot: {
    backgroundColor: '#07B007',
  },
});

export default AllImages;
