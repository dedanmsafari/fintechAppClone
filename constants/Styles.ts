import { StyleSheet } from 'react-native';

import Colors from '@/constants/Colors';

export const defaultStyles = StyleSheet.create({
  block: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    gap: 20,
    marginHorizontal: 20,
    padding: 14,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '500',
  },
  buttonTextSmall: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '500',
  },
  container: {
    backgroundColor: Colors.background,
    flex: 1,
    padding: 16,
  },
  descriptionText: {
    color: Colors.gray,
    fontSize: 18,
    marginTop: 20,
  },
  header: {
    fontSize: 40,
    fontWeight: '700',
  },
  pillButton: {
    alignItems: 'center',
    borderRadius: 40,
    height: 60,
    justifyContent: 'center',
    padding: 10,
  },
  pillButtonSmall: {
    alignItems: 'center',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 20,
    marginBottom: 10,
  },
  textLink: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: '500',
  },
});
