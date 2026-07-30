// src/screens/main/ProfileScreen.js
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  Alert,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import CommonHeader from "../../components/CommonHeader";
import { COLORS, TYPOGRAPHY, FONTS, ICONS } from "../../constants";
import { useAuth } from '../../constants/AuthContext';

const SETTINGS_MENU = [
  { id: 'language', label: 'اللغة', icon: 'language' },
  { id: 'help', label: 'المساعدة والدعم', icon: 'help' },
];

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState(true);
  
  const { logout: authLogout, currentUser: authUser } = useAuth();

  const user = authUser || {
    name: "زائرنا الكريم",
    email: "guest@hotel.com",
    phone: "غير متوفر",
  };

  const handleLogout = async () => {
    try {
      await authLogout(); // تمسح الجلسة من AsyncStorage
      // ملاحظة: لا نحتاج لـ navigation.replace('Login') هنا، 
      // لأن StackNavigator سيلاحظ تغير isAuthenticated إلى false وينقلك تلقائياً.
    } catch (error) {
      const message = "حدث خطأ أثناء تسجيل الخروج، يرجى المحاولة مرة أخرى.";
      Platform.OS === 'web' ? window.alert(message) : Alert.alert("خطأ", message);
    }
  };

  const navigateHome = () => navigation.navigate('Home');


  const SettingsRow = ({ icon, label, onPress, rightElement }) => (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.rowContent}>
        {ICONS[icon]?.(22, COLORS.text.medium)}
        <Text style={[styles.rowText, { fontFamily: FONTS.regular }]}>{label}</Text>
      </View>
      {rightElement || ICONS.chevronLeft?.(20, COLORS.text.muted)}
    </TouchableOpacity>
  );

  const Avatar = ({ name }) => (
    <View style={styles.avatar}>
      <Text style={[styles.avatarText, { fontFamily: FONTS.bold }]}>
        {name?.charAt(0) || "ز"}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background.card} />

  
      <CommonHeader 
        title="الملف الشخصي" 
        onBack={navigateHome}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* الملف الشخصي */}
        <View style={styles.profileCard}>
          <Avatar name={user.name} />
          <Text style={[styles.userName, { fontFamily: FONTS.bold }]}>{user.name}</Text>
          <Text style={[styles.userInfo, { fontFamily: FONTS.regular }]}>{user.email}</Text>
          <Text style={[styles.userInfo, { fontFamily: FONTS.regular }]}>
            {user.phone || "0500000000"}
          </Text>
        </View>

        {/* الإعدادات */}
        <View style={styles.settingsCard}>
          <Text style={[styles.sectionTitle, { fontFamily: FONTS.bold }]}>الإعدادات</Text>

          <SettingsRow
            icon="notifications"
            label="الإشعارات"
            rightElement={
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: COLORS.border.medium, true: COLORS.primary }}
                thumbColor={COLORS.background.card}
              />
            }
          />

          {SETTINGS_MENU.map((item) => (
            <SettingsRow
              key={item.id}
              icon={item.icon}
              label={item.label}
              onPress={() => Alert.alert('تنبيه', `جاري الانتقال إلى: ${item.label}`)}
            />
          ))}
        </View>

    
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.7}>
          {ICONS.logout?.(22, COLORS.danger)}
          <Text style={[styles.logoutText, { fontFamily: FONTS.bold }]}>تسجيل الخروج</Text>
        </TouchableOpacity>

        <Text style={[styles.version, { fontFamily: FONTS.regular }]}>الإصدار 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.main,
  },
  content: {
    paddingBottom: 30,
    paddingHorizontal: 16,
  },
  profileCard: {
    backgroundColor: COLORS.background.card,
    padding: 24,
    alignItems: "center",
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: COLORS.shadow.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  avatarText: {
    fontSize: TYPOGRAPHY.sizes['4xl'],
    color: COLORS.primary,
  },
  userName: {
    fontSize: TYPOGRAPHY.sizes['4xl'],
    color: COLORS.text.dark,
    marginBottom: 4,
    textAlign: "center",
  },
  userInfo: {
    color: COLORS.text.muted,
    fontSize: TYPOGRAPHY.sizes.base,
    marginTop: 2,
    textAlign: "center",
  },
  settingsCard: {
    backgroundColor: COLORS.background.card,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: COLORS.shadow.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.sizes.lg,
    color: COLORS.text.muted,
    padding: 16,
    paddingBottom: 8,
    textAlign: "right",
  },
  row: {
    height: 55,
    borderTopWidth: 1,
    borderTopColor: COLORS.border.light,
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  rowContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  rowText: {
    fontSize: TYPOGRAPHY.sizes.base,
    color: COLORS.text.dark,
    textAlign: "right",
  },
  logoutButton: {
    backgroundColor: COLORS.background.card,
    marginTop: 20,
    height: 55,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: COLORS.danger + '30',
  },
  logoutText: {
    color: COLORS.danger,
    fontSize: TYPOGRAPHY.sizes.base,
  },
  version: {
    textAlign: "center",
    color: COLORS.text.muted,
    fontSize: TYPOGRAPHY.sizes.sm,
    marginTop: 20,
  },
});