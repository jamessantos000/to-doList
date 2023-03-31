import AsyncStorage from '@react-native-async-storage/async-storage';

async function saveTask(valueTask){
    AsyncStorage.setItem("item",JSON.stringify(valueTask));
}

export default saveTask;