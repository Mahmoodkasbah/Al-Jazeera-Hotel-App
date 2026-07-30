// src/screens/main/BookingDetailsScreen.js

import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import CommonHeader from '../../components/CommonHeader';
import { COLORS, TYPOGRAPHY, FONTS } from '../../constants';

// بيانات ثابتة للعرض
const EXTRA_INFO = [
  { label: 'عدد الضيوف', value: '3' },
  { label: 'طريقة الدفع', value: 'بطاقة ائتمان' },
];

export default function BookingDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { booking } = route.params || {};


  if (!booking) {
    return (
      <SafeAreaView style={styles.container}>
        <CommonHeader title="تفاصيل الحجز" onBack={navigation.goBack} />
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { fontFamily: FONTS.regular }]}>
            لا توجد تفاصيل لهذا الحجز
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const cancelBooking = () => {
    Alert.alert('إلغاء الحجز', 'هل أنت متأكد من رغبتك في إلغاء هذا الحجز؟', [
      { text: 'تراجع', style: 'cancel' },
      {
        text: 'نعم، إلغاء',
        style: 'destructive',
        onPress: () => {
          Alert.alert('تم', 'تم إلغاء الحجز بنجاح');
          navigation.goBack();
        },
      },
    ]);
  };

 
  const DetailRow = ({ label, value, isPrice = false, isStatus = false }) => (
    <View style={styles.row}>

      <Text style={[styles.label, { fontFamily: FONTS.regular }]}>{label}</Text>
   
      <Text
        style={[
          isPrice ? styles.price : styles.value,
          isStatus && { color: COLORS.status.upcoming },
          { fontFamily: isPrice || isStatus ? FONTS.bold : FONTS.regular },
        ]}>
        {value}
      </Text>
    </View>
  );

  const ExtraInfoItem = ({ label, value }) => (
    <View style={styles.extraInfoRow}>
      <Text style={[styles.infoLabel, { fontFamily: FONTS.bold }]}>{label}:</Text>
      <Text style={[styles.infoValue, { fontFamily: FONTS.regular }]}>{value}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background.main} />

      <CommonHeader title="تفاصيل الحجز" onBack={navigation.goBack} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={typeof booking.image === 'string' ? { uri: booking.image } : booking.image}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.card}>
          <Text style={[styles.hotel, { fontFamily: FONTS.bold }]}>{booking.hotel}</Text>
          <Text style={[styles.room, { fontFamily: FONTS.regular }]}>{booking.room}</Text>

          <View style={styles.divider} />

          <DetailRow label="الحالة" value={booking.status} isStatus />
          <DetailRow label="التاريخ" value={booking.date} />
          <DetailRow label="السعر" value={booking.price} isPrice />
        </View>

        <View style={styles.card}>
          <Text style={[styles.sectionTitle, { fontFamily: FONTS.bold }]}>معلومات إضافية</Text>
          {EXTRA_INFO.map((item, index) => (
            <ExtraInfoItem key={index} label={item.label} value={item.value} />
          ))}
          <ExtraInfoItem label="رقم الحجز" value={`#${booking.id}`} />
        </View>

        {booking.status === 'قادمة' && (
          <TouchableOpacity style={styles.cancelButton} onPress={cancelBooking} activeOpacity={0.8}>
            <Text style={[styles.cancelText, { fontFamily: FONTS.bold }]}>إلغاء الحجز</Text>
          </TouchableOpacity>
        )}
        
        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.main,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: TYPOGRAPHY.sizes.lg,
    color: COLORS.text.muted,
  },
  image: {
    width: '100%',
    height: 220,
  },
  card: {
    backgroundColor: COLORS.background.card,
    margin: 15,
    padding: 16,
    borderRadius: 12,
    shadowColor: COLORS.shadow.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  hotel: {
    fontSize: TYPOGRAPHY.sizes['4xl'],
    color: COLORS.text.dark,
    textAlign: 'right',
  },
  room: {
    fontSize: TYPOGRAPHY.sizes.lg,
    color: COLORS.text.gray,
    marginTop: 5,
    textAlign: 'right',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border.light,
    marginVertical: 15,
  },
  row: {
    flexDirection: 'row-reverse', // 
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    color: COLORS.text.medium,
    fontSize: TYPOGRAPHY.sizes.base,
    textAlign: 'right',
  },
  value: {
    color: COLORS.text.dark,
    fontSize: TYPOGRAPHY.sizes.base,
    textAlign: 'left',
  },
  price: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.sizes['2xl'],
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.sizes.xl,
    color: COLORS.text.dark,
    marginBottom: 12,
    textAlign: 'right',
  },
  extraInfoRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  infoLabel: {
    fontSize: TYPOGRAPHY.sizes.base,
    color: COLORS.text.medium,
    textAlign: 'right',
  },
  infoValue: {
    fontSize: TYPOGRAPHY.sizes.base,
    color: COLORS.text.dark,
    textAlign: 'right',
  },
  cancelButton: {
    backgroundColor: COLORS.danger,
    marginHorizontal: 15,
    marginTop: 10,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: COLORS.danger,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  cancelText: {
    color: COLORS.text.white,
    fontSize: TYPOGRAPHY.sizes.lg,
  },
});