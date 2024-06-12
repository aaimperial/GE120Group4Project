// screens/Welcome.js
import React, { useState } from 'react';
import { View, Text, Button, Image, TextInput } from 'react-native';
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

      console.log(entries)

      // Save the updated entries
      await AsyncStorage.setItem('entries', JSON.stringify(entries));
      alert('Entry saved!');
      navigation.navigate('Welcome');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Add Entry</Text>
      <Image source={{ uri: preview }} style={{ width: 200, height: 200 }} />
      <Text>Coordinates: {currentLocation.coords.latitude}, {currentLocation.coords.longitude}</Text>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, width: '80%' }}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={{ height: 80, borderColor: 'gray', borderWidth: 1, marginBottom: 10, width: '80%' }}
        multiline
      />
      <Button title="Save" onPress={saveEntry} />
    </View>
  );
};

export default Entry;
