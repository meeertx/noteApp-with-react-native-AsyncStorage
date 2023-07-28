import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import colors from '../misc/colors';

const NoteFound = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject,styles.container]}>
      <AntDesign name='frowno' size={90} color={colors.DARK} />
      <Text style={{ marginTop:20,fontSize:20,fontWeight:'bold' }}>Result Not Found</Text>
    </View>
  )
}

export default NoteFound;

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        opacity:0.5,
        zIndex:-1,
    },

});