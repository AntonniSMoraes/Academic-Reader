import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Search, Home, User } from 'lucide-react-native';

import HomeScreen from '../screens/HomeScreen';
import HistoryScreen from '../screens/HistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { colors } from '../constants/colors';

const Tab = createBottomTabNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: colors.background,
            height: 60,
            paddingBottom: 0
          },
          tabBarItemStyle: {
            borderRadius: 16,
          },
          tabBarIconStyle: {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          },
          tabBarActiveBackgroundColor: colors.overlay,
          tabBarInactiveBackgroundColor: 'transparent',
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: '#fff',
          tabBarIcon: ({ color, size }) => {
            if (route.name === 'Home') return <Home color={color} size={size} />;
            if (route.name === 'Search') return <Search color={color} size={size} />;
            if (route.name === 'Ajustes') return <User color={color} size={size} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={HistoryScreen} />
        <Tab.Screen name="Ajustes" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}