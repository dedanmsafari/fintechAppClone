import { Text, View } from 'react-native';

import { ErrorBoundaryProps } from 'expo-router';

export function ErrorBoundary(props: ErrorBoundaryProps) {
  return (
    <View>
      <Text>{props.error.message}</Text>
      <Text onPress={props.retry}>Try Again?</Text>
    </View>
  );
}
