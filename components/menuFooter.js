import React from "react";
import { View, TouchableOpacity, Text } from 'react-native';
import styles from "../src/style/styles";
import { Ionicons, Feather } from '@expo/vector-icons';

export default function Menu(props){
    const { setVisibleModal } = props;

    return(
        <View style={styles.menus}>
          <TouchableOpacity style={styles.itemMenu}>
            <Feather name="home" size={24} color="white" />
            <Text style={styles.txtMenu}>Início</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemMenu}>
            <Feather name="calendar" size={24} color="white" />
            <Text style={styles.txtMenu}>Calendário</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.addTask} onPress={ () => setVisibleModal(true)}>
            <Text style={{fontSize: 40, color: 'white', fontWeight: 'bold'}}>+</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemMenu}>
          <Ionicons name="timer-outline" size={24} color="white" />
            <Text style={styles.txtMenu}>Histórico</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.itemMenu}>
          <Feather name="user" size={24} color="white" />
            <Text style={styles.txtMenu}>Perfil</Text>
          </TouchableOpacity>
      </View>
    );
}