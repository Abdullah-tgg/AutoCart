import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Pressable,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { s } from './styles';
import LeftChevron from '../../assets/svg/LeftChevron';
import ShareIcon from '../../assets/svg/Share';
import Eye from '../../assets/svg/Eye';

type ViewStoryProps = {
  route: {
    params: {
      stories: Array<string | { uri: string }>;
      title?: string;
      views?: number;
      onSeeAd?: () => void;
    };
  };
};

const { width, height } = Dimensions.get('window');
const STORY_DURATION = 5000; // 5 seconds per story

const ViewStory: React.FC<ViewStoryProps> = ({ route }) => {
  const {
    stories,
    title = 'My Story (Preview)',
    views = 10600,
    onSeeAd,
  } = route.params;
  const navigation = useNavigation();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const progressAnims = useRef(
    stories.map(() => new Animated.Value(0)),
  ).current;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleRemove = useCallback(() => {
    // Handle remove story logic
    console.log('Remove story');
    navigation.goBack();
  }, [navigation]);

  const handleShare = useCallback(() => {
    // Handle share logic
    console.log('Share story');
  }, []);

  const handleSeeAd = useCallback(() => {
    if (onSeeAd) {
      onSeeAd();
    } else {
      navigation.goBack();
    }
  }, [onSeeAd, navigation]);

  const startProgress = useCallback(
    (index: number) => {
      progressAnims[index].setValue(0);
      Animated.timing(progressAnims[index], {
        toValue: 1,
        duration: STORY_DURATION,
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (finished && !isPaused) {
          if (index < stories.length - 1) {
            setCurrentIndex(index + 1);
          } else {
            // All stories finished
            navigation.goBack();
          }
        }
      });
    },
    [progressAnims, stories.length, isPaused, navigation],
  );

  const goToNext = useCallback(() => {
    if (currentIndex < stories.length - 1) {
      progressAnims[currentIndex].stopAnimation();
      progressAnims[currentIndex].setValue(1);
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.goBack();
    }
  }, [currentIndex, stories.length, progressAnims, navigation]);

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      progressAnims[currentIndex].stopAnimation();
      progressAnims[currentIndex].setValue(0);
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex, progressAnims]);

  const handlePressIn = useCallback(() => {
    setIsPaused(true);
    progressAnims[currentIndex].stopAnimation();
  }, [currentIndex, progressAnims]);

  const handlePressOut = useCallback(() => {
    setIsPaused(false);
  }, []);

  useEffect(() => {
    if (!isPaused) {
      startProgress(currentIndex);
    }

    return () => {
      progressAnims[currentIndex].stopAnimation();
    };
  }, [currentIndex, isPaused, startProgress]);

  const formatViews = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <SafeAreaView style={s.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header with white background */}
      <View style={s.headerContainer}>
        <View style={s.header}>
          <TouchableOpacity
            onPress={goBack}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <LeftChevron width={24} height={24} color="#000" />
          </TouchableOpacity>
          <Text style={s.title}>{title}</Text>
          <TouchableOpacity onPress={handleRemove}>
            <Text style={s.removeText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Story Image */}
      <View style={s.imageContainer}>
        {/* Progress bars */}
        <View style={s.progressContainer}>
          {stories.map((_, index) => (
            <View key={index} style={s.progressBarBg}>
              <Animated.View
                style={[
                  s.progressBarFill,
                  {
                    width: progressAnims[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', '100%'],
                    }),
                    opacity:
                      index === currentIndex
                        ? 1
                        : index < currentIndex
                        ? 1
                        : 0.5,
                  },
                ]}
              />
            </View>
          ))}
        </View>
        <Image
          source={
            typeof stories[currentIndex] === 'string'
              ? { uri: stories[currentIndex] as string }
              : stories[currentIndex]
          }
          style={s.storyImage}
          resizeMode="cover"
        />
      </View>

      {/* Share Button */}
      <TouchableOpacity style={s.shareButton} onPress={handleShare}>
        <ShareIcon width={18} height={18} color="#fff" />
        <Text style={s.shareText}>Share</Text>
      </TouchableOpacity>

      {/* Touch areas for navigation */}
      <View style={s.touchContainer}>
        <Pressable
          style={s.touchLeft}
          onPress={goToPrevious}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        />
        <Pressable
          style={s.touchRight}
          onPress={goToNext}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        />
      </View>

      {/* Bottom Section */}
      <View style={s.bottomContainer}>
        <TouchableOpacity style={s.seeAdButton} onPress={handleSeeAd}>
          <Text style={s.seeAdText}>See Ad</Text>
        </TouchableOpacity>

        <View style={s.viewsContainer}>
          <Eye width={24} height={24} color="#fff" />
          <Text style={s.viewsText}>{formatViews(views)}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewStory;
