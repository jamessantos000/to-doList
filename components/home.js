import { StatusBar, View } from 'react-native';
import { useFonts, Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato';
import { useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../src/style/styles';
import { TaskContext } from "../functions/context";

import Header from './header';
import NoTask from '../components/noTask';
import TaskList from '../components/taskList';
import saveTask from '../functions/saveTask';
import Menu from '../components/menuFooter';
import LoadingScreen from './loading';
import ModalTask from './modalTask';

export default function App({ navigation }) {
  const [fontsLoaded] = useFonts({ Lato_400Regular, Lato_700Bold }); // FONTES PERSONALIZADAS
  const { valueTask, newTask, liberado } = useContext(TaskContext) // CONTEXT API - VALORES GLOBAIS
  const [controlTask, setControlTask] = useState(true) // EXIBE AS TAREFAS OU BOAS VINDAS SE NAO HOUVER TASKS

  useEffect(() => {
    console.log("HOME")
    async function carregaTask() {
      try {
        const task = await AsyncStorage.getItem("item")
        if (JSON.parse(task) !== null) {
          newTask(JSON.parse(task))
        }
      } catch (error) {
        Alert.alert("Erro ao carregar tarefas", "Não foi possível carregar suas tarefas. Tente novamente mais tarde.")
      }
    }
    carregaTask()
  }, [])

  useEffect(() => {
    if (valueTask.filter(task => !task[3]).length != 0) {
      setControlTask(true)
    } else {
      setControlTask(false)
    }
    saveTask(valueTask);
  }, [valueTask])

  if (!fontsLoaded) {
    <LoadingScreen />
  } else {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor='black'
        />

        <Header active="Início" />

        {controlTask ?

          <TaskList data={valueTask} />

          :

          <NoTask />

        }

        <Menu active={"home"} />

        <ModalTask />

      </View>
    );
  }
}