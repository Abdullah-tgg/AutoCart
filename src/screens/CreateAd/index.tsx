import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Pressable,
  ScrollView,
  TextInput,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { useAds } from '../../contexts/AdsContext.tsx';

const categories = [
  { label: 'Select Category', value: '' },
  { label: '🚗 Cars', value: 'cars' },
  { label: '🏍️ Motorbikes', value: 'motorbikes' },
  { label: '🔧 Car Parts', value: 'car-parts' },
  { label: '🚐 Van & Light Commercials', value: 'van-light-commercials' },
  { label: '🛠️ Car Extras', value: 'car-extras' },
  { label: '🚌 Coaches and Buses', value: 'coaches-buses' },
  { label: '🏁 Modified cars', value: 'modified-cars' },
  { label: '🏍️ Motorbike Extras', value: 'motorbike-extras' },
  { label: '🚗 Vintage Cars', value: 'vintage-cars' },
  { label: '🔧 Breakings and Repairables', value: 'breakings-repairables' },
  { label: '🏎️ Rally Cars', value: 'rally-cars' },
  { label: '🚚 Trucks', value: 'trucks' },
  { label: '🏍️ Vintage Bikes', value: 'vintage-bikes' },
  { label: '🏕️ Campers', value: 'campers' },
  { label: '🛵 Moped', value: 'moped' },
  { label: '🚘 New Car', value: 'new-car' },
  { label: '🏢 Dealerships', value: 'dealerships' },
];

const statuses = [
  { label: 'Select Status', value: '' },
  { label: 'New', value: 'new' },
  { label: 'Used', value: 'used' },
  { label: 'Certified Pre-Owned', value: 'certified' },
];

const currencies = ['$', '€', '£', '¥'];

const mockAd = {
  id: 1,
  title: 'BMW 520 M Sport',
  price: 20000,
  views: 20000,
  likes: 10000,
  comments: 237,
  address: '2614 Sweetwood Drive, Arvada, CO 80002',
  year: 2024,
  mileage: '80,000',
  fuelType: 'Petrol',
  transmission: 'Automatic',
  description:
    'Donec dictum tristique porta. Etiam convallis lorem lobortis nulla molestie, nec tincidunt ex ullamcorper. Quisque ultricies lobortis elit sed euismod.',
  make: 'BMW',
  model: '520 M Sport',
  color: 'White',
  door: 4,
  seats: 5,
  trim: '---',
  seller: {
    name: 'Frances Swann',
    type: 'Private Seller',
    profileImage: '../../assets/images/user1.jpg',
  },
  postedTime: 'Just Now',
  images: [
    '../../assets/images/car1_1.jpg',
    '../../assets/images/car1_2.jpg',
    '../../assets/images/car1_3.jpg',
    '../../assets/images/car1_4.jpg',
    '../../assets/images/car1_5.jpg',
    '../../assets/images/car1_6.jpg',
    '../../assets/images/car1_7.jpg',
  ],
};

const CreateAdScreen: React.FC = () => {
  const [category, setCategory] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [itemName, setItemName] = useState('');
  const [status, setStatus] = useState('');
  const [images, setImages] = useState<any[]>([]);
  const [storyImages, setStoryImages] = useState<any[]>([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [currency, setCurrency] = useState('$');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const navigation = useNavigation();

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);

  const handleReset = () => {
    setCategory('');
    setLicenseNumber('');
    setItemName('');
    setStatus('');
    setImages([]);
    setStoryImages([]);
    setPhoneNumber('');
    setLocation('');
    setCurrency('$');
    setPrice('');
    setDescription('');
  };

  const pickImages = async (type: 'main' | 'story') => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: type === 'main' ? 20 : 5,
    });

    if (result.assets) {
      if (type === 'main') {
        setImages([...images, ...result.assets]);
      } else {
        setStoryImages([...storyImages, ...result.assets]);
      }
    }
  };

  const handleFindLicense = () => {
    console.log('Finding license:', licenseNumber);
    // Add your license lookup logic here
  };

  const handlePreviewAd = () => {
    navigation.navigate('AdDetails', { item: mockAd });
  };

  const getCategoryLabel = () => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.label : 'Select Category';
  };

  const getStatusLabel = () => {
    const stat = statuses.find(s => s.value === status);
    return stat ? stat.label : 'Select Status';
  };

  const { addAd } = useAds();

  const handlePublish = () => {
    const adData = {
      category,
      licenseNumber,
      itemName,
      status,
      images,
      storyImages,
      phoneNumber,
      location,
      seller: {
        name: 'Frances Swann',
        type: 'Private Seller',
        image: '../../assets/images/user1.jpg',
      },
      postedTime: 'Just Now',
      views: 0,
      likes: 0,
      comments: 0,
      mileage: '80,000',
      fuelType: 'Petrol',
      transmission: 'Automatic',
      year: 2024,
      make: 'BMW',
      model: '520 M Sport',
      color: 'White',
      door: 4,
      seats: 5,
      trim: '---',
      currency,
      price,
      description,
    };

    addAd(adData);
    console.log('Publishing ad:', adData);
    navigation.goBack();
  };

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
        <Text style={styles.headerTitle}>Place Ad</Text>
        <Pressable onPress={handleReset}>
          <Text style={styles.reset}>Reset</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Category */}
        <View style={styles.section}>
          <Text style={styles.label}>Category</Text>
          <Pressable
            style={styles.selectButton}
            onPress={() => setShowCategoryModal(true)}
          >
            <Text
              style={[styles.selectText, category && styles.selectTextActive]}
            >
              {getCategoryLabel()}
            </Text>
            <Text style={styles.arrow}>▼</Text>
          </Pressable>
        </View>

        {/* Vehicle License Number */}
        <View style={styles.section}>
          <Text style={styles.label}>Vehicle License Number</Text>
          <View style={styles.licenseRow}>
            <TextInput
              style={[styles.input, styles.licenseInput]}
              placeholder="Write License Number"
              placeholderTextColor="#9CA3AF"
              value={licenseNumber}
              onChangeText={setLicenseNumber}
            />
            <Pressable style={styles.findButton} onPress={handleFindLicense}>
              <Text style={styles.findButtonText}>Find</Text>
            </Pressable>
          </View>
        </View>

        {/* Item Name */}
        <View style={styles.section}>
          <Text style={styles.label}>Item Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Item name"
            placeholderTextColor="#9CA3AF"
            value={itemName}
            onChangeText={setItemName}
          />
        </View>

        {/* Status */}
        <View style={styles.section}>
          <Text style={styles.label}>Status</Text>
          <Pressable
            style={styles.selectButton}
            onPress={() => setShowStatusModal(true)}
          >
            <Text
              style={[styles.selectText, status && styles.selectTextActive]}
            >
              {getStatusLabel()}
            </Text>
            <Text style={styles.arrow}>▼</Text>
          </Pressable>
        </View>

        {/* Upload Images */}
        <View style={styles.section}>
          <Text style={styles.label}>Upload Images</Text>
          <Text style={styles.helperText}>You can upload up to 20 images</Text>
          <Pressable
            style={styles.uploadBox}
            onPress={() => pickImages('main')}
          >
            <Text style={styles.uploadIcon}>+</Text>
          </Pressable>
          {images.length > 0 && (
            <View style={styles.imagePreviewContainer}>
              {images.map((img, index) => (
                <Image
                  key={index}
                  source={{ uri: img.uri }}
                  style={styles.imagePreview}
                />
              ))}
            </View>
          )}
        </View>

        {/* Upload Story */}
        <View style={styles.section}>
          <Text style={styles.label}>Upload Story</Text>
          <Text style={styles.helperText}>
            You can upload up to 5 images or videos for story
          </Text>
          <Pressable
            style={styles.uploadBox}
            onPress={() => pickImages('story')}
          >
            <Text style={styles.uploadIcon}>+</Text>
          </Pressable>
          {storyImages.length > 0 && (
            <View style={styles.imagePreviewContainer}>
              {storyImages.map((img, index) => (
                <Image
                  key={index}
                  source={{ uri: img.uri }}
                  style={styles.imagePreview}
                />
              ))}
            </View>
          )}
          <Pressable style={styles.previewStoryButton}>
            <Text style={styles.previewStoryText}>Preview Story</Text>
          </Pressable>
        </View>

        {/* Phone Number */}
        <View style={styles.section}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Input your Phone number"
            placeholderTextColor="#9CA3AF"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
        </View>

        {/* Location */}
        <View style={styles.section}>
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your Location"
            placeholderTextColor="#9CA3AF"
            value={location}
            onChangeText={setLocation}
          />
        </View>

        {/* Price */}
        <View style={styles.section}>
          <Text style={styles.label}>Price</Text>
          <View style={styles.priceRow}>
            <Pressable
              style={styles.currencyButton}
              onPress={() => setShowCurrencyModal(true)}
            >
              <Text style={styles.currencyText}>{currency}</Text>
              <Text style={styles.arrow}>▼</Text>
            </Pressable>
            <TextInput
              style={[styles.input, styles.priceInput]}
              placeholder="Amount"
              placeholderTextColor="#9CA3AF"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Write Description"
            placeholderTextColor="#9CA3AF"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <Pressable style={styles.publishButton} onPress={handlePublish}>
            <Text style={styles.publishButtonText}>Publish Ad</Text>
          </Pressable>
          <Pressable style={styles.previewButton} onPress={handlePreviewAd}>
            <Text style={styles.previewButtonText}>Preview Ad</Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Category Modal */}
      <Modal
        visible={showCategoryModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCategoryModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowCategoryModal(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Category</Text>
              <Pressable onPress={() => setShowCategoryModal(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </Pressable>
            </View>
            <ScrollView>
              {categories.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.modalItem}
                  onPress={() => {
                    setCategory(item.value);
                    setShowCategoryModal(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{item.label}</Text>
                  {category === item.value && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Status Modal */}
      <Modal
        visible={showStatusModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowStatusModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowStatusModal(false)}
        >
          <View style={[styles.modalContent, { maxHeight: '40%' }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Status</Text>
              <Pressable onPress={() => setShowStatusModal(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </Pressable>
            </View>
            <ScrollView>
              {statuses.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.modalItem}
                  onPress={() => {
                    setStatus(item.value);
                    setShowStatusModal(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{item.label}</Text>
                  {status === item.value && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Currency Modal */}
      <Modal
        visible={showCurrencyModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCurrencyModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowCurrencyModal(false)}
        >
          <View style={[styles.modalContent, { maxHeight: '40%' }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Currency</Text>
              <Pressable onPress={() => setShowCurrencyModal(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </Pressable>
            </View>
            <ScrollView>
              {currencies.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.modalItem}
                  onPress={() => {
                    setCurrency(item);
                    setShowCurrencyModal(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                  {currency === item && <Text style={styles.checkmark}>✓</Text>}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
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
    paddingVertical: 16,
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  reset: {
    fontSize: 14,
    color: '#EF4444',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginTop: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  helperText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 12,
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#fff',
  },
  selectText: {
    fontSize: 14,
    color: '#9CA3AF',
    flex: 1,
  },
  selectTextActive: {
    color: '#374151',
  },
  arrow: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  licenseRow: {
    flexDirection: 'row',
    gap: 12,
  },
  licenseInput: {
    flex: 1,
  },
  findButton: {
    backgroundColor: '#07B007',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  findButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  uploadBox: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
  },
  uploadIcon: {
    fontSize: 32,
    color: '#9CA3AF',
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  imagePreview: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  previewStoryButton: {
    marginTop: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#07B007',
    borderRadius: 8,
    alignItems: 'center',
  },
  previewStoryText: {
    color: '#07B007',
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: '#374151',
  },
  priceRow: {
    flexDirection: 'row',
    gap: 12,
  },
  currencyButton: {
    width: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  currencyText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '600',
  },
  priceInput: {
    flex: 1,
  },
  textArea: {
    height: 120,
    paddingTop: 14,
  },
  buttonContainer: {
    marginTop: 24,
    marginBottom: 32,
    gap: 12,
  },
  publishButton: {
    backgroundColor: '#07B007',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  publishButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  previewButton: {
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#07B007',
    borderRadius: 8,
    alignItems: 'center',
  },
  previewButtonText: {
    color: '#07B007',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  modalClose: {
    fontSize: 24,
    color: '#9CA3AF',
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalItemText: {
    fontSize: 16,
    color: '#374151',
  },
  checkmark: {
    fontSize: 20,
    color: '#07B007',
    fontWeight: '600',
  },
});

export default CreateAdScreen;
