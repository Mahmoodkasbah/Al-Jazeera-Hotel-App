// screens/RoomsScreen.js
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';


import { COLORS, TYPOGRAPHY, FONTS } from '../../constants';
import CommonHeader from '../../components/CommonHeader';
import RoomCard from '../../components/RoomCard'; 
import CategoryTabs from '../../components/CategoryTabs'; 

export default function RoomsScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [selectedRoom, setSelectedRoom] = useState(null);

  const rooms = [
    {
      id: '1',
      title: 'غرفة مفردة هادئة',
      description: 'غرفة مريحة بإطلالة على الحديقة، مناسبة للمسافرين المنفردين',
      price: 95,
      currency: '$',
      category: 'غرف',
      capacity: 1,
      size: '20 م²',
      bedType: 'سرير مفرد',
      amenities: ['واي فاي', 'تكييف', 'تلفاز', 'مكتب'],
      image: require('../../../assets/images/singleroom.jpg'),
      available: true,
      rating: 4.5,
    },
    {
      id: '2',
      title: 'غرفة مطلة على البحر',
      description: 'إطلالة ساحرة على البحر، غرفة واسعة مع شرفة خاصة',
      price: 190,
      currency: '$',
      category: 'غرف',
      capacity: 2,
      size: '35 م²',
      bedType: 'سرير مزدوج',
      amenities: ['واي فاي', 'تكييف', 'تلفاز', 'شرفة'],
      image: require('../../../assets/images/seaview.jpg'),
      available: true,
      rating: 4.8,
    },
    {
      id: '3',
      title: 'جناح ملكي فاخر',
      description: 'جناح فاخر مع غرفة معيشة منفصلة وجاكوزي وإطلالة بانورامية',
      price: 350,
      currency: '$',
      category: 'أجنحة',
      capacity: 4,
      size: '70 م²',
      bedType: 'سرير ملكي',
      amenities: ['واي فاي', 'تكييف', 'تلفاز', 'جاكوزي'],
      image: require('../../../assets/images/royal-suite.jpg'),
      available: true,
      rating: 4.9,
    },
    {
      id: '4',
      title: 'غرفة ديلوكس',
      description: 'غرفة فاخرة مع ديكور عصري وإطلالة على المدينة',
      price: 150,
      currency: '$',
      category: 'غرف',
      capacity: 2,
      size: '30 م²',
      bedType: 'سرير مزدوج كبير',
      amenities: ['واي فاي', 'تكييف', 'تلفاز', 'حمام سبا'],
      image: require('../../../assets/images/family-suite.jpg'),
      available: true,
      rating: 4.7,
    },
  ];

  const categories = ['الكل', 'غرف', 'أجنحة'];

  const filteredRooms = rooms.filter((room) => {
    const matchCategory =
      selectedCategory === 'الكل' || room.category === selectedCategory;
    const matchSearch =
      searchQuery === '' ||
      room.title.includes(searchQuery) ||
      room.description.includes(searchQuery);
    return matchCategory && matchSearch;
  });

  const handleBookNow = (room) => {
    setSelectedRoom(null);
    navigation.navigate('BookingDetails', {
      booking: {
        id: room.id,
        hotel: 'فندق الجزيرة',
        room: room.title,
        price: `${room.price} ${room.currency}`,
        date: '24 يوليو - 28 يوليو',
        status: 'قادمة',
        image: room.image,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.background.card}
      />

      <CommonHeader title="حجز جديد" onBack={() => navigation.goBack()} />

 
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <TextInput
            style={[styles.searchInput, { fontFamily: FONTS.regular }]}
            placeholder="ابحث عن غرفة..."
            placeholderTextColor={COLORS.text.muted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>


      <View style={styles.tabsWrapper}>
        <CategoryTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </View>

      <Text style={[styles.resultCount, { fontFamily: FONTS.regular }]}>
        {filteredRooms.length} غرفة متاحة
      </Text>

      {/* قائمة الغرف */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {filteredRooms.length > 0 ? (
          filteredRooms.map((room) => (
            //استخدام مكون RoomCard الجاهز بدلاً من الكود الطويل
            <RoomCard
              key={room.id}
              room={room}
              onPress={() => setSelectedRoom(room)}
            />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyTitle, { fontFamily: FONTS.bold }]}>
              لا توجد غرف
            </Text>
            <Text style={[styles.emptySubtitle, { fontFamily: FONTS.regular }]}>
              جرب تغيير معايير البحث
            </Text>
          </View>
        )}
      </ScrollView>

   
      {selectedRoom && (
        <Modal
          visible={true}
          transparent
          animationType="slide"
          onRequestClose={() => setSelectedRoom(null)}>
          <View style={styles.modalOverlay}>
            <View style={styles.detailSheet}>
              <View style={styles.modalHandle} />
              <Image source={selectedRoom.image} style={styles.detailImage} />
              <ScrollView contentContainerStyle={styles.detailContent}>
                <View style={styles.modalHeader}>
                  <Text
                    style={[styles.detailTitle, { fontFamily: FONTS.bold }]}>
                    {selectedRoom.title}
                  </Text>
                  <TouchableOpacity onPress={() => setSelectedRoom(null)}>
                    <Text
                      style={[styles.closeText, { fontFamily: FONTS.regular }]}>
                      إغلاق
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text style={[styles.modalPrice, { fontFamily: FONTS.bold }]}>
                  {selectedRoom.price} {selectedRoom.currency}{' '}
                  <Text
                    style={[
                      styles.detailPerNight,
                      { fontFamily: FONTS.regular },
                    ]}>
                    / ليلة
                  </Text>
                </Text>
                <Text
                  style={[
                    styles.detailDescription,
                    { fontFamily: FONTS.regular },
                  ]}>
                  {selectedRoom.description}
                </Text>
                <Text style={[styles.filterLabel, { fontFamily: FONTS.bold }]}>
                  المرافق المتوفرة:
                </Text>
                <View style={styles.amenitiesGrid}>
                  {selectedRoom.amenities.map((amenity) => (
                    <Text
                      key={amenity}
                      style={[
                        styles.amenityText,
                        { fontFamily: FONTS.regular },
                      ]}>
                      • {amenity}
                    </Text>
                  ))}
                </View>
                <TouchableOpacity
                  style={[
                    styles.bookNowButton,
                    !selectedRoom.available && styles.bookDisabled,
                  ]}
                  onPress={() => handleBookNow(selectedRoom)}
                  disabled={!selectedRoom.available}>
                  <Text
                    style={[styles.bookNowText, { fontFamily: FONTS.bold }]}>
                    {selectedRoom.available ? 'احجز الآن' : 'غير متاحة'}
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background.card },
  searchSection: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.gray,
  },
  searchBar: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: COLORS.background.input,
    borderRadius: 6,
    paddingHorizontal: 10,
    height: 38,
    borderWidth: 1,
    borderColor: COLORS.border.medium,
  },
  searchInput: {
    flex: 1,
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.text.dark,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  tabsWrapper: {
    paddingTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.gray,
  },
  resultCount: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text.muted,
    paddingHorizontal: 16,
    paddingTop: 8,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 20, paddingTop: 6 },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: TYPOGRAPHY.sizes.lg,
    color: COLORS.text.dark,
    marginTop: 8,
    writingDirection: 'rtl',
  },
  emptySubtitle: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text.muted,
    marginTop: 4,
    writingDirection: 'rtl',
  },


  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: 'flex-end',
  },
  detailSheet: {
    backgroundColor: COLORS.background.card,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    maxHeight: '80%',
    borderWidth: 1,
    borderColor: COLORS.border.medium,
  },
  modalHandle: {
    width: 36,
    height: 4,
    backgroundColor: COLORS.border.medium,
    borderRadius: 2,
    alignSelf: 'center',
    marginVertical: 8,
  },
  modalHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  detailTitle: {
    fontSize: TYPOGRAPHY.sizes.xl,
    color: COLORS.text.dark,
    flex: 1,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  closeText: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.text.muted,
    writingDirection: 'rtl',
  },
  modalPrice: {
    fontSize: TYPOGRAPHY.sizes.xl,
    color: COLORS.primary,
    marginBottom: 8,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  detailPerNight: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.text.muted },
  detailDescription: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.text.gray,
    lineHeight: 22,
    marginVertical: 8,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  filterLabel: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.text.dark,
    marginBottom: 8,
    marginTop: 10,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  detailImage: { width: '100%', height: 180 },
  detailContent: { padding: 16 },
  amenitiesGrid: { gap: 4, marginBottom: 20 },
  amenityText: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.text.dark,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  bookNowButton: {
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  bookDisabled: { opacity: 0.5 },
  bookNowText: {
    color: COLORS.text.white,
    fontSize: TYPOGRAPHY.sizes.lg,
    writingDirection: 'rtl',
  },
});
