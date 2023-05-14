import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Screens/LoginScreen/LoginScreen";
import Registration from "./Screens/RegistrationScreen/RegistrationScreen";
import Posts from "./Screens/PostsScreen/PostsScreen";
import { StyleSheet } from "react-native-web";

const MainStack = createStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Логін">
        <MainStack.Screen name="Реєстрація" component={Registration} />
        <MainStack.Screen name="Логін" component={Login} />
        <MainStack.Screen name="Пости" component={Posts} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});
