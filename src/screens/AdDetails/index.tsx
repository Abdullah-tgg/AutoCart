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
import Eye from '../../assets/svg/Eye.tsx';
import Heart from '../../assets/svg/Heart.tsx';
import ShareIcon from '../../assets/svg/Share.tsx';
import Phone from '../../assets/svg/Phone.tsx';
import Message2 from '../../assets/svg/Message2.tsx';
import Bell from '../../assets/svg/Bell.tsx';
import Location from '../../assets/svg/Location.tsx';
import Calendar from '../../assets/svg/calendar.tsx';
import Mileage from '../../assets/svg/Mileage.tsx';
import Transmission from '../../assets/svg/Transmission.tsx';
import Fuel from '../../assets/svg/Fuel.tsx';
import LeftChevron from '../../assets/svg/LeftChevron.tsx';
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
  const [activeIndex, setActiveIndex] = React.useState(0);

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
      <StatusBar barStyle="dark-content" backgroundColor={'#fff'} />
      <ScrollView
        style={s.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Top bar (optional back) */}
        <View style={s.topBar}>
          <Pressable hitSlop={10} onPress={onPressBack}>
            <LeftChevron />
          </Pressable>
          <TouchableOpacity style={s.story}>
            <Text style={s.whiteText}>View story</Text>
          </TouchableOpacity>
        </View>

        {/* Seller header */}
        <View style={s.carouselWrap}>
          <Carousel
            width={width - 32}
            height={CARD_H}
            data={images}
            loop
            pagingEnabled
            onSnapToItem={index => setActiveIndex(index)}
            renderItem={({ item: img }) => (
              <Pressable
                onPress={() =>
                  navigation.navigate('AllImages', {
                    images,
                    initialIndex: activeIndex,
                  })
                }
              >
                <ImageBackground
                  source={img}
                  style={s.mainImage}
                  imageStyle={s.mainImageRadius}
                />
              </Pressable>
            )}
          />
          <View style={s.dotsContainer}>
            {images.map((_, index) => (
              <View
                key={index}
                style={[s.dot, index === activeIndex && s.activeDot]}
              />
            ))}
          </View>
        </View>

        {/* Title */}
        <View style={[s.row, { justifyContent: 'space-between' }]}>
          <Text style={s.title}>{item.title}</Text>
          {/* Quick stats */}
          <View style={[s.statsRow, { marginTop: 0 }]}>
            <View style={s.row}>
              <Eye />
              <Text style={s.statText}>{shortNum(item.views)}</Text>
            </View>
            <View style={s.row}>
              <Heart width={20} height={20} />
              <Text style={s.statText}>{shortNum(item.likes)}</Text>
            </View>
            <View style={s.row}>
              <ShareIcon width={18} height={18} />
              <Text style={s.statText}>{shortNum(item.comments)}</Text>
            </View>
          </View>
        </View>

        {/* Location */}
        <View style={s.row}>
          <Location width={22} height={22} color={'#9CA3AF'} />
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
            <Pressable style={s.callActionBtn} onPress={dummy}>
              <Phone width={24} height={24} color={'#1E40AF'} />
            </Pressable>
            <Pressable style={s.messageActionBtn} onPress={dummy}>
              <Message2 color="#115E59" width={22} height={22} />
            </Pressable>
            <Pressable style={s.NotiActionBtn} onPress={dummy}>
              <Bell />
            </Pressable>
          </View>
        </View>
        {/* Specs boxed */}
        <View style={s.specBoxes}>
          <SpecBox
            icon={<Calendar width={28} height={28} />}
            value={`${item.year}`}
          />
          <SpecBox icon={<Mileage />} value={item.mileage} />
          <SpecBox icon={<Fuel />} value={item.fuelType} />
          <SpecBox icon={<Transmission />} value={item.transmission} />
        </View>
        {/* Description */}
        <Text style={s.sectionTitle}>Description</Text>
        <Text style={s.desc}>{item.description}</Text>
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

const SpecBox = ({ icon, value }: { icon: React.ReactNode; value: string }) => (
  <View style={s.specBox}>
    {icon}
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
