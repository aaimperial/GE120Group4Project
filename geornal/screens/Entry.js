// screens/Welcome.js
import React from 'react';
import { View, Text, Button } from 'react-native';

const Entry = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Entry Screen</Text>
      <Button
        title="Go to Main"
        onPress={() => navigation.navigate('Welcome')}
      />
    </View>
  );
};

export default Entry;
