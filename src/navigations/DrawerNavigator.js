import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/homeScreen/HomeScreen';
import Chat from '../screens/chat/Chat';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Notification from '../screens/notification/Notification';
import Email from '../screens/email/Email';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={{
      headerShown: true, drawerActiveTintColor: '#6200EE',
      drawerLabelStyle: { marginLeft: 5 }
    }}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Chat"
        component={Chat}
        options={{
          drawerLabel: 'Chat',
          drawerIcon: ({ color, size }) => (
            <Icon name="chat" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen name="Notification" component={Notification}
        options={{
          drawerLabel: 'Notifications',
          drawerIcon: ({ color, size }) => (
            <Icon name="notifications" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen name="Email" component={Email} 
       options={{
          drawerLabel: 'Email',
          drawerIcon: ({ color, size }) => (
            <Icon name="email" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen name="Contacts" component={HomeScreen} 
       options={{
          drawerLabel: 'Contacts',
          drawerIcon: ({ color, size }) => (
            <Icon name="contacts" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen name="Calendar" component={HomeScreen} 
       options={{
          drawerLabel: 'important',

          drawerIcon: ({ color, size }) => (
            <Icon name="important-devices" color={color} size={size} />
          ),
        }}
      />


    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
