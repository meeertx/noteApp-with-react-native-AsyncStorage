import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import colors from "../misc/colors";
import SearchBar from "../components/SearchBar";
import RoundIconBtn from "../components/RoundIconBtn";
import NoteInputModal from "../components/NoteInputModal";
import Note from "../components/Note";
import { useNotes } from "../../contexts/NoteProvider";
import NoteFound from "../components/NoteFound";

const reverseData = data => {
  return data.sort((a,b) => {
    const aInt = parseInt(a.time);
    const bInt = parseInt(b.time);
    if (aInt < bInt) return 1;
    if (aInt == bInt) return 0;
    if (aInt > bInt) return -1;
  });
};

const NoteScreen = ({ user, navigation }) => {
  const [greet, setGreet] = useState("");
  const [modalVisible, setModalVisibe] = useState(false);
  const { notes, setNotes, findNotes } = useNotes();
  const [searchQuery, setSearchQuery] = useState("");
  const [resultNotFound, setResulNotFound] = useState(false);

  const openNote = (note) => {
    navigation.navigate("NoteDetail", { note });
  };

  const handleOnSearchInput = async (text) => {
    setSearchQuery(text);
    if (!text.trim()) {
      setSearchQuery("");
      setResulNotFound(false);
      return await findNotes();
    }
    const filteredNotes = notes.filter((note) => {
      if (note.title.toLowerCase().includes(text.toLowerCase())) {
        return note;
      }
    });

    if (filteredNotes.length) {
      setNotes([...filteredNotes]);
    } else {
      setResulNotFound(true);
    }
  };

  const findGreet = () => {
    const hrs = new Date().getHours();

    if (hrs === 0 || hrs < 12) return setGreet("Morning");
    if (hrs === 1 || hrs < 17) return setGreet("Afternoon");
    setGreet("Evening");
  };

  useEffect(() => {
    findGreet();
  }, []);

  const reverseNotes = reverseData(notes);

  const handleOnSubmit = async (title, desc) => {
    const note = { id: Date.now(), title: title, desc, time: Date.now() };
    const updateNotes = [...notes, note];
    setNotes(updateNotes);
    await AsyncStorage.setItem("notes", JSON.stringify(updateNotes));
  };

  const handleOnClear = async () => {
    setSearchQuery("");
    setResulNotFound(false);
    await findNotes();
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={colors.LIGHT} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.header}>{`Good ${greet} ${user.name}`}</Text>

          {notes.length ? (
            <SearchBar
              value={searchQuery}
              onChangeText={handleOnSearchInput}
              containerStyle={{ marginVertical: 15 }}
              onClear={handleOnClear}
            />
          ) : null}

          {resultNotFound ? (
            <NoteFound />
          ) : (
            <FlatList
              columnWrapperStyle={{
                justifyContent: "space-between",
                marginBottom: 15,
              }}
              numColumns={2}
              data={reverseNotes}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Note onPress={() => openNote(item)} item={item} />
              )}
            />
          )}

          {!notes.length ? (
            <View
              style={[
                StyleSheet.absoluteFillObject,
                styles.emptyHeaderContainer,
              ]}
            >
              <Text style={styles.emptyHeader}>Add Notes</Text>
            </View>
          ) : null}
          <RoundIconBtn
            onPress={() => setModalVisibe(true)}
            antIconName="plus"
            style={styles.addBtn}
          />
        </View>
      </TouchableWithoutFeedback>
      <RoundIconBtn
        onPress={() => setModalVisibe(true)}
        antIconName="plus"
        style={styles.addBtn}
      />
      <NoteInputModal
        onSubmit={handleOnSubmit}
        visible={modalVisible}
        onClose={() => setModalVisibe(false)}
      />
    </>
  );
};

export default NoteScreen;

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontWeight: "bold",
  },
  container: {
    paddingHorizontal: 20,
    flex: 1,
    zIndex: 1,
  },
  emptyHeaderContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    zIndex: -1,
  },
  emptyHeader: {
    fontSize: 27,
    textTransform: "uppercase",
    fontWeight: "500",
    opacity: 0.5,
  },
  addBtn: {
    position: "absolute",
    right: 15,
    bottom: 50,
    zIndex: 1,
  },
});
