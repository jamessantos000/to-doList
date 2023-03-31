import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import Home from './components/home'
import ScreenCalendar from "./components/calendar";
import FinishTasks from "./components/finishTasks";
import Profile from "./components/profile";
import LoginPage from "./components/login";
import RegisterPage from "./components/cadastro";
import LoadingScreen from "./components/loading";

import TaskProvider from "./functions/context";

export default function Routes(){
  return(
    <NavigationContainer>
      <TaskProvider>
      <Stack.Navigator initialRouteName="LoadingScreen" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Calendar" component={ScreenCalendar} />
        <Stack.Screen name="FinishTasks" component={FinishTasks} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Cadastro" component={RegisterPage} />
        <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
      </Stack.Navigator>

      </TaskProvider>
    </NavigationContainer>
  );
}