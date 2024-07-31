import { StyleSheet, Text, View } from 'react-native';

export default function Index() {
  return (
    <View style={styles.view}>
      <Text style={styles.text}>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'RobotoMono-Bold',
  },
  view: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
