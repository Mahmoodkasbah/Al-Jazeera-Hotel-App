// src/navigation/StackNavigator.js

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, ActivityIndicator } from 'react-native';

import { useAuth } from '../constants/AuthContext';

import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import MainDrawerNavigator from './MainDrawerNavigator';
import RoomsScreen from '../screens/main/RoomsScreen';  
import ServicesScreen from '../screens/main/ServicesScreen';
import BookingDetailsScreen from '../screens/main/BookingDetailsScreen';
import NotificationsScreen from '../screens/main/NotificationsScreen';
import ComingSoonScreen from '../screens/ComingSoonScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right'
      }}
    >
      {isAuthenticated ? (
        // ===== شاشات المستخدم المسجّل دخوله =====
        <>
          <Stack.Screen name="MainDrawer" component={MainDrawerNavigator} />
          <Stack.Screen name="Rooms" component={RoomsScreen} />
          <Stack.Screen name="Services" component={ServicesScreen} />
          <Stack.Screen name="BookingDetails" component={BookingDetailsScreen} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
          <Stack.Screen name="CheckIn" component={ComingSoonScreen} />
          <Stack.Screen name="SearchResults" component={ComingSoonScreen} />
          <Stack.Screen name="Reviews" component={ComingSoonScreen} />
        </>
      ) : (
        // ===== شاشات تسجيل الدخول =====
        <>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}