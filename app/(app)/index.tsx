import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useAssets } from 'expo-asset';
import { ResizeMode, Video } from 'expo-av';
import { Link } from 'expo-router';

import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';

export default function Index() {
  const [assets] = useAssets([require('@/assets/videos/intro.mp4')]);

  return (
    <View style={styles.view}>
      {assets && (
        <Video
          resizeMode={ResizeMode.COVER}
          isLooping
          isMuted
          shouldPlay
          source={{ uri: assets[0].uri }}
          style={styles.video}
        />
      )}
      <View style={styles.headerView}>
        <Text style={styles.header}>Ready to change the way you money?</Text>
      </View>
      <View style={styles.buttons}>
        <Link
          href="/login"
          style={[defaultStyles.pillButton, styles.pilllogin]}
          asChild>
          <TouchableOpacity>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </Link>
        <Link
          href="/signUp"
          style={[defaultStyles.pillButton, styles.pillsignup]}
          asChild>
          <TouchableOpacity>
            <Text style={styles.signupText}>Sign Up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
    marginBottom: 60,
    paddingHorizontal: 20,
  },
  header: {
    color: Colors.white,
    fontFamily: Platform.select({
      android: 'NotoSans_700Bold',
      ios: 'NotoSans-Bold',
    }),
    fontSize: 36,
    textTransform: 'uppercase',
  },
  headerView: { marginTop: 50, padding: 20 },
  loginText: {
    color: Colors.white,
    fontFamily: 'RobotoMono-Medium',
    fontSize: 22,
  },
  pilllogin: { backgroundColor: Colors.dark, flex: 1 },
  pillsignup: { backgroundColor: Colors.white, flex: 1 },
  signupText: { fontFamily: 'RobotoMono-Medium', fontSize: 22 },
  video: {
    height: '100%',
    position: 'absolute',
    width: '100%',
  },
  view: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
  },
});
