import { StyleSheet, Text, View } from 'react-native';

export default function Index() {
  return (
    <View style={styles.View}>
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  View: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
