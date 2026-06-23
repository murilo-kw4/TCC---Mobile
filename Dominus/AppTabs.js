import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

import HomeScreen from './src/screens/HomeScreen';

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          backgroundColor: '#7A0D18',
          height: 65,
          paddingBottom: 5,
        },

        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#E0CFCF',

        tabBarLabelStyle: {
          fontSize: 11,
        },
      }}
    >
      <Tab.Screen
        name="Início"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}