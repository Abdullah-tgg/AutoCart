import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Pressable,
  Text,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import type { ImageSourcePropType } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

type AllImagesProps = {
  route: {
    params: {
      images: ImageSourcePropType[];
      initialIndex?: number;
    };
  };
  navigation: any;
};

const AllImages: React.FC<AllImagesProps> = ({ route, navigation }) => {
  const { images, initialIndex = 0 } = route.params;
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
        <Text style={styles.counter}>
          {currentIndex + 1}/{images.length}
        </Text>
        <Pressable
          style={styles.viewAllButton}
          onPress={() =>
            navigation.navigate('ImageGrid', {
              images,
            })
          }
        >
          <Text style={styles.viewAllText}>📊 View All</Text>
        </Pressable>
      </View>

      <View style={styles.carouselContainer}>
        <Carousel
          width={SCREEN_WIDTH}
          height={SCREEN_HEIGHT - 120}
          data={images}
          defaultIndex={initialIndex}
          onSnapToItem={index => setCurrentIndex(index)}
          renderItem={({ item }) => (
            <View style={styles.imageContainer}>
              <Image source={item} style={styles.image} resizeMode="contain" />
            </View>
          )}
        />

        {/* Dots indicator */}
        <View style={styles.dotsContainer}>
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselContainer: {
    flex: 1,
    position: 'relative',
  },
  backIcon: {
    fontSize: 24,
    color: '#000',
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
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: SCREEN_WIDTH,
    height: '100%',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 30,
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
    width: 8,
  },
});

export default AllImages;
