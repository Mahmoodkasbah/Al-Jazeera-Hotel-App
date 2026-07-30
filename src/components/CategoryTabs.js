// src/components/CategoryTabs.js

import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';

// ✅ استيراد الثوابت والإيقونات
import { COLORS, TYPOGRAPHY, FONTS } from '../constants';

export default function CategoryTabs({
  categories,
  selectedCategory,
  onSelect,
}) {
  return (
    <FlatList
      horizontal
      data={categories}
      keyExtractor={(item) => item}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scroll}
      style={{ flexGrow: 0 }}
      inverted
      renderItem={({ item: category }) => {
        const isActive = selectedCategory === category;
        return (
          <TouchableOpacity
            style={[styles.item, isActive && styles.itemActive]}
            onPress={() => onSelect(category)}>
            <Text
              style={[
                styles.text,
                isActive && styles.textActive,
                { fontFamily: FONTS.regular },
              ]}>
              {category}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 4,
    gap: 6,
  },
  item: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: COLORS.background.input,
    marginRight: 6,
    borderWidth: 1,
    borderColor: COLORS.border.medium,
  },
  itemActive: {
    backgroundColor: COLORS.text.dark,
    borderColor: COLORS.text.dark,
  },
  text: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.text.dark,
    writingDirection: 'rtl',
  },
  textActive: {
    color: COLORS.text.white,
  },
});
