import { StatusBar, Text, View, Image, TouchableOpacity, Modal, TextInput, TouchableWithoutFeedback, FlatList } from 'react-native';
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons';
import { useFonts, Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato';
import { useState, useRef, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

import styles from './src/style/styles';

import saveTask from './src/saveTask'; // SALVA A TASK

import NoTask from './components/noTask';
import TaskList from './components/taskList';
import Menu from './components/menuFooter';

export default function App() {
  const [controlTask, setControlTask] = useState(true) // EXIBE AS TAREFAS OU OUTRA MSG
  const [valueTask, setValueTask] = useState([]) // O JSON DE CADA TASK

  const [date] = useState(new Date()); // CALENDARIO
  const [dateEvent, setDateEvent] = useState(""); // DATA DO EVENTO
  const [hourEvent, setHourEvent] = useState("") // HORA DO EVENTO
  const [showCalendar, setShowCalendar] = useState(false); // CALENDARIO
  const [showHour, setShowHour] = useState(false) // HORA

  const [visibleModal, setVisibleModal] = useState(false) // MODAL NEW TASK
  const [modalFlag, setModalFlag] = useState(false) // MODAL FLAG
  const [flagSelected, setFlagSelected] = useState("white")
  const inputRef = useRef(null); // REFERENCIA PARA O FOCUS DO INPUT

  const [titulo, setTitulo] = useState("")
  const [descricao, setDescricao] = useState("")


  useEffect(() => {
    async function carregaTask(){
      try {
        const task = await AsyncStorage.getItem("item")
        setValueTask(JSON.parse(task))
      } catch (error) {
        Alert.alert("Erro ao carregar tarefas", "Não foi possível carregar suas tarefas. Tente novamente mais tarde.")
      }
    }
    carregaTask()
  }, [])

  useEffect(() => {
    if(valueTask.length === 0){
      setControlTask(false)
    }else{
      setControlTask(true)
    }
    saveTask(valueTask);
  }, [valueTask])


  const onChangeDate = (event, selectedDate) => {
    setShowCalendar(false)
    const dataEvento = moment(selectedDate).format('DD/MM/YYYY')
    setDateEvent(dataEvento)
  };

  const onChangeHour = (event, selectedHour) => {
    setShowHour(false)
    const horaEvento = moment(selectedHour).format('HH:mm')
    setHourEvent(horaEvento)
    console.log(horaEvento)
  }

  const openCalendar = () => {
    setShowCalendar(true);
    setShowHour(true)
  };

  let [fontsLoaded] = useFonts({
    Lato_400Regular,
    Lato_700Bold
  });

  if (!fontsLoaded) {
    return null;
  }

  async function addNewTask(){
    setFlagSelected("white")
    setDateEvent(""); setTitulo(""); setDescricao(""); setHourEvent("")
    const arra = {tit:titulo,desc:descricao,dat: dateEvent, finish: false, flag: flagSelected, hour: hourEvent};
    const array = Object.values(arra)
    setValueTask([...valueTask, array])
    setVisibleModal(false)
  }

  const deleteTask = (item) => {
    setValueTask(valueTask.filter(tasks => tasks != item ));
  };
  

  const handleCheckboxChange = (index) => {
    const newData = [...valueTask];
    newData[index][3] = !newData[index][3];
    setValueTask(newData);
  };
 
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor='black'
      />

      <View style={styles.header}>
        <Ionicons name="filter-outline" size={24} color="white" />
        <Text style={styles.txtWhite}>Início</Text>
        <Image 
          style={{ width: 50, height: 50, borderRadius: 50 }}
          source={{
            uri: 'https://images.ctfassets.net/lh3zuq09vnm2/yBDals8aU8RWtb0xLnPkI/19b391bda8f43e16e64d40b55561e5cd/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.png',
          }}
        />
      </View>

      {controlTask ? 

        <TaskList data={valueTask} handleCheckboxChange={handleCheckboxChange} deleteTask={deleteTask}  />
      
      :

        <NoTask />
        
      }

        <Menu setVisibleModal={setVisibleModal} />

      <Modal visible={visibleModal} transparent={true} animationType="slide" onShow={() => {inputRef.current.focus()}} onRequestClose={() => {setVisibleModal(false); setDateEvent(""); setHourEvent(""); setFlagSelected("white")} }>        
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <View style={styles.modalNTask}>
              <Text style={{color: 'white', fontFamily: 'Lato_700Bold', fontSize: 20, marginBottom: 20}}>Adicionar Tarefa</Text>
              <TextInput ref={inputRef} style={{ color: 'white', borderColor: '#979797', borderWidth: 1, borderRadius: 5, marginBottom: 20, height: 45, padding: 10}} 
                placeholder="Título"
                placeholderTextColor="#AFAFAF"
                onChangeText={setTitulo}
              />
              <TextInput multiline={true} style={{color: 'white', marginBottom: 20, height: 70, borderWidth: 1, borderColor: '#979797', borderRadius: 5, padding: 10}}
                placeholder="Descrição"
                placeholderTextColor="#AFAFAF"
                onChangeText={setDescricao} />
              
              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                  <TouchableOpacity onPress={openCalendar}>
                    <Feather name="calendar" size={24} color="white" style={{margin: 10}} />
                  </TouchableOpacity>
                  
                  <TouchableOpacity onPress={() => setModalFlag(true)}>
                    <AntDesign name="flag" size={24} color={flagSelected} style={{margin: 10}} />
                  </TouchableOpacity>

                </View>
                <Text style={{marginStart: 0, color: 'white'}}>{dateEvent === "" ? "" : `${dateEvent} : ${hourEvent}` } </Text>
                <TouchableOpacity onPress={addNewTask}>
                  <Ionicons name="send" size={24} color="#8687E0" />
                </TouchableOpacity>
                
              </View>

            </View>
          </View>
      </Modal>

      <Modal transparent={true} visible={modalFlag} animationType="slide">
      <TouchableWithoutFeedback onPress={() => setModalFlag(false)}>
        <View style={{justifyContent: 'flex-end', flex: 1}}>
          <View style={{flexDirection: 'row', top: -25, backgroundColor: 'white', padding: 20, borderRadius: 30, justifyContent: 'space-evenly'}}>
            <TouchableOpacity onPress={() => {setFlagSelected("green"); setModalFlag(false)} }>
              <AntDesign name="flag" size={24} color="green" style={{margin: 10}} />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => {setFlagSelected("orange"); setModalFlag(false)}}>
              <AntDesign name="flag" size={24} color="orange" style={{margin: 10}} />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => {setFlagSelected("red"); setModalFlag(false)}}>
              <AntDesign name="flag" size={24} color="red" style={{margin: 10}} />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => {setFlagSelected("gray"); setModalFlag(false)}}>
              <AntDesign name="flag" size={24} color="gray" style={{margin: 10}} />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => {setFlagSelected("pink"); setModalFlag(false)}}>
              <AntDesign name="flag" size={24} color="pink" style={{margin: 10}} />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => {setFlagSelected("blue"); setModalFlag(false)}}>
              <AntDesign name="flag" size={24} color="blue" style={{margin: 10}} />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => {setFlagSelected("black"); setModalFlag(false)}}>
              <AntDesign name="flag" size={24} color="black" style={{margin: 10}} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
      </Modal>

        {showHour && (
        <DateTimePicker
          testID="timePicker"
          value={date}
          mode={'time'}
          is24Hour={true}
          onChange={onChangeHour}
          locale="pt-BR"
        />
      )}
        {showCalendar && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'date'}
          is24Hour={true}
          onChange={onChangeDate}
          locale="pt-BR"
        />
      )}
    </View>
  );
}