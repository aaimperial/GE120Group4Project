// screens/Welcome.js
import React from 'react';
import { View, Text, Button } from 'react-native';

const Welcome = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome Screen</Text>
      <Button
        title="Go to Main"
        onPress={() => navigation.navigate('Entry')}
      />
    </View>
  );
};

export default Welcome;
