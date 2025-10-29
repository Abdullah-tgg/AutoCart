import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    backgroundColor: '#fff',
    paddingBottom: 12,
    zIndex: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  progressContainer: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    gap: 4,
    marginTop: 12,
  },
  progressBarBg: {
    flex: 1,
    height: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 1,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#000',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 12,
  },
  removeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#EF4444',
  },
  imageContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  storyImage: {
    width: width,
    height: '100%',
  },
  shareButton: {
    position: 'absolute',
    top: 120,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    gap: 6,
    zIndex: 10,
  },
  shareText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  touchContainer: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    zIndex: 5,
    top: 100,
  },
  touchLeft: {
    flex: 1,
  },
  touchRight: {
    flex: 1,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    flexDirection: 'row',
    right: 0,
    paddingHorizontal: 16,
    alignItems: 'center',
    zIndex: 10,
  },
  seeAdButton: {
    width: '80%',
    backgroundColor: '#22C55E',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 20,
  },
  seeAdText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  viewsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  viewsText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
});
