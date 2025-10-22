import React, { useCallback, useMemo } from 'react';
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  Pressable,
  Text,
  View,
  Dimensions,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { s } from './styles';
import { useNavigation } from '@react-navigation/native';
type Seller = {
  name: string;
  type: string;
  profileImage: string | ImageSourcePropType;
};

export type AdDetails = {
  id: number;
  title: string;
  price: number;
  views: number;
  likes: number;
  comments: number;
  address: string;
  description: string;
  postedTime: string;
  images: Array<string | ImageSourcePropType>;
  seller: Seller;
  year: number;
  mileage: string;
  fuelType: string;
  transmission: string;
  make: string;
  model: string;
  color: string;
  door: number;
  seats: number;
  trim: string;
};

type Props = {};

const { width } = Dimensions.get('window');
const CARD_H = 230;

const AdDetailsCard: React.FC<Props> = ({ route }) => {
  const item = route.params?.item;
  const navigation = useNavigation();

  const onPressBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const dummy = useCallback(() => {}, []);
  const images = useMemo<ImageSourcePropType[]>(
    () => [
      require('../../assets/images/car1_1.jpg'),
      require('../../assets/images/car1_2.jpg'),
      require('../../assets/images/car1_3.jpg'),
      require('../../assets/images/car1_4.jpg'),
      require('../../assets/images/car1_5.jpg'),
      require('../../assets/images/car1_6.jpg'),
      require('../../assets/images/car1_7.jpg'),
    ],
    [],
  );

  return (
    <SafeAreaView style={s.container}>
      <StatusBar barStyle="dark-content" backgroundColor={'red'} />
      <ScrollView style={s.container}>
        {/* Top bar (optional back) */}
        <View style={s.topBar}>
          <Pressable hitSlop={10} onPress={onPressBack}>
            <Text style={s.backIcon}>←</Text>
          </Pressable>
          <TouchableOpacity style={s.story}>
            <Text style={s.whiteText}>View story</Text>
          </TouchableOpacity>
        </View>

        {/* Seller header */}

        {/* Carousel */}
        <View style={s.carouselWrap}>
          <Carousel
            width={width - 32}
            height={CARD_H}
            data={images}
            loop
            autoPlay={true}
            scrollAnimationDuration={2000}
            pagingEnabled
            renderItem={({ item: img }) => (
              <ImageBackground
                source={img}
                style={s.mainImage}
                imageStyle={s.mainImageRadius}
              >
                {/* Optional overlay actions */}
              </ImageBackground>
            )}
          />
        </View>

        {/* Title */}
        <View style={[s.row, { justifyContent: 'space-between' }]}>
          <Text style={s.title}>{item.title}</Text>
          {/* Quick stats */}
          <View style={s.statsRow}>
            <Stat icon="👁️" value={shortNum(item.views)} />
            <Stat icon="❤️" value={shortNum(item.likes)} />
            <Stat icon="💬" value={shortNum(item.comments)} />
          </View>
        </View>

        {/* Location */}
        <View style={s.row}>
          <Text style={s.location} numberOfLines={1}>
            {item.address}
          </Text>
        </View>
        {/* Price + actions */}
        <View style={s.footer}>
          <View>
            <Text style={s.price}>{currency(item.price)}</Text>
            <Text style={s.perMonth}>From $30/mo</Text>
          </View>
          <View style={s.actions}>
            <Pressable style={s.actionBtn} onPress={dummy}>
              <Text style={s.actionIcon}>📞</Text>
            </Pressable>
            <Pressable style={s.actionBtn} onPress={dummy}>
              <Text style={s.actionIcon}>💬</Text>
            </Pressable>
            <Pressable style={s.actionBtn} onPress={dummy}>
              <Text style={s.actionIcon}>🔔</Text>
            </Pressable>
          </View>
        </View>
        {/* Specs boxed */}
        <View style={s.specBoxes}>
          <SpecBox label="Year" value={`${item.year}`} />
          <SpecBox label="Mileage" value={item.mileage} />
          <SpecBox label="Fuel" value={item.fuelType} />
          <SpecBox label="Trans." value={item.transmission} />
        </View>

        {/* Grid details */}
        <View style={s.grid}>
          <View style={s.gridRow}>
            <GridItem label="Make" value={item.make} />
            <GridItem label="Model" value={item.model} />
            <GridItem label="Color" value={item.color} />
          </View>
          <View style={s.gridRow}>
            <GridItem label="Doors" value={`${item.door}`} />
            <GridItem label="Seats" value={`${item.seats}`} />
            <GridItem label="Trim" value={item.trim} />
          </View>
        </View>

        {/* Description */}
        <Text style={s.sectionTitle}>Description</Text>
        <Text style={s.desc}>{item.description}</Text>
        <View style={s.header}>
          <View style={s.sellerLeft}>
            <View style={s.avatarWrap}>
              <Image
                source={require('../../assets/images/user1.jpg')}
                style={s.avatar}
              />
              <Pressable style={s.followBtn} onPress={dummy}>
                <Text style={s.followPlus}>+</Text>
              </Pressable>
            </View>
            <View style={s.sellerInfo}>
              <Text style={s.sellerName}>{item.seller.name}</Text>
              <View style={s.sellerType}>
                <Text style={s.sellerTypeText}>{item.seller.type}</Text>
              </View>
            </View>
          </View>
          <View style={s.posted}>
            <Text style={s.gridLabel}>Posted</Text>
            <Text style={s.gridLabel}> {item.postedTime || '3 hours ago'}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/* Helpers */
const Stat = ({ icon, value }: { icon: string; value: string }) => (
  <View style={s.stat}>
    <Text style={s.icon}>{icon}</Text>
    <Text style={s.statText}>{value}</Text>
  </View>
);

const SpecBox = ({ label, value }: { label: string; value: string }) => (
  <View style={s.specBox}>
    <Text style={s.specValue}>{label}</Text>
    <Text style={s.specLabel}>{value}</Text>
  </View>
);

const GridItem = ({ label, value }: { label: string; value: string }) => (
  <View style={s.gridItem}>
    <Text style={s.gridValue}>{label}</Text>
    <Text style={[s.gridLabel, { marginTop: 5 }]} numberOfLines={1}>
      {value}
    </Text>
  </View>
);

function currency(n: number) {
  return `$${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}

function shortNum(n: number) {
  if (n >= 1_000_000)
    return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}k`;
  return `${n}`;
}

export default AdDetailsCard;
