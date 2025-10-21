import React from 'react';
import {
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/onboarding.jpg')}
        style={styles.image}
        resizeMode="cover"
      >
        <View style={styles.textWrapper}>
          <Text style={styles.title}>Easy way to buy your dream car</Text>
          <Text style={styles.subtitle}>
            By using the car, you can move quickly from one place to another in
            your daily life.
          </Text>
        </View>
        <View style={styles.nextWrapper}>
          <Pressable onPress={() => navigation.navigate('MainTabs' as never)}>
            <Text style={styles.nextText}>Next</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const PADDING = 20;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // fallback while image loads
  },
  image: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  textWrapper: {
    paddingTop: PADDING,
    paddingHorizontal: PADDING,
    width: '85%',
  },
  title: {
    marginTop: 50,
    color: '#000',
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 34,
  },
  subtitle: {
    marginTop: 10,
    color: '#000',
    fontSize: 14,
    lineHeight: 20,
  },
  nextWrapper: {
    position: 'absolute',
    right: 30,
    bottom: 30,
  },
  nextText: {
    color: '#07B007',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});

export default OnboardingScreen;
