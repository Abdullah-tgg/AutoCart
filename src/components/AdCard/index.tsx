import React from 'react';
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  Pressable,
  Text,
  View,
} from 'react-native';
import { styles } from './styles.ts';
import Message2 from '../../assets/svg/Message2.tsx';
import Phone from '../../assets/svg/Phone.tsx';
import BellIcon from '../../assets/svg/Bell.tsx';
import Eye from '../../assets/svg/Eye.tsx';
import Heart from '../../assets/svg/Heart.tsx';
import ShareIcon from '../../assets/svg/Share.tsx';
import Location from '../../assets/svg/Location.tsx';

export type AdItem = {
  id: number;
  title: string;
  price: number;
  views: number;
  likes: number;
  comments: number;
  address: string;
  description: string;
  postedTime: string; // e.g. "3 hours ago"
  images: Array<string | ImageSourcePropType>; // accept static require too
  seller: Seller;
};

type Props = {
  item: AdItem;
  onPressCall?: () => void;
  onPressMessage?: () => void;
  onPressNotify?: () => void;
  onPressFollow?: () => void;
};
type Seller = {
  name: string;
  type: string;
  profileImage: string | ImageSourcePropType; // accept static require too
};

const AdCard: React.FC<Props> = ({
  item,
  onPressCall,
  onPressMessage,
  onPressNotify,
  onPressFollow,
}) => {
  const [first, ...rest] = item.images as Array<string | ImageSourcePropType>;
  const thumbs = rest.slice(0, 3);
  const extra = Math.max(item.images.length - 4, 0);
  return (
    <View style={styles.card}>
      {/* Seller header */}
      <View style={styles.header}>
        <View style={styles.sellerLeft}>
          <View style={styles.avatarWrap}>
            <Image
              source={require('../../assets/images/user1.jpg')}
              style={styles.avatar}
            />
            <Pressable style={styles.followBtn} onPress={onPressFollow}>
              <Text style={styles.followPlus}>+</Text>
            </Pressable>
          </View>
          <View style={styles.sellerInfo}>
            <Text style={styles.sellerName}>{item.seller.name}</Text>
            <Text style={styles.postedTime}>
              {item.postedTime || '3 hours ago'}
            </Text>
          </View>
        </View>
        <View style={styles.sellerType}>
          <Text style={styles.sellerTypeText}>
            {item.seller.type || 'Trade Seller'}
          </Text>
        </View>
      </View>

      {/* Images */}
      {first ? (
        <>
          <Image
            source={{ uri: item.images[0].uri }}
            style={styles.mainImage}
            resizeMode="cover"
          />
          <View style={styles.thumbRow}>
            {thumbs.map((img, idx) => {
              const isLastThumb = idx === thumbs.length - 1 && extra > 0;
              if (isLastThumb) {
                return (
                  <ImageBackground
                    key={idx}
                    source={require('../../assets/images/car1_2.jpg')}
                    style={styles.thumb}
                    imageStyle={styles.thumbImage}
                  >
                    <View style={styles.overlay}>
                      <Text style={styles.overlayText}>{`+${extra}`}</Text>
                    </View>
                  </ImageBackground>
                );
              }
              return (
                <Image
                  key={idx}
                  source={require('../../assets/images/car1_1.jpg')}
                  style={styles.thumb}
                  resizeMode="cover"
                />
              );
            })}
          </View>
        </>
      ) : null}

      <View style={[styles.row, { justifyContent: 'space-between' }]}>
        {/* Title */}
        <Text style={styles.title}>{item.itemName}</Text>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Eye />
            <Text style={styles.statText}>{shortNum(item.views)}</Text>
          </View>
          <View style={styles.stat}>
            <Heart width={20} height={20} />
            <Text style={styles.statText}>{shortNum(item.likes)}</Text>
          </View>
          <View style={styles.stat}>
            <ShareIcon width={20} height={20} />
            <Text style={styles.statText}>{shortNum(item.comments)}</Text>
          </View>
        </View>
      </View>
      {/* Location */}
      <View style={styles.row}>
        <Location />
        <Text style={styles.location} numberOfLines={1}>
          {item.location}
        </Text>
      </View>

      {/* Description */}
      <Text style={styles.desc} numberOfLines={2}>
        {item.description}
      </Text>

      {/* Price + actions */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.price}>{currency(item.price)}</Text>
          <Text style={styles.perMonth}>From $30/mo</Text>
        </View>
        <View style={styles.actions}>
          <Pressable style={styles.phoneActionBtn} onPress={onPressCall}>
            <Phone color="#1E40AF" width={24} height={24} />
          </Pressable>
          <Pressable style={styles.actionBtn} onPress={onPressMessage}>
            <Message2 color="#115E59" width={22} height={22} />
          </Pressable>
          <Pressable style={styles.notiBtn} onPress={onPressNotify}>
            <BellIcon color="#991B1B" width={24} height={24} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

// Map string paths to static requires so Metro can bundle them
const imageMap: Record<string, ImageSourcePropType> = {
  '../../assets/images/user1.jpg': require('../../assets/images/user1.jpg'),
  '../../assets/images/car1_1.jpg': require('../../assets/images/car1_1.jpg'),
  '../../assets/images/car1_2.jpg': require('../../assets/images/car1_2.jpg'),
  '../../assets/images/car1_3.jpg': require('../../assets/images/car1_3.jpg'),
  '../../assets/images/car1_4.jpg': require('../../assets/images/car1_4.jpg'),
};

const toImageSource = (
  src: string | ImageSourcePropType,
): ImageSourcePropType => {
  if (typeof src !== 'string') return src;
  return imageMap[src] ?? { uri: src }; // falls back to remote URI if provided
};

const currency = (n: number) =>
  `$${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

const shortNum = (n: number) => {
  if (n >= 1_000_000)
    return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}k`;
  return `${n}`;
};

export default AdCard;
