import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Camera } from "expo-camera";

export default function App() {
  const [cameraAccess, setCameraAccess] = useState(false);
  const [text, setText] = useState(null);
  const [notes, setNotes] = useState([]);
  const [showCamera, setShowCamera] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [camera, setCamera] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setCameraAccess(status === "true");
    })();
  }, [notes]);

  const takePicture = async () => {
    const tempPhoto = await camera.takePictureAsync(null);
    setPhoto(tempPhoto.uri);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Simple Notes App</Text>
      <StatusBar style="auto" />
      <TextInput
        style={styles.note}
        multiline={true}
        onChangeText={setText}
        value={text}
      />
      <Button
        title="Save"
        onPress={() => {
          setText(null);

          if (text != null && text.length > 0) {
            setNotes([...notes, { text: text, img: photo }]);
            setPhoto(null);
            console.log(notes);
          } else {
            Alert.alert("Cannot Save", "Please add a description or an image");
          }
        }}
      />
      <Button title="Show Camera" onPress={() => setShowCamera(!showCamera)} />

      {showCamera ? (
        <Camera
          type={true}
          style={styles.camera}
          ref={(r) => {
            setCamera(r);
          }}
        >
          <View style={styles.cameraView}>
            <Text> Flip This </Text>
            <Button title="Take Picture" onPress={() => takePicture()} />
          </View>
        </Camera>
      ) : (
        <View></View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 30,
  },
  note: {
    backgroundColor: "#fff",
    width: "90%",
    height: "40%",
  },
  camera: {
    height: "40%",
    width: "90%",
  },
});
