import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  CameraScanner: undefined;
  // Add other screens here
};

type ScanScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const Scan: React.FC<ScanScreenProps> = ({}) => {
  const navigation = useNavigation();
  const handleOpenCamera = () => {
    navigation.navigate('CameraScanner');
  };

  const handlePlaceAdManually = () => {
    // Handle manual ad placement
    console.log('Place ad manually pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <Text style={styles.header}>Reg Scanner</Text>

        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <Image
            source={require('../../assets/images/scan.png')}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        {/* Description Text */}
        <Text style={styles.description}>
          This option allows you to check your vehicle{'\n'}
          details before purchasing
        </Text>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleOpenCamera}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>Open Camera</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handlePlaceAdManually}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>Place Ad Manually</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000',
    marginTop: 20,
    marginBottom: 40,
  },
  illustrationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
  },
  illustration: {
    width: 280,
    height: 220,
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 60,
  },
  buttonContainer: {
    gap: 16,
    paddingHorizontal: 0,
  },
  primaryButton: {
    backgroundColor: '#28A745',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#FFF',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#28A745',
  },
  secondaryButtonText: {
    color: '#28A745',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Scan;
