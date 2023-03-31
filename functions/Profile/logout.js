import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
export default function Logout() {
    const navigation = useNavigation()

    async function logoutAccount() {
        try {
            await AsyncStorage.removeItem("signed")
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }]
            })
        } catch (error) {
            Alert.alert("Erro", `Não foi possível realizar logout neste momento. Reporte o erro ${error}`)
        }
    }
    return logoutAccount
}