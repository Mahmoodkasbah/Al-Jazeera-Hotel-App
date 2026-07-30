// src/components/ServiceCard.js

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// ✅ استيراد الثوابت والإيقونات
import { COLORS, TYPOGRAPHY, FONTS } from "../constants";

export default function ServiceCard({ service, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.card, !service.available && styles.unavailable]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={styles.info}>
        <View style={styles.header}>
          <Text style={[styles.title, { fontFamily: FONTS.bold }]}>{service.title}</Text>
          <Text style={[styles.categoryTag, { fontFamily: FONTS.regular }]}>{service.category}</Text>
        </View>
        <Text style={[styles.description, { fontFamily: FONTS.regular }]} numberOfLines={2}>
          {service.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.background.card,
    borderRadius: 6,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.border.medium,
  },
  unavailable: { 
    opacity: 0.5 
  },
  info: { 
    flex: 1 
  },
  header: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.lg,
    color: COLORS.text.dark,
    flex: 1,
    marginLeft: 8,
    textAlign: "right",
    writingDirection: "rtl",
  },
  description: { 
    fontSize: TYPOGRAPHY.sizes.md, 
    color: COLORS.text.light, 
    marginBottom: 6, 
    textAlign: "right", 
    writingDirection: "rtl" 
  },
  categoryTag: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.text.gray,
    backgroundColor: COLORS.background.lightGray,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    textAlign: "right",
    writingDirection: "rtl",
  },
});