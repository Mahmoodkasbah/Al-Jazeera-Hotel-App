// src/components/RoomCard.js

import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// ✅ استيراد الثوابت والإيقونات
import { COLORS, TYPOGRAPHY, FONTS } from "../constants";

export default function RoomCard({ room, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.roomCard, !room.available && styles.roomUnavailable]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Image source={room.image} style={styles.roomImage} />

      {!room.available && (
        <View style={styles.unavailableBadge}>
          <Text style={[styles.unavailableText, { fontFamily: FONTS.bold }]}>غير متاحة</Text>
        </View>
      )}

      <View style={styles.roomDetails}>
        <View style={styles.roomHeader}>
          <Text style={[styles.roomTitle, { fontFamily: FONTS.bold }]}>{room.title}</Text>
          <Text style={[styles.roomPrice, { fontFamily: FONTS.bold }]}>
            {room.price} {room.currency}
          </Text>
        </View>

        <Text style={[styles.roomDescription, { fontFamily: FONTS.regular }]} numberOfLines={2}>
          {room.description}
        </Text>

        <View style={styles.roomFeatures}>
          <Text style={[styles.featureText, { fontFamily: FONTS.regular }]}>{room.capacity} أشخاص</Text>
          <Text style={[styles.featureText, { fontFamily: FONTS.regular }]}>• {room.bedType}</Text>
          <Text style={[styles.featureText, { fontFamily: FONTS.regular }]}>• {room.size}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  roomCard: {
    backgroundColor: COLORS.background.card,
    borderRadius: 6,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border.medium,
    overflow: "hidden",
  },
  roomUnavailable: { 
    opacity: 0.5 
  },
  roomImage: { 
    width: "100%", 
    height: 150 
  },
  unavailableBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: COLORS.danger,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  unavailableText: { 
    color: COLORS.text.white, 
    fontSize: TYPOGRAPHY.sizes.xs, 
    writingDirection: "rtl" 
  },
  roomDetails: { 
    padding: 12 
  },
  roomHeader: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  roomTitle: {
    fontSize: TYPOGRAPHY.sizes.lg,
    color: COLORS.text.dark,
    flex: 1,
    textAlign: "right",
    writingDirection: "rtl",
  },
  roomPrice: { 
    fontSize: TYPOGRAPHY.sizes.xl, 
    color: COLORS.text.dark, 
    textAlign: "left" 
  },
  roomDescription: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.text.gray,
    marginBottom: 8,
    textAlign: "right",
    writingDirection: "rtl",
  },
  roomFeatures: { 
    flexDirection: "row-reverse", 
    gap: 6 
  },
  featureText: { 
    fontSize: TYPOGRAPHY.sizes.sm, 
    color: COLORS.text.gray, 
    textAlign: "right", 
    writingDirection: "rtl" 
  },
});