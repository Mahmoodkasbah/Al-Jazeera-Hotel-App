// src/screens/ComingSoonScreen.js
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import CommonHeader from "../components/CommonHeader";
import { COLORS, TYPOGRAPHY, FONTS, ICONS } from "../constants";

const LABELS = {
  CheckIn: "دخول إلكتروني",
  Explore: "استكشف",
  Notifications: "الإشعارات",
  SearchResults: "نتائج البحث",
  Reviews: "التقييمات",
};

export default function ComingSoonScreen({ route }) {
  const navigation = useNavigation();
  const title = LABELS[route.name] || route.name;

  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader 
        title={title} 
        onBack={() => navigation.goBack()} 
      />

      <View style={styles.content}>
        {ICONS.help(48, COLORS.text.muted)}
        <Text style={[styles.title, { fontFamily: FONTS.bold }]}>{title}</Text>
        <Text style={[styles.subtitle, { fontFamily: FONTS.regular }]}>
          هذه الشاشة قيد التطوير حالياً 
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.background.main 
  },
  content: { 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center", 
    paddingHorizontal: 20,
  },
  title: { 
    fontSize: TYPOGRAPHY.sizes.xl, 
    color: COLORS.text.dark, 
    marginTop: 16,
    textAlign: "center",
  },
  subtitle: { 
    fontSize: TYPOGRAPHY.sizes.base, 
    color: COLORS.text.muted, 
    marginTop: 8,
    textAlign: "center",
  },
});