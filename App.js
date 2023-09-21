import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, LogBox, I18nManager, Platform, Linking } from 'react-native';
import React, { useEffect, useState, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import NotificationList from "./app/screens/NotificationList";
import moment from "moment";
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import AsyncStorage from "@react-native-async-storage/async-storage";
import NotificationDetails from "./app/screens/NotificationDetails";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);
console.disableYellowBox = true;

const Stack = createStackNavigator()

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
      }}
    >
      <Stack.Screen
        name="NotificationList"
        component={NotificationList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NotificationDetails"
        component={NotificationDetails}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function MainScreen() {
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {

    registerForPushNotificationsAsync()

    storeNotification = async (notification) => {
      // AsyncStorage.clear()
      const listString = await AsyncStorage.getItem("NotificationList")
      if (listString != null) {
        const list = JSON.parse(listString)
        list.push(notification)
        AsyncStorage.setItem("NotificationList", JSON.stringify(list))
        console.log("adding to existing");
      } else {
        const list = []
        list.push(notification)
        AsyncStorage.setItem("NotificationList", JSON.stringify(list))
        console.log("adding new");
      }
    }

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
      notification.request.content.date = notification.date
      storeNotification(notification.request.content)
      console.log(notification.request.content);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      response.notification.request.content.date = response.notification.date
      const content = response.notification.request.content
      storeNotification(content)
      console.log(content);
      navigate("NotificationDetails", { item: content })
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      const projectId = Constants.expoConfig.extra.eas.projectId;
      token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
      console.log(`this the token for ${Constants.deviceName} ::: ${token}`);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        sound: true,
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    try {
      await AsyncStorage.setItem('user_token', token)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <NavigationContainer
      ref={navigationRef}
    >
      <AppStack />
    </NavigationContainer>
  );
}

export default MainScreen;
