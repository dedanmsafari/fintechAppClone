/* eslint-disable sort-keys-fix/sort-keys-fix */
module.exports = {
  expo: {
    name: 'fintechClone',
    slug: 'fintechClone',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'myapp',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'com.dedan_msafari.fintechClone',
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    plugins: [
      'expo-router',
      'expo-secure-store',
      [
        'expo-font',
        {
          fonts: [
            './assets/fonts/RobotoMono-Bold.ttf',
            './assets/fonts/RobotoMono-Italic.ttf',
            './assets/fonts/RobotoMono-Medium.ttf',
            './assets/fonts/RobotoMono-Regular.ttf',
            './assets/fonts/RobotoMono-Thin.ttf',
            './assets/fonts/SpaceMono-Regular.ttf',
            'node_modules/@expo-google-fonts/noto-sans/NotoSans_300Light.ttf',
            'node_modules/@expo-google-fonts/noto-sans/NotoSans_400Regular.ttf',
            'node_modules/@expo-google-fonts/noto-sans/NotoSans_500Medium.ttf',
            'node_modules/@expo-google-fonts/noto-sans/NotoSans_700Bold.ttf',
          ],
        },
      ],
      'expo-asset',
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      clerkPublishableKey: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
    },
  },
};
