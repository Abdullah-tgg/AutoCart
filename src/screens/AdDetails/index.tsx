import React, { useMemo } from 'react';
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  Pressable,
  Text,
  View,
  Dimensions,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { s } from './styles';
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

type Props = {
  item: AdDetails;
  onPressBack?: () => void;
  onPressCall?: () => void;
  onPressMessage?: () => void;
  onPressNotify?: () => void;
  onPressFollow?: () => void;
};

const { width } = Dimensions.get('window');
const CARD_H = 230;

const AdDetailsCard: React.FC<Props> = ({
  item,
  onPressBack,
  onPressCall,
  onPressMessage,
  onPressNotify,
  onPressFollow,
}) => {
  console.log('item', item);
  const images = useMemo<ImageSourcePropType[]>(
    () => item.images.map(toImageSource),
    [item.images],
  );

  return (
    <View style={s.container}>
      {/* Top bar (optional back) */}
      <View style={s.topBar}>
        <Pressable hitSlop={10} onPress={onPressBack}>
          <Text style={s.backIcon}>←</Text>
        </Pressable>
      </View>

      {/* Seller header */}
      <View style={s.header}>
        <View style={s.sellerLeft}>
          <View style={s.avatarWrap}>
            <Image
              source={toImageSource(item.seller.profileImage)}
              style={s.avatar}
            />
            <Pressable style={s.followBtn} onPress={onPressFollow}>
              <Text style={s.followPlus}>+</Text>
            </Pressable>
          </View>
          <View style={s.sellerInfo}>
            <Text style={s.sellerName}>{item.seller.name}</Text>
            <Text style={s.postedTime}>{item.postedTime || '3 hours ago'}</Text>
          </View>
        </View>
        <View style={s.sellerType}>
          <Text style={s.sellerTypeText}>{item.seller.type}</Text>
        </View>
      </View>

      {/* Carousel */}
      <View style={s.carouselWrap}>
        <Carousel
          width={width - 32}
          height={CARD_H}
          data={images}
          loop
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

      {/* Thumb strip */}
      <View style={s.thumbRow}>
        {images.slice(0, 3).map((img, idx) => {
          const extra = Math.max(images.length - 3, 0);
          const isLast = idx === 2 && extra > 0;
          if (isLast) {
            return (
              <ImageBackground
                key={idx}
                source={img}
                style={s.thumb}
                imageStyle={s.thumbRadius}
              >
                <View style={s.overlay}>
                  <Text style={s.overlayText}>{`+${extra}`}</Text>
                </View>
              </ImageBackground>
            );
          }
          return <Image key={idx} source={img} style={s.thumb} />;
        })}
      </View>

      {/* Title */}
      <Text style={s.title}>{item.title}</Text>

      {/* Location */}
      <View style={s.row}>
        <Text style={s.icon}>📍</Text>
        <Text style={s.location} numberOfLines={1}>
          {item.address}
        </Text>
      </View>

      {/* Quick stats */}
      <View style={s.statsRow}>
        <Stat icon="👁️" value={shortNum(item.views)} />
        <Stat icon="❤️" value={shortNum(item.likes)} />
        <Stat icon="💬" value={shortNum(item.comments)} />
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
        <GridItem label="Make" value={item.make} />
        <GridItem label="Model" value={item.model} />
        <GridItem label="Color" value={item.color} />
        <GridItem label="Doors" value={`${item.door}`} />
        <GridItem label="Seats" value={`${item.seats}`} />
        <GridItem label="Trim" value={item.trim} />
      </View>

      {/* Description */}
      <Text style={s.sectionTitle}>Description</Text>
      <Text style={s.desc}>{item.description}</Text>

      {/* Price + actions */}
      <View style={s.footer}>
        <View>
          <Text style={s.price}>{currency(item.price)}</Text>
          <Text style={s.perMonth}>From $30/mo</Text>
        </View>
        <View style={s.actions}>
          <Pressable style={s.actionBtn} onPress={onPressCall}>
            <Text style={s.actionIcon}>📞</Text>
          </Pressable>
          <Pressable style={s.actionBtn} onPress={onPressMessage}>
            <Text style={s.actionIcon}>💬</Text>
          </Pressable>
          <Pressable style={s.actionBtn} onPress={onPressNotify}>
            <Text style={s.actionIcon}>🔔</Text>
          </Pressable>
        </View>
      </View>
    </View>
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
    <Text style={s.specValue}>{value}</Text>
    <Text style={s.specLabel}>{label}</Text>
  </View>
);

const GridItem = ({ label, value }: { label: string; value: string }) => (
  <View style={s.gridItem}>
    <Text style={s.gridLabel}>{label}</Text>
    <Text style={s.gridValue} numberOfLines={1}>
      {value}
    </Text>
  </View>
);

const imageMap: Record<string, ImageSourcePropType> = {
  // add your local asset mappings here:
  '../../assets/images/user1.jpg': require('../../assets/images/user1.jpg'),
  '../../assets/images/car1_1.jpg': require('../../assets/images/car1_1.jpg'),
  '../../assets/images/car1_2.jpg': require('../../assets/images/car1_2.jpg'),
  '../../assets/images/car1_3.jpg': require('../../assets/images/car1_3.jpg'),
  '../../assets/images/car1_4.jpg': require('../../assets/images/car1_4.jpg'),
};

function toImageSource(src: string | ImageSourcePropType): ImageSourcePropType {
  if (typeof src !== 'string') return src;
  return imageMap[src] ?? { uri: src };
}

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
