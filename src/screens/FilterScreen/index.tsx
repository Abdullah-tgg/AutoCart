import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Pressable,
  ScrollView,
  Modal,
  TouchableOpacity,
} from 'react-native';

type FilterScreenProps = {
  navigation: any;
};

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

const years = ['', '2020', '2021', '2022', '2023', '2024', '2025'];
const prices = [
  '',
  '$10,000',
  '$20,000',
  '$30,000',
  '$40,000',
  '$50,000',
  '$100,000+',
];
const locations = [
  'Islamabad',
  'New York',
  'Los Angeles',
  'Chicago',
  'Houston',
  'Pakistan',
];
const countries = [
  'Pakistan',
  'United States',
  'Canada',
  'United Kingdom',
  'Germany',
];

const FilterScreen: React.FC<FilterScreenProps> = ({ navigation }) => {
  const [category, setCategory] = useState('');
  const [minYear, setMinYear] = useState('');
  const [maxYear, setMaxYear] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [location, setLocation] = useState('');
  const [country, setCountry] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<any[]>([]);
  const [modalTitle, setModalTitle] = useState('');
  const [onSelectCallback, setOnSelectCallback] = useState<any>(null);

  const handleClearAll = () => {
    setCategory('');
    setMinYear('');
    setMaxYear('');
    setMinPrice('');
    setMaxPrice('');
    setLocation('');
    setCountry('');
  };

  const handleApply = () => {
    const filters = {
      category,
      minYear,
      maxYear,
      minPrice,
      maxPrice,
      location,
      country,
    };
    console.log('Applied filters:', filters);
    navigation.goBack();
  };

  const openPicker = (
    title: string,
    data: any[],
    callback: (value: string) => void,
  ) => {
    setModalTitle(title);
    setModalData(data);
    setOnSelectCallback(() => callback);
    setShowModal(true);
  };

  const handleSelect = (value: string, label: string) => {
    if (onSelectCallback) {
      onSelectCallback(value || label);
    }
    setShowModal(false);
  };

  const getDisplayLabel = (value: string, dataArray: any[]) => {
    if (!value) return 'Select';
    const item = dataArray.find(d => (d.value || d) === value);
    return item ? item.label || item : value;
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
        <Text style={styles.headerTitle}>Filter</Text>
        <Pressable onPress={handleClearAll}>
          <Text style={styles.clearAll}>Clear All</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Category */}
        <View style={styles.section}>
          <Text style={styles.label}>Category</Text>
          <Pressable
            style={styles.selectButton}
            onPress={() =>
              openPicker('Select Category', categories, setCategory)
            }
          >
            <Text
              style={[styles.selectText, category && styles.selectTextActive]}
            >
              {getDisplayLabel(category, categories)}
            </Text>
            <Text style={styles.arrow}>▼</Text>
          </Pressable>
        </View>

        {/* Year */}
        <View style={styles.section}>
          <Text style={styles.label}>Year</Text>
          <View style={styles.row}>
            <Pressable
              style={[styles.selectButton, styles.halfWidth]}
              onPress={() => openPicker('Min Year', years, setMinYear)}
            >
              <Text
                style={[styles.selectText, minYear && styles.selectTextActive]}
              >
                {minYear || 'Min Year'}
              </Text>
              <Text style={styles.arrow}>▼</Text>
            </Pressable>
            <Pressable
              style={[styles.selectButton, styles.halfWidth]}
              onPress={() => openPicker('Max Year', years, setMaxYear)}
            >
              <Text
                style={[styles.selectText, maxYear && styles.selectTextActive]}
              >
                {maxYear || 'Max Year'}
              </Text>
              <Text style={styles.arrow}>▼</Text>
            </Pressable>
          </View>
        </View>

        {/* Price */}
        <View style={styles.section}>
          <Text style={styles.label}>Price</Text>
          <View style={styles.row}>
            <Pressable
              style={[styles.selectButton, styles.halfWidth]}
              onPress={() => openPicker('Min Price', prices, setMinPrice)}
            >
              <Text
                style={[styles.selectText, minPrice && styles.selectTextActive]}
              >
                {minPrice || 'Min Price'}
              </Text>
              <Text style={styles.arrow}>▼</Text>
            </Pressable>
            <Pressable
              style={[styles.selectButton, styles.halfWidth]}
              onPress={() => openPicker('Max Price', prices, setMaxPrice)}
            >
              <Text
                style={[styles.selectText, maxPrice && styles.selectTextActive]}
              >
                {maxPrice || 'Max Price'}
              </Text>
              <Text style={styles.arrow}>▼</Text>
            </Pressable>
          </View>
        </View>

        {/* Location */}
        <View style={styles.section}>
          <Text style={styles.label}>Location</Text>
          <Pressable
            style={styles.selectButton}
            onPress={() =>
              openPicker('Select Location', locations, setLocation)
            }
          >
            <Text
              style={[styles.selectText, location && styles.selectTextActive]}
            >
              {location || 'Select Location'}
            </Text>
            <Text style={styles.arrow}>▼</Text>
          </Pressable>
        </View>

        {/* Country */}
        <View style={styles.section}>
          <Text style={styles.label}>Current Country of Registration</Text>
          <Pressable
            style={styles.selectButton}
            onPress={() => openPicker('Select Country', countries, setCountry)}
          >
            <Text
              style={[styles.selectText, country && styles.selectTextActive]}
            >
              {country || 'Select Current Country of Registration'}
            </Text>
            <Text style={styles.arrow}>▼</Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Apply Button */}
      <View style={styles.footer}>
        <Pressable style={styles.applyButton} onPress={handleApply}>
          <Text style={styles.applyButtonText}>Apply</Text>
        </Pressable>
      </View>

      {/* Modal Picker */}
      <Modal
        visible={showModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowModal(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{modalTitle}</Text>
              <Pressable onPress={() => setShowModal(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </Pressable>
            </View>
            <ScrollView>
              {modalData.map((item, index) => {
                const value = typeof item === 'object' ? item.value : item;
                const label = typeof item === 'object' ? item.label : item;
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.modalItem}
                    onPress={() => handleSelect(value, label)}
                  >
                    <Text style={styles.modalItemText}>{label}</Text>
                  </TouchableOpacity>
                );
              })}
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
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
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
  clearAll: {
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
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
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
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  applyButton: {
    backgroundColor: '#07B007',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalItemText: {
    fontSize: 16,
    color: '#374151',
  },
});

export default FilterScreen;
