// src/screens/auth/RegisterScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
  Image,
  StatusBar,
} from 'react-native';

import { COLORS, TYPOGRAPHY, FONTS, ICONS } from '../../constants';
import { globalRegisteredUsers } from '../../constants/authStorage';

export default function RegisterScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [fullNameFocused, setFullNameFocused] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

  const handleRegister = () => {
    let newErrors = {};

    if (!fullName.trim()) newErrors.fullName = 'يرجى إدخال الاسم الكامل';
    if (!phone.trim()) newErrors.phone = 'يرجى إدخال رقم الجوال';

    if (!email.trim()) {
      newErrors.email = 'يرجى إدخال البريد الإلكتروني';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        newErrors.email = 'الرجاء إدخال بريد إلكتروني صحيح';
      } else {
        const userExists = globalRegisteredUsers.some(
          (user) => user.email.toLowerCase() === email.trim().toLowerCase()
        );
        if (userExists) {
          newErrors.email = 'هذا البريد الإلكتروني مسجل بالفعل';
        }
      }
    }

    if (!password) {
      newErrors.password = 'يرجى إدخال كلمة المرور';
    } else if (password.length < 6) {
      newErrors.password = 'كلمة المرور يجب ألا تقل عن 6 أحرف';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'يرجى تأكيد كلمة المرور';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'كلمة المرور غير متطابقة';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      const newUser = {
        name: fullName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        password: password,
      };

      globalRegisteredUsers.push(newUser);
      navigation.navigate('Login', { newUser: newUser });

      Alert.alert('تهانينا! ', `أهلاً بك يا ${newUser.name}! تم إنشاء حسابك بنجاح.`);
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background.main} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          disabled={loading}
          activeOpacity={0.7}>
          {ICONS.back(24, COLORS.text.dark)}
        </TouchableOpacity>

        <View style={styles.headerContainer}>
          <View style={styles.logoCircle}>
            <Image
              source={require('../../../assets/images/logo.jpg')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
          <Text style={[styles.title, { fontFamily: FONTS.bold }]}>
            إنشاء حساب جديد
          </Text>
          <Text style={[styles.subtitle, { fontFamily: FONTS.regular }]}>
            انضم إلينا واستمتع بتجربة إقامة فريدة
          </Text>
        </View>

        <View style={styles.formContainer}>

      
          <Text style={[styles.label, { fontFamily: FONTS.bold }]}>الاسم الكامل</Text>
          <View style={[
            styles.inputContainer, 
            errors.fullName && styles.inputError, 
            fullNameFocused && styles.inputFocused // 
          ]}>
           
            {ICONS.person(20, errors.fullName ? COLORS.danger : COLORS.text.gray)}
            <TextInput
              style={[styles.input, { fontFamily: FONTS.regular }]}
              placeholder="ادخل اسمك بالكامل"
              placeholderTextColor={COLORS.text.muted}
              value={fullName}
              onChangeText={(text) => { 
                setFullName(text); 
                if(errors.fullName) setErrors({...errors, fullName: ''}); 
              }}
              onFocus={() => setFullNameFocused(true)}
              onBlur={() => setFullNameFocused(false)}
              editable={!loading}
            />
          </View>
          {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}

     
          <Text style={[styles.label, { fontFamily: FONTS.bold }]}>رقم الجوال</Text>
          <View style={[
            styles.inputContainer, 
            errors.phone && styles.inputError, 
            phoneFocused && styles.inputFocused
          ]}>
          
            {ICONS.phone ? ICONS.phone(20, errors.phone ? COLORS.danger : COLORS.text.gray) : ICONS.person(20, COLORS.text.gray)}
            <TextInput
              style={[styles.input, { fontFamily: FONTS.regular }]}
              placeholder="ادخل رقم الجوال الخاص بك"
              placeholderTextColor={COLORS.text.muted}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={(text) => { 
                setPhone(text); 
                if(errors.phone) setErrors({...errors, phone: ''}); 
              }}
              onFocus={() => setPhoneFocused(true)}
              onBlur={() => setPhoneFocused(false)}
              editable={!loading}
            />
          </View>
          {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}


          <Text style={[styles.label, { fontFamily: FONTS.bold }]}>البريد الإلكتروني</Text>
          <View style={[
            styles.inputContainer, 
            errors.email && styles.inputError, 
            emailFocused && styles.inputFocused
          ]}>
         
            {ICONS.email(20, errors.email ? COLORS.danger : COLORS.text.gray)}
            <TextInput
              style={[styles.input, { fontFamily: FONTS.regular }]}
              placeholder="ادخل البريد الالكتروني الخاص بك"
              placeholderTextColor={COLORS.text.muted}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={(text) => { 
                setEmail(text); 
                if(errors.email) setErrors({...errors, email: ''}); 
              }}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              editable={!loading}
            />
          </View>
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        
          <Text style={[styles.label, { fontFamily: FONTS.bold }]}>كلمة المرور</Text>
          <View style={[
            styles.inputContainer, 
            errors.password && styles.inputError, 
            passwordFocused && styles.inputFocused
          ]}>
        
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
              activeOpacity={0.7}>
              {ICONS.eye(20, COLORS.text.gray, showPassword)}
            </TouchableOpacity>
            <TextInput
              style={[styles.input, { fontFamily: FONTS.regular }]}
              placeholder="******"
              placeholderTextColor={COLORS.text.muted}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(text) => { 
                setPassword(text); 
                if(errors.password) setErrors({...errors, password: ''}); 
              }}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              editable={!loading}
            />
          </View>
          {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

        
          <Text style={[styles.label, { fontFamily: FONTS.bold }]}>تأكيد كلمة المرور</Text>
          <View style={[
            styles.inputContainer, 
            errors.confirmPassword && styles.inputError, 
            confirmPasswordFocused && styles.inputFocused
          ]}>
          
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              activeOpacity={0.7}>
              {ICONS.eye(20, COLORS.text.gray, showConfirmPassword)}
            </TouchableOpacity>
            <TextInput
              style={[styles.input, { fontFamily: FONTS.regular }]}
              placeholder="******"
              placeholderTextColor={COLORS.text.muted}
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={(text) => { 
                setConfirmPassword(text); 
                if(errors.confirmPassword) setErrors({...errors, confirmPassword: ''}); 
              }}
              onFocus={() => setConfirmPasswordFocused(true)}
              onBlur={() => setConfirmPasswordFocused(false)}
              editable={!loading}
            />
          </View>
          {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={loading}
            activeOpacity={0.8}>
            {loading ? (
              <ActivityIndicator color={COLORS.text.white} />
            ) : (
              <Text style={[styles.buttonText, { fontFamily: FONTS.bold }]}>إنشاء الحساب</Text>
            )}
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={[styles.loginText, { fontFamily: FONTS.regular }]}>
              لديك حساب بالفعل؟{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} disabled={loading} activeOpacity={0.7}>
              <Text style={[styles.loginLink, { fontFamily: FONTS.bold }]}>تسجيل الدخول</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background.main },
  scrollContent: { flexGrow: 1, padding: 20 },
  backButton: { alignSelf: 'flex-start', padding: 8, marginBottom: 10 },
  headerContainer: { alignItems: 'center', marginBottom: 25 },
  logoCircle: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: COLORS.background.card, justifyContent: 'center', alignItems: 'center',
    marginBottom: 12, elevation: 6, borderWidth: 1, borderColor: COLORS.border.light, overflow: 'hidden',
  },
  logoImage: { width: 50, height: 50 },
  title: { fontSize: TYPOGRAPHY.sizes['6xl'], color: COLORS.text.dark, marginBottom: 6, textAlign: 'center' },
  subtitle: { fontSize: TYPOGRAPHY.sizes.base, color: COLORS.text.light, textAlign: 'center' },
  formContainer: {
    backgroundColor: COLORS.background.card, borderRadius: 16, padding: 20, elevation: 4,
  },
  label: { fontSize: TYPOGRAPHY.sizes.base, color: COLORS.text.medium, marginBottom: 6, textAlign: 'right' },
  
  inputContainer: {
    flexDirection: 'row', 
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
    borderWidth: 0, 
    outlineStyle: 'none', 
    outlineWidth: 0,
  },
  
  inputError: { borderColor: COLORS.danger },
  errorText: { color: COLORS.danger, fontSize: TYPOGRAPHY.sizes.sm, marginBottom: 10, textAlign: 'right' },
  
  eyeIcon: { padding: 4, marginStart: 4 },
  
  button: {
    backgroundColor: COLORS.primary, borderRadius: 10, padding: 14, alignItems: 'center', marginTop: 8, elevation: 3,
  },
  buttonDisabled: { opacity: 0.7 },
  buttonText: { color: COLORS.text.white, fontSize: TYPOGRAPHY.sizes['2xl'] },
  
  loginContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 16 },
  loginText: { color: COLORS.text.light, fontSize: TYPOGRAPHY.sizes.base },
  loginLink: { color: COLORS.primary, fontSize: TYPOGRAPHY.sizes.base },
});