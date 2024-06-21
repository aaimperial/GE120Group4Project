import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native';

export default function CameraScreen({ navigation, route }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [preview, setPreview] = useState(null);
  const cameraRef = useRef(null);

  const { currentLocation } = route.params;

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  const takePhoto = async () => {
    if (cameraRef.current) {
      const data = await cameraRef.current.takePictureAsync(null);
      setPreview(data.uri);
    }
  };

  const retakePhoto = () => {
    setPreview(null);
  };

  return (
    <View style={styles.container}>
      {preview ? (
        <View>
          <ImageBackground source={{ uri: preview }} style={styles.preview}>
            <View style={styles.buttonRow}>
              {/* Retake button */}
              <TouchableOpacity style={[styles.roundedButton, styles.retakeButton]} onPress={retakePhoto}>
                <Text style={styles.text}>Retake</Text>
              </TouchableOpacity>
              {/* Navigate to Entry button */}
              <TouchableOpacity style={[styles.roundedButton, styles.okayButton]} onPress={() => navigation.navigate("Entry", { preview, currentLocation })}>
                <Text style={styles.text}>Proceed</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      ) : (
        <CameraView style={styles.camera} facing='back' ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.circleButton} onPress={takePhoto}>
              <ImageBackground source={{ uri: 'https://static.vecteezy.com/system/resources/previews/018/803/560/original/cartoon-earth-icon-png.png' }} style={styles.circleButtonImage} resizeMode="cover">
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  preview: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: "space-around",
    width: "100%",
    height: '10%',
  },
  roundedButton: {
    width: "40%",
    backgroundColor: '#52685b',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  retakeButton: {
    height: '70%',
  },
  okayButton: {
    height: '70%',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 60,
  },
  circleButton: {
    width: 140,
    height: 140,
    borderRadius: 70,
    overflow: 'hidden', // Ensures the image is contained within the circle
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleButtonImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e0e497',
    textAlign: "center",
  },
});
