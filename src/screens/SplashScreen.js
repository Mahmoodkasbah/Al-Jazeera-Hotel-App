// src/screens/SplashScreen.js

import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

import { COLORS, TYPOGRAPHY, FONTS } from '../constants';

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.background.main}
      />

      <View style={styles.content}>
        <View style={styles.logoCircle}>
          <Image
            source={require('../../assets/images/logo.jpg')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        <Text style={[styles.title, { fontFamily: FONTS?.bold || 'System' }]}>
          فندق الجزيرة
        </Text>

        <Text
          style={[styles.subtitle, { fontFamily: FONTS?.regular || 'System' }]}>
          راحتك تبدأ من هنا
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.main,
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    alignItems: 'center',
    paddingHorizontal: 30,
  },

logoCircle: {
  width: 120,
  height: 120,
  borderRadius: 60,
  backgroundColor: COLORS.background.card,
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",

  marginBottom: 30, 

  shadowColor: "#000",
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.15,
  shadowRadius: 6,
  elevation: 5,
},

  logoImage: {
    width: '100%',
    height: '100%',
  },

  title: {
    fontSize: TYPOGRAPHY.sizes['7xl'],
    color: COLORS.text.main,
    marginBottom: 10,
    textAlign: 'center',
    writingDirection: 'rtl',
  },

  subtitle: {
    fontSize: TYPOGRAPHY.sizes.lg,
    color: COLORS.text.light,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
});
