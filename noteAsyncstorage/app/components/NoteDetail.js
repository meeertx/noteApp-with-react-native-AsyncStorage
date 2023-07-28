import { StyleSheet, Text, View, ScrollView,Alert } from "react-native";
import React, { useState } from "react";
import { useHeaderHeight } from "@react-navigation/elements";
import AsyncStorage from "@react-native-async-storage/async-storage";


import colors from "../misc/colors";
import RaundIconBtn from "../components/RoundIconBtn";
import { useNotes } from "../../contexts/NoteProvider";
import NoteInputModal from "./NoteInputModal";


const formatDate = (ms) => {
  const date = new Date(ms);
  const day = date.getDate();
  const month = date.getMonth() +1;
  const year = date.getFullYear();
  const hrs = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  return `${day}/${month}/${year} - ${hrs}:${min}:${sec}`;
};

const NoteDetail = (props) => {
  const [note,setNote] = useState(props.route.params.note)
  const headerHight = useHeaderHeight();
  const {setNotes} = useNotes();
  const [showModal,setShowModal] = useState(false);
  const [isEdit,setIsEdit] = useState(false);

  //deleting notes

  const deleteNote = async () => {
   const result= await AsyncStorage.getItem('notes');
   let notes = []
   if(result !== null) JSON.parse(result)

   const newNotes = notes.filter(n => n.id !== note.id)
   setNotes(newNotes);
   await AsyncStorage.setItem('notes',JSON.stringify(newNotes))
   props.navigation.goBack()
  };

  const displayDeleteAlert = () => {
    Alert.alert('Are you sure !','This action will delete your note permanently!',[
      {
        text: 'Delete',
        onPress: deleteNote
      },
      {
        text:'No Thanks',
        onPress: () => console.log('no thanks')
      }
    ],
    {
      cancelable:true,
    }
    );
  };

const handleUpdate = async (title,desc, time) => {
 const result= await AsyncStorage.getItem('notes');
 let notes = [];
 if(result !== null) notes= JSON.parse(result)

 const newNotes = notes.filter(n => {
  if(n.id == note.id ){
    n.title = title
    n.desc = desc
    n.isUpdated = true
    n.time = time

    setNote(n);
  }
  return n;
 });

 setNotes(newNotes);
 await AsyncStorage.setItem('notes',JSON.stringify(newNotes))
};
const handleOnClose = () => setShowModal(false)

const openEditModal = () => {
  setIsEdit(true);
  setShowModal(true);
}



  return (
    <>
      <ScrollView contentContainerStyle={[styles.container, { paddingTop: headerHight }]}>
        <Text style={styles.time}>{note.isUpdated ? `Updated At ${formatDate(note.time)}`:`Created At ${formatDate(note.time)}`}</Text>
        <Text style={styles.title}>{note.title}</Text>
        <Text style={styles.desc}>{note.desc}</Text>
      </ScrollView>

      <View style={styles.btnContainer}>
        <RaundIconBtn
          onPress={displayDeleteAlert}
          antIconName="delete"
          style={{ backgroundColor: colors.ERROR, marginBottom: 15 }}
        />
        <RaundIconBtn
          onPress={openEditModal}
          antIconName="edit"
        />
      </View>
      <NoteInputModal isEdit={isEdit} note={note} onClose={handleOnClose} onSubmit={handleUpdate} visible={showModal} />
    </>
  );
};

export default NoteDetail;

const styles = StyleSheet.create({
  container: {
    //flex:1,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.PRIMARY,
  },
  desc: {
    fontSize: 20,
    opacity: 0.5,
  },
  time: {
    textAlign: "right",
    fontSize: 12,
    opacity: 0.5,
  },
  btnContainer: {
    position: "absolute",
    right: 15,
    bottom: 15,
  },
});
