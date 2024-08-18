/* eslint-disable react-native/no-color-literals */
import React, { useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import * as ImagePicker from 'expo-image-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Colors from '@/constants/Colors';
import { useSession } from '@/context/authContext';

const ICONS = [
  {
    icon: require('@/assets/images/icon.png'),
    name: 'Default',
  },
  {
    icon: require('@/assets/images/icon-dark.png'),
    name: 'Dark',
  },
  {
    icon: require('@/assets/images/icon-vivid.png'),
    name: 'Vivid',
  },
];

const Account = () => {
  const { signOut } = useSession();
  const { user } = useUser();
  const { top } = useSafeAreaInsets();
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [edit, setEdit] = useState(false);
  const [activeIcon, setActiveIcon] = useState('Default');

  const onSaveUser = async () => {
    try {
      await user?.update({
        firstName: firstName!,
        lastName: lastName!,
      });
    } catch (err) {
      Alert.alert(JSON.stringify(err, null, 2));
    }
    setEdit(false);
  };

  const onCaptureImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.75,
    });

    if (!result.canceled) {
      const base64 = `data:image/png;base64,${result.assets[0].base64}`;

      user?.setProfileImage({
        file: base64,
      });
    }
  };

  const onChangeAppIcon = async (icon: string) => {
    setActiveIcon(icon);
  };

  return (
    <BlurView
      experimentalBlurMethod="dimezisBlurView"
      intensity={50}
      tint={'dark'}
      style={{
        backgroundColor: Colors.overlay,
        flex: 1,
        paddingTop: top + 80,
      }}>
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity onPress={onCaptureImage} style={styles.captureBtn}>
          {user?.imageUrl && (
            <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
          )}
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', gap: 6 }}>
          {!edit && (
            <View style={styles.editRow}>
              <Text style={{ color: Colors.white, fontSize: 26 }}>
                {firstName} {''}
                {lastName}
              </Text>
              <TouchableOpacity onPress={() => setEdit(true)}>
                <Ionicons
                  name="ellipsis-horizontal"
                  size={24}
                  color={Colors.white}
                />
              </TouchableOpacity>
            </View>
          )}
          {edit && (
            <View style={styles.editRow}>
              <TextInput
                placeholder="First Name"
                value={firstName || ''}
                onChangeText={setFirstName}
                style={styles.inputField}
              />

              <TextInput
                placeholder="Last Name"
                value={lastName || ''}
                onChangeText={setLastName}
                style={styles.inputField}
              />

              <TouchableOpacity onPress={onSaveUser}>
                <Ionicons
                  name="checkmark-outline"
                  size={24}
                  color={Colors.white}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.btn} onPress={() => signOut()}>
          <Ionicons name="log-out" size={24} color={Colors.white} />
          <Text style={{ color: Colors.white, fontSize: 18 }}>Log out</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Ionicons name="person" size={24} color={'#fff'} />
          <Text style={{ color: '#fff', fontSize: 18 }}>Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Ionicons name="bulb" size={24} color={'#fff'} />
          <Text style={{ color: '#fff', fontSize: 18 }}>Learn</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Ionicons name="megaphone" size={24} color={Colors.white} />
          <Text style={{ color: Colors.white, flex: 1, fontSize: 18 }}>
            Inbox
          </Text>
          <View
            style={{
              backgroundColor: Colors.primary,
              borderRadius: 10,
              justifyContent: 'center',
              paddingHorizontal: 10,
            }}>
            <Text style={{ color: Colors.white, fontSize: 12 }}>14</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.actions}>
        {ICONS.map(icon => (
          <TouchableOpacity
            key={icon.name}
            style={styles.btn}
            onPress={() => onChangeAppIcon(icon.name)}>
            <Image source={icon.icon} style={{ height: 24, width: 24 }} />
            <Text style={{ color: '#fff', fontSize: 18 }}>{icon.name}</Text>
            {activeIcon.toLowerCase() === icon.name.toLowerCase() && (
              <Ionicons name="checkmark" size={24} color={'#fff'} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </BlurView>
  );
};

export default Account;

const styles = StyleSheet.create({
  actions: {
    backgroundColor: 'rgba(256,256,256,0.1)',
    borderRadius: 16,
    gap: 0,
    margin: 20,
  },
  avatar: {
    backgroundColor: Colors.gray,
    borderRadius: 50,
    height: 100,
    width: 100,
  },
  btn: {
    flexDirection: 'row',
    gap: 30,
    padding: 14,
  },
  captureBtn: {
    flexDirection: 'row',
    gap: 20,
    padding: 14,
  },
  editRow: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
    marginTop: 20,
  },
  inputField: {
    backgroundColor: Colors.white,
    borderColor: Colors.gray,
    borderRadius: 8,
    borderWidth: 1,
    height: 44,
    padding: 10,
    width: 140,
  },
});
