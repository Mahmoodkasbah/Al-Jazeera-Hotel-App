// src/screens/main/NotificationsScreen.js

import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CommonHeader from "../../components/CommonHeader";
import { COLORS, TYPOGRAPHY, FONTS } from "../../constants";

export default function NotificationsScreen() {
  const navigation = useNavigation();

  const [notifications] = useState([
    {
      id: "1",
      title: "تم تأكيد الحجز",
      message: "تم تأكيد حجزك في الفندق بنجاح.",
      time: "منذ 5 دقائق",
    },
    {
      id: "2",
      title: "عرض جديد",
      message: "احصل على خصم 20% على الحجز القادم.",
      time: "منذ ساعة",
    },
    {
      id: "3",
      title: "تذكير بالدفع",
      message: "يرجى إكمال عملية الدفع للحجز القادم.",
      time: "منذ 3 ساعات",
    },
    {
      id: "4",
      title: "تقييم الإقامة",
      message: "نتمنى أن تكون استمتعت بإقامتك معنا.",
      time: "أمس",
    },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background.main} />

      <CommonHeader 
        title="الإشعارات" 
        onBack={() => navigation.goBack()} 
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {notifications.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={[styles.title, { fontFamily: FONTS.bold }]}>
              {item.title}
            </Text>
            <Text style={[styles.message, { fontFamily: FONTS.regular }]}>
              {item.message}
            </Text>
            <Text style={[styles.time, { fontFamily: FONTS.regular }]}>
              {item.time}
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.main,
  },
  card: {
    backgroundColor: COLORS.background.card,
    marginHorizontal: 15,
    marginTop: 12,
    padding: 15,
    borderRadius: 10,
    shadowColor: COLORS.shadow.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.xl,
    color: COLORS.text.dark,
    marginBottom: 6,
    writingDirection: "rtl",
  },
  message: {
    fontSize: TYPOGRAPHY.sizes.base,
    color: COLORS.text.medium,
    lineHeight: 20,
    writingDirection: "rtl",
  },
  time: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text.muted,
    marginTop: 8,
    writingDirection: "rtl",
  },
});