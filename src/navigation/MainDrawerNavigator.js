// src/navigation/MainDrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { COLORS, FONTS, ICONS } from '../constants';
import { useAuth } from '../constants/AuthContext';

// استيراد الشاشات
import MainTabNavigator from './MainTabNavigator';
import RoomsScreen from '../screens/main/RoomsScreen';
import ServicesScreen from '../screens/main/ServicesScreen';
import MyBookingsScreen from '../screens/main/MyBookingsScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import NotificationsScreen from '../screens/main/NotificationsScreen';
import ComingSoonScreen from '../screens/ComingSoonScreen';

const Drawer = createDrawerNavigator();

// ✅ مكون القائمة المخصص
function CustomDrawerContent({ navigation }) {
  const { currentUser, logout } = useAuth();

  // ✅ عناصر القائمة مع الأيقونات
  const menuItems = [
    { id: 'Home', label: 'الرئيسية', icon: 'home' },
    { id: 'MyBookings', label: 'حجوزاتي', icon: 'calendar' },
    { id: 'Notifications', label: 'الإشعارات', icon: 'notifications' },
    { id: 'Profile', label: 'حسابي', icon: 'user' },
  ];

  const navigateTo = (screen) => {
    navigation.navigate(screen);
    navigation.closeDrawer();
  };

  return (
    <SafeAreaView style={styles.drawerContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/*  قسم الملف الشخصي */}
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Text style={[styles.avatarText, { fontFamily: FONTS.bold }]}>
              {currentUser?.name?.charAt(0) || 'ز'}
            </Text>
          </View>
          <Text style={[styles.userName, { fontFamily: FONTS.bold }]}>
            {currentUser?.name || 'زائرنا الكريم'}
          </Text>
          <Text style={[styles.userEmail, { fontFamily: FONTS.regular }]}>
            {currentUser?.email || 'guest@hotel.com'}
          </Text>
        </View>

        {/*  خط فاصل */}
        <View style={styles.divider} />

        {/*  قائمة العناصر */}
        <View style={styles.menuSection}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => navigateTo(item.id)}
              activeOpacity={0.7}
            >
              <View style={styles.menuItemContent}>
                <View style={styles.iconWrapper}>
                  {ICONS[item.icon] ? (
                    ICONS[item.icon](24, COLORS.primary)
                  ) : (
                    <Text style={styles.iconPlaceholder}>•</Text>
                  )}
                </View>
                <Text style={[styles.menuLabel, { fontFamily: FONTS.regular }]}>
                  {item.label}
                </Text>
              </View>
              <Text style={styles.menuArrow}>‹</Text>
            </TouchableOpacity>
          ))}
        </View>


        <View style={styles.divider} />

        {/*  زر تسجيل الخروج */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            navigation.closeDrawer();
            logout();
          }}
          activeOpacity={0.7}
        >
          <View style={styles.menuItemContent}>
            <View style={styles.iconWrapper}>
              {ICONS.logout ? (
                ICONS.logout(24, COLORS.danger)
              ) : (
                <Text style={styles.iconPlaceholder}></Text>
              )}
            </View>
            <Text style={[styles.logoutText, { fontFamily: FONTS.bold }]}>
              تسجيل الخروج
            </Text>
          </View>
        </TouchableOpacity>

    
        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
}

//  Drawer Navigator
export default function MainDrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
        drawerStyle: {
          width: 300,
          backgroundColor: COLORS.background.card,
        },
        drawerType: 'front',
        overlayColor: COLORS.overlay || 'rgba(0,0,0,0.4)',
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={MainTabNavigator} />
      <Drawer.Screen name="Rooms" component={RoomsScreen} />
      <Drawer.Screen name="MyBookings" component={MyBookingsScreen} />
      <Drawer.Screen name="Services" component={ServicesScreen} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Explore" component={ComingSoonScreen} />
    </Drawer.Navigator>
  );
}

// ✅ الأنماط
const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: COLORS.background.card,
  },
  profileSection: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primaryLight || '#e8f2ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  avatarText: {
    fontSize: 32,
    color: COLORS.primary,
  },
  userName: {
    fontSize: 18,
    color: COLORS.text.dark,
    textAlign: 'center',
  },
  userEmail: {
    fontSize: 13,
    color: COLORS.text.muted,
    textAlign: 'center',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border.light || '#eeeeee',
    marginHorizontal: 16,
    marginVertical: 8,
  },
  menuSection: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  menuItem: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginVertical: 2,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconWrapper: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconPlaceholder: {
    fontSize: 20,
    color: COLORS.text.muted,
  },
  menuLabel: {
    fontSize: 16,
    color: COLORS.text.dark,
    textAlign: 'right',
  },
  menuArrow: {
    fontSize: 18,
    color: COLORS.text.muted,
  },
  logoutButton: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginHorizontal: 8,
    borderRadius: 8,
    marginTop: 4,
    marginBottom: 8,
    backgroundColor: COLORS.danger + '10', // شفافية خفيفة
  },
  logoutText: {
    fontSize: 16,
    color: COLORS.danger,
    textAlign: 'right',
  },
  bottomSpace: {
    height: 30,
  },
});