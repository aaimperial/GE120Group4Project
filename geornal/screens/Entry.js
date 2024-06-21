
// screens/Welcome.js
import React, { useState } from 'react';
import { View, Text, Button, Image, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Entry = ({ navigation, route }) => {
  const { preview, currentLocation } = route.params;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const saveEntry = async () => {
    try {
      // Fetch existing entries
      const existingEntries = await AsyncStorage.getItem('entries');
      let entries = [];

      // Parse the existing entries into an array
      if (existingEntries!== null) {
        entries = JSON.parse(existingEntries);
      }

      // Prepare the new entry
      const newEntry = {
        title,
        description,
        preview,
        currentLocation 
      };

      // Append the new entry to the existing ones
      entries.push(newEntry);

      // Save the updated entries
      await AsyncStorage.setItem('entries', JSON.stringify(entries));
      alert('Entry saved!');
      navigation.navigate('Welcome');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={ styles.box }>
      <Text style = {styles.titleText}> GEOrnal Entry </Text>
      <Image source={{ uri: preview }} style={{ width: 300, height: 300 }} />
      <Text style = {styles.coords}>Coordinates: {currentLocation.coords.latitude}, {currentLocation.coords.longitude}</Text>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.heading}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.caption}
        multiline
      />
      <Button 
        title="Save"
        onPress={saveEntry} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 30,
    fontWeight: '600',
    color: '#ffff80'
  },
  box: {
    flex: 1,
    backgroundColor: '#2d8659',
    alignItems: 'center',
    justifyContent: 'center'
  },
  coords: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffff80'
  },
  heading: {
    color: '#2d8659', 
    height: 40, 
    backgroundColor: '#ffffcc',
    marginBottom: 10, 
    width: '83%' 
  },
  caption: {
    color: '#2d8659', 
    height: 90, 
    backgroundColor: '#ffffcc',
    marginBottom: 10, 
    width: '83%'
  }
})

export default Entry;