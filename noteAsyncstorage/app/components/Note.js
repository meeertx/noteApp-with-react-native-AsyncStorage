import { StyleSheet, Text, View ,Dimensions, TouchableOpacity} from "react-native";
import React from "react";
import colors from "../misc/colors";

const Note = ({ item, onPress }) => {
  const { title, desc } = item;
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.title} numberOfLines={2}>{title}</Text>
      <Text numberOfLines={3} style={styles.desc}>{desc}</Text>
    </TouchableOpacity>
  );
};

export default Note;

const width = Dimensions.get('window').width - 50;

const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.PRIMARY,
        width: width /2 -10 ,
        padding:8,
        borderRadius:10,
    },
    title:{
        fontWeight:'bold',
        fontSize:16,
        color:colors.LIGHT
    },
    desc:{
      fontSize:16,
      fontWeight:'400',
      color:colors.DARK
    }
});
