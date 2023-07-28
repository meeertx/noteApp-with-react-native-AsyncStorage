import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import colors from "../misc/colors";
import { AntDesign } from "@expo/vector-icons";

const SearchBar = ({ containerStyle, value, onChangeText, onClear }) => {
  return (
    <>
      <View style={[styles.container, { ...containerStyle }]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Search here..."
          style={styles.searchBar}
        />
        {value ? (
          <AntDesign
            style={styles.clearIcon}
            name="close"
            size={20}
            color={colors.PRIMARY}
            onPress={onClear}
          />
        ) : null}
      </View>
    </>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    borderWidth: 1,
    borderColor: colors.PRIMARY,
    height: 40,
    borderRadius: 40,
    paddingLeft: 15,
    fontSize: 20,
  },
  container: {
    justifyContent:'center'
  },
  clearIcon:{
    position:'absolute',
    right:20
  },
});
