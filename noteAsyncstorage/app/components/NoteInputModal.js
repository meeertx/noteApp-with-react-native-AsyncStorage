import {
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  View,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../misc/colors";
import RoundIconBtn from "./RoundIconBtn";

const NoteInputModal = ({ visible,onClose,onSubmit,note,isEdit }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleModalClose = () => {
    Keyboard.dismiss();
  };

useEffect(() => {
  if(isEdit){
    setTitle(note.title);
    setDesc(note.desc);
  }
},[isEdit])

  const hadnOnChangeText = (text, valueFor) => {
    if (valueFor === "title") setTitle(text);
    if (valueFor === "desc") setDesc(text);
  };
 
  const handleSubmit = () => {
     if(!title.trim() && !desc.trim()) return onClose()

     if(isEdit){
      //for edit
      onSubmit(title,desc,Date.now());
     }
     else{
     onSubmit(title,desc);
     setTitle('');
     setDesc('');
     }
     onClose();
  };

  const closeModal = () => {
    if(!isEdit){
      setTitle('');
      setDesc('');
    }
    onClose();
  }

  return (
    <>
      <StatusBar hidden={false} />
      <Modal visible={visible} animationType="fade">
        <View style={styles.container}>
          <TextInput
            value={title}
            onChangeText={(text) => hadnOnChangeText(text, "title")}
            placeholder="Title"
            style={[styles.input, styles.title]}
          />
          <TextInput
            value={desc}
            multiline
            placeholder="Note"
            style={[styles.input, styles.desc]}
            onChangeText={(text) => hadnOnChangeText(text, "desc")}
          />
          <View style={styles.btnContainer}>
            <RoundIconBtn size={15} antIconName="check" onPress={handleSubmit}/>
          {title.trim() || desc.trim() ? ( <RoundIconBtn onPress={closeModal} size={15} antIconName="close" style={{marginLeft:15}} />) : null}
          </View>
        </View>
        <TouchableNativeFeedback onPress={handleModalClose}>
          <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
        </TouchableNativeFeedback>
      </Modal>
    </>
  );
};

export default NoteInputModal;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: colors.PRIMARY,
    fontSize: 20,
    color: colors.DARK,
  },
  title: {
    height: 40,
    marginBottom: 15,
    fontWeight: "bold",
  },
  desc: {
    height: 100,
  },
  modalBG: {
    flex: 1,
    zIndex: -1,
  },
  btnContainer:{
    flexDirection:'row',
    justifyContent:'center',
    paddingVertical:15,
  }
});
