import React from 'react';
import { Text, View } from 'react-native';

import { useHeaderHeight } from '@react-navigation/elements';

import { defaultStyles } from '@/constants/Styles';

const Home = () => {
  const headerHeight = useHeaderHeight();

  return (
    <View style={[defaultStyles.container, { marginTop: headerHeight }]}>
      <Text>home</Text>
    </View>
  );
};

export default Home;
