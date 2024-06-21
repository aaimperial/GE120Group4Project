import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Welcome = ({ navigation }) => {
  const initialLatitude = 14.656363;
  const initialLongitude = 121.069664;

  const [currentLocation, setCurrentLocation] = useState({
    coords: {
      latitude: initialLatitude,
      longitude: initialLongitude,
    },
  });
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const fetchLocationAndMarkers = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setCurrentLocation(location);

        const jsonValue = await AsyncStorage.getItem('entries');
        if (jsonValue !== null) {
          setMarkers(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.error('Error fetching location and markers:', e);
      }
    };

    fetchLocationAndMarkers();
  }, []);

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
          coordinate={{
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
          }}
          pinColor="#52685b"
          title="Current Location"
        />
        {markers.length > 0 &&
          markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.coords.latitude,
                longitude: marker.coords.longitude,
              }}
              title={marker.title}
            />
          ))}
      </MapView>

      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          borderRadius: 100,
          backgroundColor: '#e0e497',
          height: 75,
          width: 75,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('Camera', { currentLocation })}
      >
        <Text
          style={{
            color: '#52685b',
            fontFamily: 'Impact',
            fontSize: 15,
            textAlign: 'center',
          }}
        >
          Open Camera
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;
