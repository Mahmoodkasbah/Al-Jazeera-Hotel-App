// src/screens/main/MyBookingsScreen.js

import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";

import BookingCard from "../../components/BookingCard";
import CommonHeader from "../../components/CommonHeader";
import { COLORS } from "../../constants"; 

export default function MyBookingsScreen() {
  const navigation = useNavigation();

  const bookings = [
    {
      id: "1",
      hotel: "فندق الجزيرة",
      room: "جناح ملكي",
      date: "24 يوليو - 28 يوليو",
      price: "$350",
      status: "قادمة",
      image: require("../../../assets/images/royal-suite.jpg"),
    },
    {
      id: "2",
      hotel: "فندق الجزيرة",
      room: "غرفة مطلة على البحر",
      date: "15 يونيو - 18 يونيو",
      price: "$190",
      status: "مكتملة",
      image: require("../../../assets/images/seaview.jpg"),
    },
    {
      id: "3",
      hotel: "فندق الجزيرة",
      room: "غرفة عائلية",
      date: "10 أغسطس - 15 أغسطس",
      price: "$280",
      status: "قادمة",
      image: require("../../../assets/images/family-suite.jpg"),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background.card} />

      <CommonHeader 
        title="حجوزاتي" 
        onBack={() => navigation.goBack()} 
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        
        {bookings.length > 0 ? (
          bookings.map((item) => (
            <BookingCard
              key={item.id}
              booking={item}
              onPress={() => navigation.navigate("BookingDetails", { booking: item })}
            />
          ))
        ) : (
         
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { fontFamily: 'Cairo-Regular' }]}>
              لا توجد حجوزات حالياً
            </Text>
          </View>
        )}
        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.main,
  },
  scrollContent: {
    paddingBottom: 20,

  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.text.muted,
  }
});