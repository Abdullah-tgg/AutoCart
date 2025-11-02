import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Pressable,
  Text,
  FlatList,
} from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import LeftChevron from '../../assets/svg/LeftChevron.tsx';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IMAGE_SIZE = (SCREEN_WIDTH - 32) / 3; // 3 columns with padding

type ImageGridProps = {
  route: {
    params: {
      images: ImageSourcePropType[];
    };
  };
  navigation: any;
};

const ImageGrid: React.FC<ImageGridProps> = ({ route, navigation }) => {
  const { images } = route.params;
  const insets = useSafeAreaInsets()

  const renderItem = ({
    item,
    index,
  }: {
    item: ImageSourcePropType;
    index: number;
  }) => (
    <Pressable
      style={styles.imageWrapper}
      onPress={() =>
        navigation.navigate('AllImages', { images, initialIndex: index })
      }
    >
      <Image source={item} style={styles.gridImage} resizeMode="cover" />
    </Pressable>
  );

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <LeftChevron />
        </Pressable>
      </View>

      {/* Grid */}
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        numColumns={3}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
      />
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
  backIcon: {
    fontSize: 24,
    color: '#000',
  },
  grid: {
    padding: 8,
  },
  imageWrapper: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    padding: 4,
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
});

export default ImageGrid;
