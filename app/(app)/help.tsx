import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

import Colors from '@/constants/Colors';

const Page = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>How to Run an Expo App</Text>

      <Text style={styles.sectionTitle}>Step 1: Install Expo CLI</Text>
      <Text style={styles.paragraph}>
        To get started, you need to install Expo CLI globally on your system.
        You can do this by running the following command:
      </Text>
      <Text style={styles.code}>npm install -g expo-cli</Text>

      <Text style={styles.sectionTitle}>Step 2: Create a New Project</Text>
      <Text style={styles.paragraph}>
        Once Expo CLI is installed, you can create a new Expo project. Navigate
        to your desired project directory and run:
      </Text>
      <Text style={styles.code}>expo init my-new-project</Text>
      <Text style={styles.paragraph}>
        Follow the prompts to choose a template and set up your new project.
      </Text>
      <Text style={styles.sectionTitle}>Step 3: Start the Project</Text>
      <Text style={styles.paragraph}>
        Navigate into your project directory and start the Expo development
        server:
      </Text>
      <Text style={styles.code}>cd my-new-project</Text>
      <Text style={styles.code}>expo start</Text>
      <Text style={styles.paragraph}>
        This will start the development server and open the Expo Developer Tools
        in your browser.
      </Text>

      <Text style={styles.sectionTitle}>
        Step 4: Run on a Device or Emulator
      </Text>
      <Text style={styles.paragraph}>
        You can now run your app on a physical device or an emulator. For a
        physical device, scan the QR code displayed in the Expo Developer Tools
        using the Expo Go app (available on iOS and Android).
      </Text>
      <Text style={styles.paragraph}>
        For an emulator, ensure you have an Android or iOS emulator running and
        select the appropriate option in the Expo Developer Tools.
      </Text>

      <Text style={styles.footer}>
        For further assistance, please contact: dedan.msafari@gmail.com
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  code: {
    backgroundColor: Colors.background,
    fontFamily: 'monospace',
    fontSize: 16,
    marginBottom: 10,
    padding: 5,
  },
  container: {
    backgroundColor: Colors.background,
    padding: 20,
  },
  footer: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 50,
    marginTop: 40,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Page;
