import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, ActivityIndicator, View, I18nManager } from 'react-native';

import StackNavigator from './src/navigation/StackNavigator';
import { AuthProvider, useAuth } from './src/constants/AuthContext';
import { COLORS } from './src/constants';

I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

function RootNavigator() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return <StackNavigator />;
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.background.main} />
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}