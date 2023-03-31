import React, { useContext } from "react";
import { View, TouchableOpacity, Text } from 'react-native';
import styles from "../src/style/styles";
import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TaskContext } from "../functions/context";

export default function Menu(props) {
  const { setVisibleModal } = useContext(TaskContext)
  const navigation = useNavigation();
  const { active } = props;

  return (
    <View style={styles.menus}>
      <TouchableOpacity style={styles.itemMenu} onPress={() => navigation.navigate('Home')}>
        <Feather name="home" size={24} color={active === "home" ? '#8687E7' : 'white'} />
        <Text style={styles.txtMenu}>Início</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.itemMenu} onPress={() => navigation.navigate('Calendar')}>
        <Feather name="calendar" size={24} color={active === "calendar" ? '#8687E7' : 'white'} />
        <Text style={styles.txtMenu}>Calendário</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.addTask} onPress={() => setVisibleModal(true)}>
        <Text style={{ fontSize: 40, color: 'white', fontWeight: 'bold' }}>+</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.itemMenu} onPress={() => navigation.navigate('FinishTasks')}>
        <Ionicons name="timer-outline" size={24} color={active === "historic" ? '#8687E7' : 'white'} />
        <Text style={styles.txtMenu}>Histórico</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.itemMenu} onPress={() => navigation.navigate('Profile')}>
        <Feather name="user" size={24} color={active === "profile" ? '#8687E7' : 'white'} />
        <Text style={styles.txtMenu}>Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}