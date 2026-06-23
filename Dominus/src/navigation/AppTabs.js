import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";

import CalendarioScreen from "../screens/CalendarioScreen";

import AgendamentoScreen from "../screens/AgendamentoScreen";

import AvisosScreen from '../screens/AvisosScreen';

import PerfilScreen from '../screens/PerfilScreen';

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          backgroundColor: "#7A0D18",
          height: 65,
          paddingBottom: 5,
        },

        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#E0CFCF",

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

      <Tab.Screen
        name="Calendário"
        component={CalendarioScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Agend."
        component={AgendamentoScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="church" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
  name="Avisos"
  component={AvisosScreen}
  options={{
    tabBarIcon: ({ color, size }) => (
      <Ionicons
        name="notifications"
        size={size}
        color={color}
      />
    ),
  }}
/>
<Tab.Screen
  name="Perfil"
  component={PerfilScreen}
  options={{
    tabBarIcon: ({ color, size }) => (
      <Ionicons
        name="person"
        size={size}
        color={color}
      />
    ),
  }}
/>
    </Tab.Navigator>
  );
}
