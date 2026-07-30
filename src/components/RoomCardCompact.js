// src/components/RoomCardCompact.js
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, TYPOGRAPHY, FONTS } from "../constants";

export default function RoomCardCompact({ room, onPress }) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={onPress}>
      <View style={styles.imageWrapper}>
        <Image source={room.image} style={styles.image} resizeMode="cover" />
        <View style={styles.priceTag}>
          <Text style={[styles.priceText, { fontFamily: FONTS.bold }]}>
            {room.price}
          </Text>
        </View>
      </View>
      <View style={styles.info}>
        <Text style={[styles.title, { fontFamily: FONTS.bold }]} numberOfLines={1}>
          {room.title}
        </Text>
        <Text style={[styles.subtitle, { fontFamily: FONTS.regular }]}>
          غرفة فاخرة
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 140,
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
  image: { width: 140, height: 100 },
  priceTag: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priceText: { color: COLORS.text.white, fontSize: TYPOGRAPHY.sizes.sm },
  info: { padding: 10, alignItems: 'flex-end' },
  title: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.text.dark,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  subtitle: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.text.muted,
    marginTop: 2,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
});