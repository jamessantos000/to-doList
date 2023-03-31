import React, { useState, createContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
export const TaskContext = createContext({})
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileDataRescue from "./profileDataRescue";
import VerifyLogin from "./verifyLogin";

import CryptoES from "crypto-es";

function TaskProvider({ children }) {
    const navigation = useNavigation()
    const [valueTask, setValueTask] = useState([])
    const [orderBy, setOrderBy] = useState(true)
    const [nomeU, setNomeU] = useState('')
    const [emailU, setEmailU] = useState('')
    const [fotoU, setFotoU] = useState('')
    const [liberado, setLiberado] = useState(false)
    const VerfLogn = new VerifyLogin()

    //MODAL TASK
    const [visibleModal, setVisibleModal] = useState(false) // MOSTRA OU OCULTA O MODAL
    const [dateEvent, setDateEvent] = useState(""); // DATA DO EVENTO
    const [dateTask, setDateTask] = useState("") // DATA DO EVENDO FORMATADO PARA CALENDARIO
    const [hourEvent, setHourEvent] = useState("") // HORA DO EVENTO
    const [showCalendar, setShowCalendar] = useState(false) // CONTROLA EXIBICAO DO CALENDARIO
    const [showHour, setShowHour] = useState(false) // CONTROLA EXIBICAO DA HORA
    const [date] = useState(new Date()); // REFERENCIA DATA E HORA

    const [modalFlag, setModalFlag] = useState(false) // MOSTRA OU OCULTA MODAL DE FLAGS
    const [flagSelected, setFlagSelected] = useState("white") // PADRAO FLAG BRANCA

    useEffect(() => {
        // VerfLogn.Verify((signed) => {
        //     if(signed){
        //         console.log(signed)
        //         setLiberado(true)
        //     }else{
        //         console.log("NAO LOGADO")
        //         navigation.reset({
        //             index: 0,
        //             routes: [{ name: 'Login' }]
        //         })
        //     }
        // })

        ProfileDataRescue((callb) => {
            setNomeU(callb[0].nome)
            setEmailU(callb[0].email)
        })
    }, [])

    function newTask(dataNewTask) {
        setValueTask(dataNewTask)
    }

    async function saveUserLogin(dataUser) {
        decrypt(dataUser, (callbk) => {
            if (callbk != "") {
                console.log("CONTEXT HOME")
                const nome = JSON.parse(callbk)[0].nome
                const email = JSON.parse(callbk)[0].email
                setNomeU(nome)
                setEmailU(email)
                AsyncStorage.setItem("signed", callbk);
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }]
                })
                setLiberado(true)
            }
        })
    }

    function decrypt(crypt, decrypt) {
        const chave = 'S3nh@Us3r1@@#$%TaskWise';
        const decrypted = CryptoES.AES.decrypt(crypt, chave).toString(CryptoES.enc.Utf8)
        decrypt(decrypted)
    }

    return (
        <TaskContext.Provider value={{
            valueTask, newTask,
            orderBy, setOrderBy,
            saveUserLogin, nomeU, emailU, fotoU, liberado, setLiberado,
            visibleModal, setVisibleModal, flagSelected, setFlagSelected, dateEvent, setDateEvent, dateTask, setDateTask, hourEvent, setHourEvent, showCalendar, setShowCalendar, showHour, setShowHour, date,
            modalFlag, setModalFlag
        }}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskProvider