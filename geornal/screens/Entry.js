import React, { useState } from 'react';
import { View, Text, Button, Image, TextInput, StyleSheet, Alert } from 'react-native';
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
      if (existingEntries !== null) {
        entries = JSON.parse(existingEntries);
      }

      // Prepare the new entry
      const newEntry = {
        title,
        description,
        preview,
        currentLocation,
      };

      // Append the new entry to the existing ones
      entries.push(newEntry);

      // Save the updated entries
      await AsyncStorage.setItem('entries', JSON.stringify(entries));
      Alert.alert('Entry saved!');
      navigation.navigate('Welcome');
    } catch (error) {
      console.error('Error saving entry:', error);
      Alert.alert('Error', 'Failed to save entry. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>GEOrnal Entry</Text>
      <Image source={{ uri: preview }} style={styles.image} />
      <Text style={styles.coords}>
        Coordinates: {currentLocation.coords.latitude}, {currentLocation.coords.longitude}
      </Text>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={[styles.input, { height: 100 }]}
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
  container: {
    flex: 1,
    backgroundColor: '#99ffd6',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titleText: {
    fontSize: 30,
    fontWeight: '600',
    color: '#0099ff',
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  coords: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007acc',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    borderColor: '#33ccff',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '100%',
    height: 40,
  },
});

export default Entry;
