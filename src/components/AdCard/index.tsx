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
  console.log(first);
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
            source={require('../../assets/images/car1_1.jpg')}
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

      {/* Title */}
      <Text style={styles.title}>{item.title}</Text>

      {/* Location */}
      <View style={styles.row}>
        <Text style={styles.icon}>📍</Text>
        <Text style={styles.location} numberOfLines={1}>
          {item.address}
        </Text>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.icon}>👁️</Text>
          <Text style={styles.statText}>{shortNum(item.views)}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.icon}>❤️</Text>
          <Text style={styles.statText}>{shortNum(item.likes)}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.icon}>💬</Text>
          <Text style={styles.statText}>{shortNum(item.comments)}</Text>
        </View>
      </View>

      {/* Description */}
      <Text style={styles.desc} numberOfLines={3}>
        {item.description}
      </Text>

      {/* Price + actions */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.price}>{currency(item.price)}</Text>
          <Text style={styles.perMonth}>From $30/mo</Text>
        </View>
        <View style={styles.actions}>
          <Pressable style={styles.actionBtn} onPress={onPressCall}>
            <Text style={styles.actionIcon}>📞</Text>
          </Pressable>
          <Pressable style={styles.actionBtn} onPress={onPressMessage}>
            <Text style={styles.actionIcon}>💬</Text>
          </Pressable>
          <Pressable style={styles.actionBtn} onPress={onPressNotify}>
            <Text style={styles.actionIcon}>🔔</Text>
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
