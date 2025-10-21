import { StyleSheet } from 'react-native';
const RADIUS = 12;

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS,
    padding: 12,
    gap: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sellerLeft: { flexDirection: 'row', alignItems: 'center' },
  avatarWrap: { position: 'relative' },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  followBtn: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#07B007',
    alignItems: 'center',
    justifyContent: 'center',
  },
  followPlus: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '800',
    marginLeft: 1,
    marginBottom: 2,
  },
  sellerInfo: { marginLeft: 8 },
  sellerName: { fontSize: 14, fontWeight: '700', color: '#0B1C2E' },
  postedTime: { fontSize: 12, color: '#7A8A9D', marginTop: 2 },
  sellerType: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  sellerTypeText: { fontSize: 12, color: '#2C4A6B', fontWeight: '600' },

  mainImage: {
    width: '100%',
    height: 224,
    borderRadius: RADIUS,
  },
  thumbRow: { flexDirection: 'row', gap: 8, marginTop: 8 },
  thumb: {
    flex: 1,
    height: 100,
    borderRadius: 8,
    overflow: 'hidden',
  },
  thumbImage: { borderRadius: 8 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayText: { color: '#fff', fontWeight: '700' },

  title: { fontSize: 16, fontWeight: '700', color: '#0B1C2E', marginTop: 4 },
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  icon: { marginRight: 4 },
  location: { flex: 1, color: '#667B8C' },

  statsRow: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    marginTop: 6,
  },
  stat: { flexDirection: 'row', alignItems: 'center' },
  statText: { marginLeft: 4, color: '#667B8C' },

  desc: { color: '#5B6D7C', marginTop: 6 },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  price: { color: '#07B007', fontSize: 18, fontWeight: '800' },
  perMonth: { color: '#7A8A9D', marginTop: 2, fontSize: 12 },
  actions: { flexDirection: 'row', gap: 8 },
  actionBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#E9F7EA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIcon: { fontSize: 16, color: '#07B007' },
});
