// src/constants/icons.js
//هذا الملف مسؤول عن جميع الأيقونات في التطبيق
import React from "react";
//كل مكتبة لديها أيقونات مختلفة
import { Feather, Ionicons, FontAwesome5, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "./colors";

export const ICONS = {
  // السهم رجوع
  back: (size = 24, color = COLORS.text.dark) => (
    <Ionicons name="arrow-forward" size={size} color={color} />
  ),

  // أيقونات عامة
  home: (size = 24, color = COLORS.text.dark) => (
    <Ionicons name="home" size={size} color={color} />
  ),
  
  user: (size = 24, color = COLORS.text.dark) => (
    <Feather name="user" size={size} color={color} />
  ),
  
  search: (size = 24, color = COLORS.text.dark) => (
    <Feather name="search" size={size} color={color} />
  ),
  
  calendar: (size = 24, color = COLORS.text.dark) => (
    <Feather name="calendar" size={size} color={color} />
  ),
  
  notifications: (size = 24, color = COLORS.text.dark) => (
    <Ionicons name="notifications-outline" size={size} color={color} />
  ),
  
  email: (size = 24, color = COLORS.text.gray) => (
    <Ionicons name="mail-outline" size={size} color={color} />
  ),
  
  lock: (size = 24, color = COLORS.text.gray) => (
    <Feather name="lock" size={size} color={color} />
  ),
  
  eye: (size = 24, color = COLORS.text.gray, show = false) => (
    <Feather name={show ? "eye-off" : "eye"} size={size} color={color} />
  ),
  
  phone: (size = 24, color = COLORS.text.gray) => (
    <Ionicons name="call-outline" size={size} color={color} />
  ),
  
  person: (size = 24, color = COLORS.text.gray) => (
    <Ionicons name="person-outline" size={size} color={color} />
  ),
  
  logout: (size = 24, color = COLORS.danger) => (
    <Ionicons name="log-out-outline" size={size} color={color} />
  ),
  
  help: (size = 24, color = COLORS.text.medium) => (
    <Ionicons name="help-circle-outline" size={size} color={color} />
  ),
  
  language: (size = 24, color = COLORS.text.medium) => (
    <Ionicons name="language-outline" size={size} color={color} />
  ),
  
  settings: (size = 24, color = COLORS.text.medium) => (
    <Ionicons name="settings-outline" size={size} color={color} />
  ),
  
  chevronLeft: (size = 24, color = COLORS.text.muted) => (
    <Ionicons name="chevron-back" size={size} color={color} />
  ),
  
  // أيقونات خاصة
  bed: (size = 24, color = COLORS.primary) => (
    <FontAwesome5 name="bed" size={size} color={color} />
  ),
  
  roomService: (size = 24, color = COLORS.primary) => (
    <MaterialIcons name="room-service" size={size} color={color} />
  ),
  
  pool: (size = 24, color = COLORS.primary) => (
    <MaterialIcons name="pool" size={size} color={color} />
  ),
  
  restaurant: (size = 24, color = COLORS.primary) => (
    <MaterialIcons name="restaurant" size={size} color={color} />
  ),
  
  fitness: (size = 24, color = COLORS.primary) => (
    <MaterialIcons name="fitness-center" size={size} color={color} />
  ),
  
  wifi: (size = 24, color = COLORS.primary) => (
    <MaterialIcons name="wifi" size={size} color={color} />
  ),
  
  library: (size = 24, color = COLORS.primary) => (
    <MaterialIcons name="local-library" size={size} color={color} />
  ),
  
  park: (size = 24, color = COLORS.primary) => (
    <MaterialIcons name="park" size={size} color={color} />
  ),
  
  location: (size = 24, color = COLORS.primary) => (
    <MaterialIcons name="location-on" size={size} color={color} />
  ),
};