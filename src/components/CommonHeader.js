// src/components/CommonHeader.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY, FONTS, ICONS } from '../constants';

export default function CommonHeader({ title, onBack }) {
  return (
    <View style={styles.header}>
        {/*   زر الرجوع */}
      <View style={styles.iconContainer}>
        {onBack && (
          <TouchableOpacity onPress={onBack} activeOpacity={0.7}>
          {/*استدعاء أيقونة الرجوع */}
            {ICONS.back ? ICONS.back(24, COLORS.text.dark) : null}
          </TouchableOpacity>
        )}
      </View>
        {/*   العنوان */}
      <Text style={[styles.headerTitle, { fontFamily: FONTS.bold }]}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: COLORS.background.card,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.gray,
  },
  iconContainer: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: TYPOGRAPHY.sizes['3xl'],
    color: COLORS.text.dark,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
});