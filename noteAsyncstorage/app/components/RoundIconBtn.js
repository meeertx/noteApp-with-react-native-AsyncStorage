import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../misc/colors";
import { AntDesign } from '@expo/vector-icons';

const RoundIconBtn = ({ antIconName, size, color,style,onPress }) => {
  return (
    <AntDesign
      name={antIconName}
      size={size || 24}
      color={color || colors.LIGHT}
      style={[styles.icon,{...style}]}
      onPress={onPress}
    />
  );
};

export default RoundIconBtn;

const styles = StyleSheet.create({
    icon:{
        backgroundColor: colors.PRIMARY,
        padding:15,
        borderRadius:50,
        elevation:5
    }
});
