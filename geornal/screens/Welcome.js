// screens/Welcome.js
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Button, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const Welcome = ({ navigation }) => {
  const [currentLocation, setCurrentLocation] = useState({
    coords: {
      latitude: 14.656363,
      longitude: 121.069664,
    },
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location);
    })();
  }, []);

  const handleOpenCameraButtonPress = () => {
    setShowCamera(!showCamera);
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude }}
          pinColor="red"
          title="Current Location"
        />
      </MapView>

      <TouchableOpacity
        style={{ padding: 10, backgroundColor: '#007AFF', alignItems: 'center',
                marginTop: 10, height: '10%', justifyContent: 'center'  }}
        onPress={()=>navigation.navigate("Camera")}
      >
        <Text style={{ color: 'white', fontSize: 20 }}>Open Camera</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;