// src/navigation/MainTabNavigator.js
// الشريط السفلي
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS, FONTS, TYPOGRAPHY, ICONS } from '../constants';

import HomeScreen from '../screens/main/HomeScreen';
import MyBookingsScreen from '../screens/main/MyBookingsScreen';
import ComingSoonScreen from '../screens/ComingSoonScreen';
import ProfileScreen from '../screens/main/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home" 
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.background.card,
          borderTopWidth: 1,
          borderTopColor: COLORS.border.light,
          height: 70,
          paddingBottom: 8,
          paddingTop: 8,
          shadowColor: COLORS.shadow?.dark || '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 3,
          elevation: 5,
        },
        tabBarLabelStyle: {
          fontFamily: FONTS.regular,
          fontSize: TYPOGRAPHY.sizes.xs,
          marginTop: 4,
        },
        tabBarIcon: ({ focused, color, size }) => {
          const iconColor = focused ? COLORS.primary : COLORS.text.muted;
          
          if (route.name === 'Home') return ICONS.home(size, iconColor);
          if (route.name === 'MyBookings') return ICONS.calendar(size, iconColor);
          if (route.name === 'Explore') return ICONS.search(size, iconColor);
          if (route.name === 'Profile') return ICONS.user(size, iconColor);
          
          return null;
        },
      })}
    >
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'حسابي' }} />
      <Tab.Screen name="Explore" component={ComingSoonScreen} options={{ tabBarLabel: 'استكشف' }} />
      <Tab.Screen name="MyBookings" component={MyBookingsScreen} options={{ tabBarLabel: 'حجوزاتي' }} />
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'الرئيسية' }} />
    </Tab.Navigator>
  );
}