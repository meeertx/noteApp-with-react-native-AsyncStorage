import {
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar,
  Dimensions,
} from "react-native";
import React, { useState } from "react";

import RoundIconBtn from "../components/RoundIconBtn";
import colors from "../misc/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Intro = ({ onFinis }) => {
  const [name, setName] = useState("");
  const handleOnChangeText = (text) => {
    setName(text);
  };

  const handleSubmit = async () => {
    const user = { name: name };
    await AsyncStorage.setItem("user", JSON.stringify(user));
    if (onFinis) onFinis();
  };

  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <Text style={styles.inputTitle}>Enter Your Name to Contiune</Text>
        <TextInput
          value={name}
          onChangeText={handleOnChangeText}
          placeholder="Enter Name"
          style={styles.textInput}
        />
        {name.trim().length >= 3 ? (
          <RoundIconBtn style={{backgroundColor:'#8062D6'}} antIconName="arrowright" onPress={handleSubmit} />
        ) : null}
      </View>
    </>
  );
};

export default Intro;
const width = Dimensions.get("window").width - 50;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'#EEEEEE'
  },
  textInput: {
    borderWidth: 2,
    borderColor:'#8062D6',
    color:'#8062D6',
    width,
    height: 50,
    borderRadius: 10,
    paddingLeft: 15,
    fontSize: 20,
    marginBottom: 15,
  },
  inputTitle: {
    alignSelf: "flex-start",
    paddingLeft: 25,
    marginBottom: 5,
    opacity: 0.5,
  },
});
