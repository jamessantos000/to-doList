import { Modal, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import styles from "../src/style/styles";
import { TaskContext } from "../functions/context";
import { useContext, useRef, useState } from "react";
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function ModalTask() {
    const { valueTask, newTask, visibleModal, setVisibleModal, flagSelected, setFlagSelected, dateEvent, setDateEvent, hourEvent, setHourEvent, showCalendar, setShowCalendar, showHour, setShowHour, date, modalFlag, setModalFlag, dateTask, setDateTask } = useContext(TaskContext)
    const inputRef = useRef(null); // REFERENCIA PARA O FOCUS DO INPUT
    const [titulo, setTitulo] = useState('') // TITULO DA TASK
    const [descricao, setDescricao] = useState('') // DESCRICAO DA TASK

    const openCalendar = () => {
        setShowCalendar(true);
    };

    async function addNewTask() {
        setDateEvent(""); setTitulo(""); setDescricao(""); setHourEvent("")
        const arra = { tit: titulo, desc: descricao, date: dateEvent, finish: false, flag: flagSelected, hour: hourEvent, dateCalend: dateTask };
        const array = Object.values(arra)
        newTask([...valueTask, array])
        setVisibleModal(false)
        setFlagSelected("white")
    }

    const onChangeDate = (event, selectedDate) => {
        setShowCalendar(false)
        const dataEvento = moment(selectedDate).format('DD/MM/YYYY')
        setDateTask(moment(selectedDate).format('YYYY-MM-DD'))
        setDateEvent(dataEvento)
        setShowHour(true)
    };

    const onChangeHour = (event, selectedHour) => {
        setShowHour(false)
        const horaEvento = moment(selectedHour).format('HH:mm')
        setHourEvent(horaEvento)
    }

    if (showCalendar) {
        return (
            <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={'date'}
                is24Hour={true}
                onChange={onChangeDate}
                locale="pt-BR"
            />
        )
    }

    if (showHour) {
        return (
            <DateTimePicker
                testID="timePicker"
                value={date}
                mode={'time'}
                is24Hour={true}
                onChange={onChangeHour}
                locale="pt-BR"
            />
        )

    }

    if (modalFlag) {
        return (
            <Modal transparent={true} visible={modalFlag} animationType="slide">
                <TouchableWithoutFeedback onPress={() => setModalFlag(false)}>
                    <View style={{ justifyContent: 'flex-end', flex: 1 }}>
                        <View style={{ flexDirection: 'row', top: -25, backgroundColor: 'white', padding: 20, borderRadius: 30, justifyContent: 'space-evenly' }}>
                            <TouchableOpacity onPress={() => { setFlagSelected("green"); setModalFlag(false) }}>
                                <AntDesign name="flag" size={24} color="green" style={{ margin: 10 }} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => { setFlagSelected("orange"); setModalFlag(false) }}>
                                <AntDesign name="flag" size={24} color="orange" style={{ margin: 10 }} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => { setFlagSelected("red"); setModalFlag(false) }}>
                                <AntDesign name="flag" size={24} color="red" style={{ margin: 10 }} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => { setFlagSelected("gray"); setModalFlag(false) }}>
                                <AntDesign name="flag" size={24} color="gray" style={{ margin: 10 }} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => { setFlagSelected("pink"); setModalFlag(false) }}>
                                <AntDesign name="flag" size={24} color="pink" style={{ margin: 10 }} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => { setFlagSelected("blue"); setModalFlag(false) }}>
                                <AntDesign name="flag" size={24} color="blue" style={{ margin: 10 }} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => { setFlagSelected("black"); setModalFlag(false) }}>
                                <AntDesign name="flag" size={24} color="black" style={{ margin: 10 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }

    return (
        <Modal visible={visibleModal} transparent={true} animationType="slide" onShow={() => { inputRef.current.focus() }} onRequestClose={() => { setVisibleModal(false) }} >
            <TouchableWithoutFeedback onPress={() => setVisibleModal(false)}>
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <View style={styles.modalNTask}>
                        <Text style={{ color: 'white', fontFamily: 'Lato_700Bold', fontSize: 20, marginBottom: 20 }}>Adicionar Tarefa</Text>
                        <TextInput ref={inputRef} style={{ color: 'white', borderColor: '#979797', borderWidth: 1, borderRadius: 5, marginBottom: 20, height: 45, padding: 10 }}
                            placeholder="Título"
                            placeholderTextColor="#AFAFAF"
                            value={titulo}
                            onChangeText={setTitulo} />
                        <TextInput multiline={true} style={{ color: 'white', marginBottom: 20, height: 70, borderWidth: 1, borderColor: '#979797', borderRadius: 5, padding: 10 }}
                            placeholder="Descrição"
                            placeholderTextColor="#AFAFAF"
                            value={descricao}
                            onChangeText={setDescricao} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <TouchableOpacity onPress={openCalendar}>
                                    <Feather name="calendar" size={24} color="white" style={{ margin: 10 }} />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => setModalFlag(true)}>
                                    <AntDesign name="flag" size={24} color={flagSelected} style={{ margin: 10 }} />
                                </TouchableOpacity>
                            </View>
                            <Text style={{ marginStart: 0, color: 'white' }}>{dateEvent === "" ? "" : `${dateEvent} : ${hourEvent}`} </Text>
                            <TouchableOpacity onPress={addNewTask}>
                                <Ionicons name="send" size={24} color="#8687E0" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>


    );
}