import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Platform, ImageBackground } from 'react-native';
import * as FileSystem from 'expo-file-system';

export default function CameraScreen({navigation}) {
  const [permission, requestPermission] = useCameraPermissions();
  const [preview, setPreview] = useState(null);
  const cameraRef = useRef(null); // Create a ref for the CameraView

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const takePhoto = async () => {
    if (cameraRef.current) {
      const data = await cameraRef.current.takePictureAsync(null);
      setPreview(data.uri);
    }
  };

  const retakePhoto = async () => {
    setPreview();
  };

  return (
    <View style={styles.container}>
    {preview ?
        <View>
            <ImageBackground source={{ uri: preview }} style={{ width: "100%", height: "100%", justifyContent: "flex-end" }}>
                <View style={{ flexDirection: 'row', justifyContent: "space-around", width: "100%", height: '10%' }}>
                    {/* Retake button */}
                    <TouchableOpacity style={{ width: "45%" }} onPress={retakePhoto}>
                        <Text style={styles.text}>Retake</Text>
                    </TouchableOpacity>
                    {/* Navigate to Entry button */}
                    <TouchableOpacity style={{ width: "45%" }} onPress={() => navigation.navigate("Entry")}>
                        <Text style={styles.text}>Okay</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    :
      <CameraView style={styles.camera} facing='back' ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Text style={styles.text}>Take Photo</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: "center"
  },
});