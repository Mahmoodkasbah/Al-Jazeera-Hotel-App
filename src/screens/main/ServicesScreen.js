// src/screens/main/ServicesScreen.js
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
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
import ServiceCard from '../../components/ServiceCard';
import CategoryTabs from '../../components/CategoryTabs';

export default function ServicesScreen() {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const services = [
    {
      id: '1',
      title: 'طلب طعام للغرفة',
      description: 'وجبات ساخنة من مطعم الفندق',
      category: 'طعام',
      available: true,
    },
    {
      id: '2',
      title: 'مناشف إضافية',
      description: 'توصيل مناشف نظيفة للغرفة',
      category: 'الغرفة',
      available: true,
    },
    {
      id: '3',
      title: 'خدمة الغرف',
      description: 'تنظيف وترتيب الغرفة',
      category: 'الغرفة',
      available: true,
    },
    {
      id: '4',
      title: 'وسائد إضافية',
      description: 'وسائد ناعمة مريحة',
      category: 'الغرفة',
      available: true,
    },
    {
      id: '5',
      title: 'تصليح تكييف',
      description: 'فحص وإصلاح مشاكل المكيف',
      category: 'صيانة',
      available: true,
    },
    {
      id: '6',
      title: 'تصليح سباكة',
      description: 'إصلاح مشاكل الحمام والمغاسل',
      category: 'صيانة',
      available: true,
    },
    {
      id: '7',
      title: 'كهرباء',
      description: 'فحص وإصلاح الأعطال الكهربائية',
      category: 'صيانة',
      available: true,
    },
    {
      id: '8',
      title: 'سيارة أجرة',
      description: 'طلب سيارة للتنقل',
      category: 'مواصلات',
      available: true,
    },
    {
      id: '9',
      title: 'توصيل أمتعة',
      description: 'مساعدة في نقل الأمتعة',
      category: 'مواصلات',
      available: true,
    },
    {
      id: '10',
      title: 'استقبال طرود',
      description: 'استلام الطرود والهدايا نيابة عنك',
      category: 'إضافية',
      available: true,
    },
    {
      id: '11',
      title: 'مكتب استقبال',
      description: 'الاتصال بمكتب الاستقبال',
      category: 'إضافية',
      available: true,
    },
    {
      id: '12',
      title: 'خدمات العناية',
      description: 'طلب خدمات السبا والمساج',
      category: 'إضافية',
      available: true,
    },
  ];

  const categories = ['الكل', 'الغرفة', 'طعام', 'صيانة', 'مواصلات', 'إضافية'];

  const filteredServices = services.filter((service) => {
    const matchCategory =
      selectedCategory === 'الكل' || service.category === selectedCategory;
    return matchCategory;
  });

  const handleRequestService = () => {
    if (!selectedService) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowModal(false);
      setSelectedService(null);
      setNotes('');
    }, 1500);
  };

  const openServiceModal = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.background.card}
      />

      <CommonHeader title="طلب خدمات" onBack={() => navigation.goBack()} />

      <View style={styles.tabsContainer}>
        <CategoryTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </View>

      <Text style={[styles.resultCount, { fontFamily: FONTS.regular }]}>
        {filteredServices.length} خدمة متاحة
      </Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onPress={() => openServiceModal(service)}
            />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyTitle, { fontFamily: FONTS.bold }]}>
              لا توجد خدمات
            </Text>
            <Text style={[styles.emptySubtitle, { fontFamily: FONTS.regular }]}>
              لا توجد خدمات في هذه الفئة حالياً
            </Text>
          </View>
        )}
        <View style={styles.bottomSpace} />
      </ScrollView>

      <Modal
        visible={showModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHandle} />
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { fontFamily: FONTS.bold }]}>
                تأكيد الطلب
              </Text>
              <TouchableOpacity
                onPress={() => setShowModal(false)}
                activeOpacity={0.7}>
                <Text style={[styles.closeText, { fontFamily: FONTS.regular }]}>
                  إغلاق
                </Text>
              </TouchableOpacity>
            </View>
            {selectedService && (
              <>
                <View style={styles.modalServiceInfo}>
                  <Text
                    style={[
                      styles.modalServiceTitle,
                      { fontFamily: FONTS.bold },
                    ]}>
                    {selectedService.title}
                  </Text>
                  <Text
                    style={[
                      styles.modalServiceDesc,
                      { fontFamily: FONTS.regular },
                    ]}>
                    {selectedService.description}
                  </Text>
                </View>
                <View style={styles.notesContainer}>
                  <Text style={[styles.notesLabel, { fontFamily: FONTS.bold }]}>
                    ملاحظات إضافية (اختياري)
                  </Text>
                  <TextInput
                    style={[styles.notesInput, { fontFamily: FONTS.regular }]}
                    placeholder="اكتب ملاحظاتك هنا..."
                    placeholderTextColor={COLORS.text.muted}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    value={notes}
                    onChangeText={setNotes}
                  />
                </View>
                <TouchableOpacity
                  style={[
                    styles.requestButton,
                    loading && styles.requestDisabled,
                  ]}
                  onPress={handleRequestService}
                  disabled={loading}
                  activeOpacity={0.8}>
                  <Text
                    style={[
                      styles.requestButtonText,
                      { fontFamily: FONTS.bold },
                    ]}>
                    {loading ? 'جاري الإرسال...' : 'إرسال الطلب'}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.main,
  },
  tabsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.light,
  },
  resultCount: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text.muted,
    paddingHorizontal: 16,
    paddingTop: 8,
    textAlign: 'right',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 6,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: TYPOGRAPHY.sizes.lg,
    color: COLORS.text.dark,
    marginTop: 8,
    textAlign: 'right',
  },
  emptySubtitle: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text.muted,
    marginTop: 4,
    textAlign: 'right',
  },
  bottomSpace: {
    height: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.background.card,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    maxHeight: '80%',
  },
  modalHandle: {
    width: 40,
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
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: TYPOGRAPHY.sizes.xl,
    color: COLORS.text.dark,
    flex: 1,
    textAlign: 'right',
  },
  closeText: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.text.muted,
  },
  modalServiceInfo: {
    backgroundColor: COLORS.background.input,
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },
  modalServiceTitle: {
    fontSize: TYPOGRAPHY.sizes.lg,
    color: COLORS.text.dark,
    marginBottom: 6,
    textAlign: 'right',
  },
  modalServiceDesc: {
    fontSize: TYPOGRAPHY.sizes.base,
    color: COLORS.text.medium,
    textAlign: 'right',
    lineHeight: 20,
  },
  notesContainer: {
    marginBottom: 20,
  },
  notesLabel: {
    fontSize: TYPOGRAPHY.sizes.base,
    color: COLORS.text.dark,
    marginBottom: 8,
    textAlign: 'right',
  },
  notesInput: {
    backgroundColor: COLORS.background.input,
    borderRadius: 10,
    padding: 12,
    height: 90,
    fontSize: TYPOGRAPHY.sizes.base,
    color: COLORS.text.dark,
    textAlignVertical: 'top',
    textAlign: 'right',
    borderWidth: 1,
    borderColor: COLORS.border.light,
    outlineStyle: 'none',
    outlineWidth: 0,
  },
  requestButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  requestDisabled: {
    opacity: 0.6,
  },
  requestButtonText: {
    color: COLORS.text.white,
    fontSize: TYPOGRAPHY.sizes.lg,
  },
});
