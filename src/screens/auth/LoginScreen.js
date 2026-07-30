// src/screens/auth/LoginScreen.js
import React, { useState, useEffect, useRef } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { COLORS, TYPOGRAPHY, FONTS, ICONS } from '../../constants';
import { globalRegisteredUsers } from '../../constants/authStorage';
import { useAuth } from '../../constants/AuthContext';

export default function LoginScreen({ route }) {
  const navigation = useNavigation();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');


  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    if (route?.params?.newUser) {
      setEmail(route.params.newUser.email);
      setPassword(route.params.newUser.password);
      Alert.alert('مرحباً!', 'تم إنشاء حسابك بنجاح، يمكنك تسجيل الدخول الآن.');
      navigation.setParams({ newUser: null });
    }
  }, [route?.params?.newUser, navigation]);

  const handleLogin = async () => {
    setEmailError('');
    setPasswordError('');

    let isValid = true;

    if (!email.trim()) {
      setEmailError('يرجى إدخال البريد الإلكتروني');
      isValid = false;
    }
    if (!password) {
      setPasswordError('يرجى إدخال كلمة المرور');
      isValid = false;
    }

    if (!isValid) return;

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const validUser = globalRegisteredUsers.find(
        (user) =>
          user.email.toLowerCase() === email.trim().toLowerCase() &&
          user.password === password
      );

      if (!validUser) {
        setEmailError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
        setLoading(false);
        return;
      }

      await login(validUser);
    } catch (error) {
      Alert.alert('خطأ', 'حدث خطأ غير متوقع، يرجى المحاولة لاحقاً.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        <StatusBar
          barStyle="dark-content"
          backgroundColor={COLORS.background.main}
        />

        <View style={styles.headerContainer}>
          <View style={styles.logoCircle}>
            <Image
              source={require('../../../assets/images/logo.jpg')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
          <Text style={[styles.title, { fontFamily: FONTS.bold }]}>
            فندق الجزيرة
          </Text>
          <Text style={[styles.subtitle, { fontFamily: FONTS.regular }]}>
            أهلاً بك، يرجى تسجيل الدخول للمتابعة
          </Text>
        </View>

        <View style={styles.formContainer}>
          {/* حقل البريد الإلكتروني */}
          <Text style={[styles.label, { fontFamily: FONTS.bold }]}>
            البريد الإلكتروني
          </Text>
          <View
            style={[
              styles.inputContainer,
              emailError && styles.inputError,
              emailFocused && styles.inputFocused, 
            ]}>
            {ICONS.email(20, emailError ? COLORS.danger : COLORS.text.gray)}
            <TextInput
              ref={emailRef}
              style={[styles.input, { fontFamily: FONTS.regular }]}
              placeholder="example@gmail.com"
              placeholderTextColor={COLORS.text.muted}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (emailError) setEmailError('');
              }}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              editable={!loading}
            />
          </View>
          {emailError ? (
            <Text style={[styles.errorText, { fontFamily: FONTS.regular }]}>
              {emailError}
            </Text>
          ) : null}

          {/* حقل كلمة المرور */}
          <Text style={[styles.label, { fontFamily: FONTS.bold }]}>
            كلمة المرور
          </Text>
          <View
            style={[
              styles.inputContainer,
              passwordError && styles.inputError,
              passwordFocused && styles.inputFocused, 
            ]}>
            <TextInput
              ref={passwordRef}
              style={[styles.input, { fontFamily: FONTS.regular }]}
              placeholder="••••••••"
              placeholderTextColor={COLORS.text.muted}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (passwordError) setPasswordError('');
              }}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              editable={!loading}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
              activeOpacity={0.7}>
              {ICONS.eye(20, COLORS.text.gray, showPassword)}
            </TouchableOpacity>
          </View>
          {passwordError ? (
            <Text style={[styles.errorText, { fontFamily: FONTS.regular }]}>
              {passwordError}
            </Text>
          ) : null}

          <TouchableOpacity style={styles.forgotPasswordContainer} activeOpacity={0.7}>
            <Text style={[styles.forgotPasswordText, { fontFamily: FONTS.regular }]}>
              نسيت كلمة المرور؟
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.8}>
            {loading ? (
              <ActivityIndicator color={COLORS.text.white} />
            ) : (
              <Text style={[styles.buttonText, { fontFamily: FONTS.bold }]}>
                تسجيل الدخول
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.registerLink}
            onPress={() => navigation.navigate('Register')}
            disabled={loading}
            activeOpacity={0.7}>
            <Text style={[styles.registerText, { fontFamily: FONTS.regular }]}>
              ليس لديك حساب؟{' '}
              <Text style={[styles.registerHighlight, { fontFamily: FONTS.bold }]}>
                سجل الآن
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background.main },
  scrollContent: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  headerContainer: { marginBottom: 30, alignItems: 'center' },
  logoCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: COLORS.background.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 6,
    borderWidth: 1,
    borderColor: COLORS.border.light,
    overflow: 'hidden',
  },
  logoImage: { width: 60, height: 60 },
  title: {
    fontSize: TYPOGRAPHY.sizes['7xl'],
    color: COLORS.text.main,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: TYPOGRAPHY.sizes.lg,
    color: COLORS.text.light,
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: COLORS.background.card,
    borderRadius: 16,
    padding: 24,
    elevation: 4,
  },
  label: {
    fontSize: TYPOGRAPHY.sizes.base,
    color: COLORS.text.medium,
    marginBottom: 6,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: COLORS.background.input,
    borderWidth: 1,
    borderColor: COLORS.border.light, 
    borderRadius: 10,
    marginBottom: 4,
    paddingHorizontal: 12,
    height: 50,
  },
 
  inputFocused: {
    borderColor: COLORS.primary,
    borderWidth: 1.5,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 4,
    fontSize: TYPOGRAPHY.sizes.base,
    color: COLORS.text.dark,
    textAlign: 'right',
    outlineStyle: 'none', 
    outlineWidth: 0,
  },
  inputError: { borderColor: COLORS.danger },
  eyeIcon: { padding: 8 },
  errorText: {
    color: COLORS.danger,
    fontSize: TYPOGRAPHY.sizes.sm,
    textAlign: 'right',
    marginBottom: 12,
    marginTop: 4,
  },
  forgotPasswordContainer: { alignItems: 'flex-end', marginBottom: 20 },
  forgotPasswordText: { color: COLORS.primary, fontSize: TYPOGRAPHY.sizes.md },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
  },
  buttonDisabled: { opacity: 0.7 },
  buttonText: { color: COLORS.text.white, fontSize: TYPOGRAPHY.sizes['2xl'] },
  registerLink: { marginTop: 20, alignItems: 'center' },
  registerText: { color: COLORS.text.light, fontSize: TYPOGRAPHY.sizes.base },
  registerHighlight: { color: COLORS.primary },
});