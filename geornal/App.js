import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import Welcome from './screens/Welcome';
import CameraScreen from './screens/Camera';
import Entry from './screens/Entry';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Entry" component={Entry} />
      </Stack.Navigator>

      <View style = {styles.container}>
        <View style = {styles.box}>
          <Text style = {styles.heading}> Camera </Text>
          <TouchableOpacity style = {styles.button}>
            <Text style = {styles.buttonText}> Capture</Text>
          </TouchableOpacity>
        </View>

        <View style = {styles.box}>
          <Text style = {styles.heading}> Text Input</Text>
          <TextInput
            style = {styles.textInput}
            placeholder = "Insert description here..."
            multiline = {true}
            numberOfLines= {6}
          />
        </View>
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#ffffff'
  },
  box: {
    backgroundColor: '#990000',
    width: '100%',
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  heading: {
    fontWeight: 'light',
    fontSize: '20',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#009933'
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#ffffff'
  },
  textInput: {
    height: '40%',
    width: '60%',
    color: '#e6e6e6'
  },
});

export default App;
