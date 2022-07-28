import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import React, { useEffect, useState } from "react";

export default function App() {
  const [text, setText] = useState(null);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    console.log(notes);
  }, [notes]);

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
            setNotes([...notes, { text: text }]);
          } else {
            Alert.alert("Cannot Save", "Please add a description or an image");
          }
        }}
      />
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
});
