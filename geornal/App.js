import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ImageBackground } from 'react-native';

import Welcome from './screens/Welcome';
import CameraScreen from './screens/Camera';
import Entry from './screens/Entry';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerStyle: {
            backgroundColor: 'transparent',
            height: 80,
          },
          headerBackground: () => (
            <ImageBackground
              style={{
                flex: 1,
                width: '100%',
                height: '100%',
              }}
              source={{
                uri: 'https://i.pinimg.com/474x/ec/56/8e/ec568e6f792605902a00b5b75c2b29a1.jpg',
              }}
            />
          ),
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: 'bold',
            color: 'white',
            fontFamily: 'Arial',
          },
          headerTitleAlign: 'center',
          headerTintColor: 'white',
        }}
      >
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ title: 'GEOrnal' }}
        />
        <Stack.Screen
          name="Camera"
          component={CameraScreen}
          options={{ title: 'Camera' }}
        />
        <Stack.Screen
          name="Entry"
          component={Entry}
          options={{ title: 'GEOrnal Entry' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
