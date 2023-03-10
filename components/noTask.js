import React from "react";
import { Image, View, Text } from "react-native";
import styles from "../src/style/styles";

export default function NoTask(){
    return(
        <View style={styles.taskClean}>

        <Image
        style={{ width: 200, height: 200, marginBottom: 20}}
        source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/2721/2721299.png'
        }} />

        <Text style={styles.txtWhite}>O que você quer fazer hoje?</Text>

        <Text style={{color: 'white', marginTop: 10}}>Toque em + para adicionar tarefas</Text>

        </View>
    );
}