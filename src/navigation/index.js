import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen';
import RecipDetailScreen from '../screens/RecipeDetailScreen'
const Stack = createNativeStackNavigator();

function index() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='WelcomeScreen' screenOptions={{ headerShown: false}} >
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="RecipDetailScreen" component={RecipDetailScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default index;