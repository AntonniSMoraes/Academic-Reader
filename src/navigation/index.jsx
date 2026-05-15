import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Search, Home, User } from 'lucide-react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import ImmersiveMode from 'react-native-immersive-mode';
import * as NavigationBar from 'expo-navigation-bar';

import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { colors } from '../constants/colors';
import { StatusBar } from 'expo-status-bar';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  // useEffect(() => {
  //   ImmersiveMode.fullLayout(true);
  //   ImmersiveMode.setBarMode('Full');
  // }, []);
  useEffect(() => {
  // Esconde a barra de navegação de baixo (Android)
  NavigationBar.setVisibilityAsync('hidden');
  NavigationBar.setBehaviorAsync('inset-touch');
}, []);

  return (
    <NavigationContainer>
      <StatusBar hidden={true} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={AppTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function AppTabs() {
  return (
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
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Ajustes" component={ProfileScreen} />
    </Tab.Navigator>
  );
}