import { StyleSheet } from 'react-native';
const CARD_H = 230;

/* Styles */
const R = 14;

export const s = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: R,
    padding: 12,
    gap: 10,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  topBar: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  backIcon: { fontSize: 18, color: '#2A3B4C' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sellerLeft: { flexDirection: 'row', alignItems: 'center' },
  avatarWrap: { position: 'relative' },
  avatar: { width: 42, height: 42, borderRadius: 21 },
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
  followPlus: { color: '#fff', fontSize: 12, fontWeight: '800' },
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

  carouselWrap: { marginTop: 6, borderRadius: R, overflow: 'hidden' },
  mainImage: { width: '100%', height: CARD_H, justifyContent: 'flex-end' },
  mainImageRadius: { borderRadius: R },

  thumbRow: { flexDirection: 'row', gap: 8, marginTop: 8 },
  thumb: { flex: 1, height: 68, borderRadius: 10, overflow: 'hidden' },
  thumbRadius: { borderRadius: 10 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayText: { color: '#fff', fontWeight: '700' },

  title: { fontSize: 18, fontWeight: '800', color: '#0B1C2E', marginTop: 6 },
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

  specBoxes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10,
  },
  specBox: {
    flexBasis: '48%',
    borderWidth: 1,
    borderColor: '#E6ECF2',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#FBFDFF',
  },
  specValue: { fontWeight: '700', color: '#0B1C2E' },
  specLabel: { marginTop: 2, color: '#7A8A9D', fontSize: 12 },

  grid: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E6ECF2',
    borderRadius: 10,
    overflow: 'hidden',
  },
  gridItem: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E6ECF2',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gridLabel: { color: '#7A8A9D' },
  gridValue: { color: '#0B1C2E', fontWeight: '600', maxWidth: '60%' },

  sectionTitle: { marginTop: 12, fontWeight: '700', color: '#0B1C2E' },
  desc: { color: '#5B6D7C', marginTop: 6 },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  price: { color: '#07B007', fontSize: 20, fontWeight: '800' },
  perMonth: { color: '#7A8A9D', marginTop: 2, fontSize: 12 },
  actions: { flexDirection: 'row', gap: 8 },
  actionBtn: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: '#E9F7EA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIcon: { fontSize: 18, color: '#07B007' },
});
