// src/components/BookingCard.js

import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// ✅ استيراد الثوابت والإيقونات
import { COLORS, TYPOGRAPHY, FONTS, ICONS } from "../constants";

export default function BookingCard({ booking, onPress }) {
  const isUpcoming = booking.status === "قادمة";

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={onPress}>
      <Image source={booking.image} style={styles.image} />

      <View style={styles.content}>
        <View style={styles.rowTop}>
          <View style={[styles.status, isUpcoming && styles.statusUpcoming]}>
            <Text style={[styles.statusText, isUpcoming && styles.statusTextUpcoming, { fontFamily: FONTS.bold }]}>
              {booking.status}
            </Text>
          </View>

          <View style={{ alignItems: "flex-end" }}>
            <Text style={[styles.hotel, { fontFamily: FONTS.bold }]}>{booking.hotel}</Text>
            <Text style={[styles.room, { fontFamily: FONTS.regular }]}>{booking.room}</Text>
          </View>
        </View>

        <View style={styles.line} />

        <View style={styles.bottom}>
          <Text style={[styles.price, { fontFamily: FONTS.bold }]}>{booking.price}</Text>
          <View style={styles.dateContainer}>
            {ICONS.calendar(14, COLORS.text.gray)}
            <Text style={[styles.date, { fontFamily: FONTS.regular }]}>{booking.date}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.background.card,
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 14,
    overflow: "hidden",
    elevation: 2,
    shadowColor: COLORS.shadow.dark,
    shadowOpacity: 0.05,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.border.gray,
  },
  image: { 
    width: "100%", 
    height: 150 
  },
  content: { 
    padding: 14 
  },
  rowTop: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center" 
  },
  hotel: { 
    fontSize: TYPOGRAPHY.sizes['2xl'], 
    color: COLORS.text.dark, 
    textAlign: "right", 
    writingDirection: "rtl" 
  },
  room: { 
    fontSize: TYPOGRAPHY.sizes.base, 
    color: COLORS.text.gray, 
    marginTop: 5, 
    textAlign: "right", 
    writingDirection: "rtl" 
  },
  status: { 
    backgroundColor: COLORS.background.lightGray, 
    paddingHorizontal: 12, 
    paddingVertical: 5, 
    borderRadius: 20 
  },
  statusUpcoming: { 
    backgroundColor: "#dcfce7" 
  },
  statusText: { 
    fontSize: TYPOGRAPHY.sizes.sm, 
    color: COLORS.text.muted 
  },
  statusTextUpcoming: { 
    color: COLORS.status.upcoming 
  },
  line: { 
    height: 1, 
    backgroundColor: COLORS.border.gray, 
    marginVertical: 14 
  },
  bottom: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center" 
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  date: { 
    fontSize: TYPOGRAPHY.sizes.md, 
    color: COLORS.text.gray, 
    textAlign: "right", 
    writingDirection: "rtl" 
  },
  price: { 
    fontSize: TYPOGRAPHY.sizes['3xl'], 
    color: COLORS.primary, 
    textAlign: "left" 
  },
});