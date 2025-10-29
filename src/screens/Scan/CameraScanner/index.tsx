import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  Linking,
  Platform,
  Dimensions,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/AppNavigator.tsx';

type CameraScannerProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CameraScanner'>;
};

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const SCAN_AREA_WIDTH = SCREEN_WIDTH * 0.85;
const SCAN_AREA_HEIGHT = SCREEN_HEIGHT * 0.6;

// License plate regex patterns
const LICENSE_PLATE_PATTERNS = [
  /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/i, // Indian format: MH12AB1234
  /^[A-Z]{3}[0-9]{3,4}$/i, // Simple format: ABC1234
  /^[A-Z]{2}[0-9]{2}[A-Z]{3}$/i, // UK format: AB12CDE
  /^[A-Z0-9]{2,10}$/i, // Generic alphanumeric
];

const isLicensePlate = (text: string): boolean => {
  if (!text || typeof text !== 'string') return false;
  const cleanText = text.replace(/[\s-]/g, '').toUpperCase();
  return LICENSE_PLATE_PATTERNS.some(pattern => pattern.test(cleanText));
};

const CameraScanner: React.FC<CameraScannerProps> = ({ navigation }) => {
  const [detectedText, setDetectedText] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [scanAreaLayout, setScanAreaLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const camera = React.useRef<Camera>(null);

  useEffect(() => {
    if (!hasPermission) {
      checkAndRequestPermission();
    }
  }, [hasPermission]);

  // Auto-start scanning
  useEffect(() => {
    if (
      isCameraReady &&
      scanAreaLayout.width > 0 &&
      !isProcessing &&
      !detectedText
    ) {
      const timer = setTimeout(() => {
        startScanning();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isCameraReady, scanAreaLayout.width, isProcessing, detectedText]);

  const checkAndRequestPermission = async () => {
    try {
      const permission = await requestPermission();
      if (!permission) {
        Alert.alert(
          'Camera Permission Required',
          'Please grant camera permission to scan license plates.',
          [
            {
              text: 'Cancel',
              style: 'cancel',
              onPress: () => navigation.goBack(),
            },
            {
              text: 'Open Settings',
              onPress: () => {
                Linking.openSettings();
                navigation.goBack();
              },
            },
          ],
        );
      }
    } catch (error) {
      console.error('Permission error:', error);
      Alert.alert('Error', 'Failed to request camera permission');
      navigation.goBack();
    }
  };

  const startScanning = useCallback(async () => {
    if (isProcessing || !camera.current || !isCameraReady) {
      console.log('Cannot scan:', {
        isProcessing,
        hasCamera: !!camera.current,
        isCameraReady,
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Take photo
      const photo = await camera.current.takePhoto({
        flash: 'off',
        qualityPrioritization: 'speed',
      });

      console.log('Photo taken:', photo.path);

      // Add file:// prefix for ML Kit
      const imagePath =
        Platform.OS === 'android' ? `file://${photo.path}` : photo.path;

      console.log('Processing image:', imagePath);

      // Process with ML Kit OCR
      const result = await TextRecognition.recognize(imagePath);

      console.log('OCR Result:', JSON.stringify(result, null, 2));

      // Collect all detected text from blocks
      const allTexts: string[] = [];

      if (result && result.blocks) {
        for (const block of result.blocks) {
          // Add block text
          if (block.text) {
            allTexts.push(block.text);
          }

          // Add line texts
          if (block.lines) {
            for (const line of block.lines) {
              if (line.text) {
                allTexts.push(line.text);
              }

              // Add element texts (individual words)
              if (line.elements) {
                for (const element of line.elements) {
                  if (element.text) {
                    allTexts.push(element.text);
                  }
                }
              }
            }
          }
        }
      }

      console.log('All detected texts:', allTexts);

      // Check each text for license plate pattern
      for (const text of allTexts) {
        if (!text) continue;

        const cleanText = text.replace(/[\s-]/g, '');

        if (isLicensePlate(cleanText) && cleanText.length >= 6) {
          setDetectedText(cleanText);

          Alert.alert('License Plate Detected', `Plate Number: ${cleanText}`, [
            {
              text: 'Re-scan',
              onPress: () => {
                setDetectedText('');
                setIsProcessing(false);
                setTimeout(() => startScanning(), 500);
              },
              style: 'cancel',
            },
            {
              text: 'Confirm',
              onPress: () => {
                navigation.goBack();
              },
            },
          ]);
          return;
        }
      }

      // No plate detected, try again
      console.log('No license plate detected, trying again...');
      setIsProcessing(false);
      setTimeout(() => startScanning(), 2000);
    } catch (error) {
      console.error('OCR Error:', error);
      setIsProcessing(false);
      Alert.alert('Error', 'Failed to scan. Please try again.');
    }
  }, [isProcessing, isCameraReady, navigation]);

  const handleCameraInitialized = () => {
    console.log('Camera initialized');
    setIsCameraReady(true);
  };

  const handleScanAreaLayout = (event: any) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    setScanAreaLayout({ x, y, width, height });
    console.log('Scan area layout:', { x, y, width, height });
  };

  if (!hasPermission) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <ActivityIndicator size="large" color="#28A745" />
          <Text style={styles.permissionText}>
            Requesting camera permission...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!device) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#28A745" />
          <Text style={styles.loadingText}>Loading camera...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
        onInitialized={handleCameraInitialized}
      />

      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
      </View>

      {/* Scanning overlay */}
      <View style={styles.overlay}>
        <View style={styles.topOverlay} />
        <View style={styles.middleRow}>
          <View style={styles.sideOverlay} />
          <View style={styles.scanArea} onLayout={handleScanAreaLayout}>
            {/* Corner markers */}
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
          </View>
          <View style={styles.sideOverlay} />
        </View>
        <View style={styles.bottomOverlay} />
      </View>

      {/* Processing indicator */}
      {isProcessing && (
        <View style={styles.processingContainer}>
          <ActivityIndicator size="large" color="#28A745" />
          <Text style={styles.scanningText}>Scanning...</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '600',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  topOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  middleRow: {
    flexDirection: 'row',
    height: SCAN_AREA_HEIGHT,
  },
  sideOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  scanArea: {
    width: SCAN_AREA_WIDTH,
    height: SCAN_AREA_HEIGHT,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: '#28A745',
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 5,
    borderLeftWidth: 5,
    borderTopLeftRadius: 12,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 5,
    borderRightWidth: 5,
    borderTopRightRadius: 12,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    borderBottomLeftRadius: 12,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 5,
    borderRightWidth: 5,
    borderBottomRightRadius: 12,
  },
  bottomOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  processingContainer: {
    position: 'absolute',
    top: '50%',
    alignSelf: 'center',
    zIndex: 10,
    alignItems: 'center',
  },
  scanningText: {
    color: '#FFF',
    fontSize: 16,
    marginTop: 10,
    fontWeight: '600',
  },
  permissionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  permissionText: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#FFF',
  },
});

export default CameraScanner;
