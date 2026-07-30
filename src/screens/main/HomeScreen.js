// src/screens/main/HomeScreen.js

import { useNavigation, DrawerActions } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { COLORS, TYPOGRAPHY, FONTS, ICONS } from '../../constants';
import { ROOM_CATEGORIES } from '../../data/rooms';
import { useAuth } from '../../constants/AuthContext'; 

const ROUTES = {
  Rooms: 'Rooms',
  MyBookings: 'MyBookings',
  Services: 'Services',
  Profile: 'Profile',
  Reviews: 'Reviews',
  Notifications: 'Notifications',
};

const QUICK_ACTIONS = [
  { id: '1', title: 'حجز جديد', icon: 'bed', screen: 'Rooms' },
  { id: '2', title: 'حجوزاتي', icon: 'calendar', screen: 'MyBookings' },
  { id: '3', title: 'طلب خدمات', icon: 'roomService', screen: 'Services' },
];

const FACILITIES = [
  { id: '1', title: 'مسبح', icon: 'pool' },
  { id: '2', title: 'المطاعم والمقاهي', icon: 'restaurant' },
  { id: '3', title: 'اللياقة البدنية', icon: 'fitness' },
  { id: '4', title: 'إنترنت لاسلكي', icon: 'wifi' },
  { id: '5', title: 'مكتبة', icon: 'library' },
  { id: '6', title: 'حديقة', icon: 'park' },
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const { currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [greeting, setGreeting] = useState('');
  const [notificationCount, setNotificationCount] = useState(3);

  useEffect(() => {
    const hour = new Date().getHours();
    setGreeting(
      hour < 12 ? 'صباح الخير' : hour < 18 ? 'مساء الخير' : 'طابت ليلتك'
    );
  }, []);

  const userName = currentUser?.name || 'زائرنا الكريم';

  const handleAction = (screen, title) => {
    ROUTES[screen]
      ? navigation.navigate(ROUTES[screen])
      : Alert.alert('تنبيه', `جاري الانتقال إلى: ${title}`);
  };

  const handleSearch = () => {
    searchQuery.trim()
      ? navigation.navigate('SearchResults', { query: searchQuery })
      : Alert.alert('تنبيه', 'الرجاء إدخال نص للبحث');
  };

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const Icon = ({ name, size = 22, color = COLORS.text.dark }) => {
    const IconComponent = ICONS[name];
    return IconComponent ? IconComponent(size, color) : null;
  };

  const ActionButton = ({ item }) => (
    <TouchableOpacity
      style={styles.actionItem}
      onPress={() => handleAction(item.screen, item.title)}>
      <View style={styles.actionIconCircle}>
        <Icon name={item.icon} size={24} color={COLORS.primary} />
      </View>
      <Text style={[styles.actionLabel, { fontFamily: FONTS.bold }]}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  const FacilityItem = ({ item }) => (
    <TouchableOpacity
      style={styles.facilityItem}
      onPress={() => Alert.alert('المرافق', `تم اختيار: ${item.title}`)}>
      <View style={styles.facilityIconCircle}>
        <Icon name={item.icon} size={24} color={COLORS.primary} />
      </View>
      <Text style={[styles.facilityLabel, { fontFamily: FONTS.regular }]}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  const RoomCard = ({ room }) => (
    <TouchableOpacity
      style={styles.roomCardSimple}
      onPress={() => handleAction('Rooms', room.title)}>
      <View style={styles.imageWrapper}>
        <Image source={room.image} style={styles.roomImageSimple} />
        <View style={styles.priceTag}>
          <Text style={[styles.priceTagText, { fontFamily: FONTS.bold }]}>
            {room.price}
          </Text>
        </View>
      </View>
      <View style={styles.roomInfoSimple}>
        <Text
          style={[styles.roomTitleSimple, { fontFamily: FONTS.bold }]}
          numberOfLines={1}>
          {room.title}
        </Text>
        {room.shortDesc && (
          <Text 
            style={[styles.roomShortDesc, { fontFamily: FONTS.regular }]} 
            numberOfLines={1}>
            {room.shortDesc}
          </Text>
        )}
        <Text style={[styles.roomSubSimple, { fontFamily: FONTS.regular }]}>
          غرفة فاخرة
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.background.card}
      />

      <SafeAreaView style={styles.headerSafeArea}>
        <View style={styles.topHeader}>
          
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('Notifications')}
            activeOpacity={0.7}>
            <View style={styles.iconWrapper}>
              {ICONS.notifications ? (
                ICONS.notifications(24, COLORS.text.dark)
              ) : (
                <Text style={{ fontSize: 24, color: COLORS.text.dark }}>🔔</Text>
              )}
              {notificationCount > 0 && (
                <View style={styles.notificationBadge}>
                  <Text style={[styles.notificationBadgeText, { fontFamily: FONTS.bold }]}>
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>

          <View style={styles.locationContainer}>
            <Text style={[styles.locationSub, { fontFamily: FONTS.regular }]}>
              موقعك الحالي
            </Text>
            <View style={styles.locationRow}>
              <Icon name="location" size={16} color={COLORS.primary} />
              <Text style={[styles.locationText, { fontFamily: FONTS.bold }]}>
                فلسطين قطاع غزة
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={openDrawer}
            activeOpacity={0.7}>
            {ICONS.menu ? (
              ICONS.menu(28, COLORS.text.dark)
            ) : (
              <Text style={{ fontSize: 28, color: COLORS.text.dark }}>☰</Text>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        
        <View style={styles.searchSection}>
          <Text style={[styles.welcomeText, { fontFamily: FONTS.regular }]}>
            {greeting}، {userName}
          </Text>
          <Text style={[styles.searchTitle, { fontFamily: FONTS.bold }]}>
            ابحث عن إقامتك القادمة
          </Text>

          {/* حقل البحث المعدل بدون زر وبدون أيقونة زائدة */}
          <View style={styles.searchBar}>
            <View style={styles.searchIconContainer}>
              <Icon name="search" size={20} color={COLORS.text.muted} />
            </View>
            <TextInput
              style={[styles.searchInput, { fontFamily: FONTS.regular }]}
              placeholder="الوجهة، تاريخ الدخول..."
              placeholderTextColor={COLORS.text.muted}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
            />
          </View>
        </View>

        <View style={styles.promoSlider}>
          <ImageBackground
            source={require('../../../assets/images/image.jpg')}
            style={styles.promoCard}
            imageStyle={{ borderRadius: 16 }}>
            <View style={styles.promoOverlay} />
            <View style={styles.promoContent}>
              <Text style={[styles.promoTag, { fontFamily: FONTS.bold }]}>
                عرض الحجز المبكر
              </Text>
              <Text style={[styles.promoTitle, { fontFamily: FONTS.bold }]}>
                خصم 20% على الأجنحة الملكية
              </Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.actionsGrid}>
          {QUICK_ACTIONS.map((item) => (
            <ActionButton key={item.id} item={item} />
          ))}
        </View>

        <Text style={[styles.sectionTitle, { fontFamily: FONTS.bold }]}>
          مرافق الفندق
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
          contentContainerStyle={styles.facilitiesScroll}>
          {FACILITIES.map((item) => (
            <FacilityItem key={item.id} item={item} />
          ))}
        </ScrollView>

        <Text style={[styles.sectionTitleRooms, { fontFamily: FONTS.bold }]}>
          استكشف الغرف والأجنحة
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
          contentContainerStyle={styles.horizontalScrollSimple}>
          {ROOM_CATEGORIES.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </ScrollView>

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background.light },

  headerSafeArea: {
    backgroundColor: COLORS.background.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background.lightGray,
  },

  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginTop: Platform.OS === 'android' ? 25 : 0,
  },

  iconButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconWrapper: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },

  notificationBadge: {
    position: 'absolute',
    top: -6,
    right: -8,
    backgroundColor: COLORS.danger || '#FF3B30',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  notificationBadgeText: {
    color: COLORS.text.white,
    fontSize: TYPOGRAPHY.sizes.xs,
    textAlign: 'center',
  },

  locationContainer: {
    alignItems: 'center',
    flex: 1,
  },
  locationSub: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.text.muted,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    gap: 4,
  },
  locationText: {
    fontSize: TYPOGRAPHY.sizes.base,
    color: COLORS.text.dark,
  },

  scrollContent: { paddingBottom: 30, paddingTop: 4 },

  searchSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'flex-end',
  },

  welcomeText: { fontSize: TYPOGRAPHY.sizes.base, color: COLORS.text.muted },
  searchTitle: {
    fontSize: TYPOGRAPHY.sizes['5xl'],
    color: COLORS.text.dark,
    marginTop: 4,
    marginBottom: 15,
  },

  searchBar: {
    backgroundColor: COLORS.background.card,
    borderRadius: 14,
    flexDirection: 'row-reverse', // لجعل الأيقونة في اليمين والنص يبدأ بجانبها
    alignItems: 'center',
    paddingHorizontal: 14,
    height: 54,
    borderWidth: 1,
    borderColor: COLORS.border.light,
    width: '100%',
  },

  searchInput: {
    flex: 1,
    textAlign: 'right',
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.text.dark,
    paddingRight: 10,
    writingDirection: 'rtl',
    backgroundColor: 'transparent',
  },

  searchIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  promoSlider: { marginVertical: 20, width: '100%' },
  promoCard: {
    marginHorizontal: 20,
    height: 140,
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'center',
    padding: 20,
  },
  promoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.overlay,
    borderRadius: 16,
  },
  promoContent: { alignItems: 'flex-end' },
  promoTag: {
    color: COLORS.gold,
    fontSize: TYPOGRAPHY.sizes.sm,
    marginBottom: 5,
  },
  promoTitle: { color: COLORS.text.white, fontSize: TYPOGRAPHY.sizes.xl },

  actionsGrid: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 25,
  },

  actionItem: { alignItems: 'center', width: '30%' },
  actionIconCircle: {
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: COLORS.background.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.background.lightGray,
  },
  actionLabel: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.text.dark,
    marginTop: 8,
    textAlign: 'center',
  },

  sectionTitle: {
    fontSize: TYPOGRAPHY.sizes.xl,
    color: COLORS.text.dark,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 12,
    textAlign: 'right',
  },

  sectionTitleRooms: {
    fontSize: TYPOGRAPHY.sizes.xl,
    color: COLORS.text.dark,
    marginHorizontal: 20,
    marginTop: 40,
    marginBottom: 12,
    textAlign: 'right',
  },

  horizontalScroll: { flexGrow: 0 },

  facilitiesScroll: {
    paddingHorizontal: 20,
    gap: 12,
    flexDirection: 'row-reverse', 
  },

  facilityItem: { alignItems: 'center', width: 70 },
  facilityIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.background.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border.light,
    marginBottom: 4,
  },
  facilityLabel: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.text.dark,
    textAlign: 'center',
  },

  horizontalScrollSimple: {
    paddingHorizontal: 16,
    gap: 12,
    flexDirection: 'row-reverse', 
  },

  roomCardSimple: {
    width: 160,
    backgroundColor: COLORS.background.card,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border.gray,
    shadowColor: COLORS.shadow.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  imageWrapper: { position: 'relative' },
  roomImageSimple: { width: 160, height: 100 },

  priceTag: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priceTagText: { color: COLORS.text.white, fontSize: TYPOGRAPHY.sizes.sm },

  roomInfoSimple: {
    padding: 8,
    alignItems: 'flex-end',
    backgroundColor: COLORS.background.card,
  },

  roomTitleSimple: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.text.dark,
    textAlign: 'right',
  },

  roomShortDesc: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.text.muted,
    marginTop: 3,
    marginBottom: 3,
    textAlign: 'right',
    writingDirection: 'rtl',
  },

  roomSubSimple: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.text.muted,
    marginTop: 2,
    textAlign: 'right',
  },
});