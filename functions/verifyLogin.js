import AsyncStorage from '@react-native-async-storage/async-storage';

class VerifyLogin{
    constructor(){
        this.Verify = this.Verify.bind(this)
    }

    Verify(callbk){
        AsyncStorage.getItem("signed", (err, result) => {
            if(err){
                console.log(err)
            }else{
                callbk(result)
            }
        })
    }
}

export default VerifyLogin

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';
// import { useContext, useEffect, useRef } from 'react';
// import { Alert } from 'react-native';
// import { TaskContext } from './context';

// function VerifyLogin() {
//     const navigation = useNavigation()
//     const { liberado, setLiberado } = useContext(TaskContext)
//     const animation = useRef(null);

//     useEffect(() => {
//         async function VerifySigned() {
//             try {
//                 const signed = await AsyncStorage.getItem("signed")
//                 console.log(signed)
//                 if (signed !== null) {
//                     console.log("LOGADO")
//                     setLiberado(true)
//                 } else {
//                     console.log("NAO LOGADO")
//                     navigation.reset({
//                         index: 0,
//                         routes: [{ name: 'Login' }]
//                     })
//                 }
//             } catch (error) {
//                 Alert.alert("Erro", "Não conseguimos definir sua conta, por favor feche e abra o aplicativo novamente.")
//             }
//         }
//         VerifySigned()
//     }, [])
// }

// export default VerifyLogin


