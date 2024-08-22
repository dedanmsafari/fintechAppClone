/* eslint-disable no-console */
/* eslint-disable sort-keys-fix/sort-keys-fix */
module.exports = () => {
  console.log('Environment Variables at Build Time:');
  console.log(
    'EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY:',
    process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY
  );
  console.log('CRYPTO_API_KEY:', process.env.CRYPTO_API_KEY);
  return {
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
        config: {
          usesNonExemptEncryption: false,
        },
      },
      android: {
        adaptiveIcon: {
          foregroundImage: './assets/images/icon.png',
          backgroundColor: '#ffffff',
        },
        package: 'com.dedan_msafari.fintechClone',
      },
      web: {
        bundler: 'metro',
        output: 'server',
        favicon: './assets/images/favicon.png',
      },
      plugins: [
        [
          'expo-router',
          {
            origin: 'https://dedanmsafari.dev/',
          },
        ],
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
        [
          'expo-local-authentication',
          {
            faceIDPermission: 'Allow $(PRODUCT_NAME) to use Face ID.',
          },
        ],
        'expo-asset',
      ],
      experiments: {
        typedRoutes: true,
      },
      extra: {
        clerkPublishableKey: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
        coinMarketCapSecretKey: process.env.CRYPTO_API_KEY,
        eas: {
          projectId: '95b7d6d4-6218-43ab-94f5-3ed4570da16f',
        },
      },
    },
  };
};
