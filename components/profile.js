import React, { useContext } from "react";
import { SafeAreaView, View, Image, Text, TouchableOpacity } from "react-native";
import styles from "../src/style/styles";
import Menu from "./menuFooter";
import { TaskContext } from "../functions/context";
import { Ionicons, FontAwesome5, Entypo, Fontisto, Feather } from '@expo/vector-icons';
import Logout from "../functions/Profile/logout";

export default function Profile() {
    const { nomeU } = useContext(TaskContext)
    const logoutAccount = Logout()
    return (
        <SafeAreaView style={styles.container}>

            <View style={{ flex: 1, paddingTop: 20 }}>
                <View>
                    <View style={{ alignItems: "center" }}>
                        <Image
                            style={{ height: 100, width: 100, borderRadius: 100 }}
                            source={{ uri: 'https://images.ctfassets.net/lh3zuq09vnm2/yBDals8aU8RWtb0xLnPkI/19b391bda8f43e16e64d40b55561e5cd/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.png' }}
                        />
                        <Text style={styles.txtNameProfile}>{nomeU}</Text>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", marginTop: 20 }}>
                        <View style={{ backgroundColor: '#363636', padding: 20 }}>
                            <Text style={{ color: '#fff' }}>5 Task Concluidas</Text>
                        </View>
                        <View style={{ backgroundColor: '#363636', padding: 20 }}>
                            <Text style={{ color: '#fff' }}>8 Task Pendentes</Text>
                        </View>
                    </View>
                    <View style={{ paddingTop: 20, marginLeft: 20, marginRight: 20 }}>
                    <TouchableOpacity style={styles.optionsProfile}>
                            <View style={{ display: 'flex', flexDirection: "row", alignItems: "center" }}>
                            <Ionicons name="ios-settings-sharp" size={24} color="white" />
                                <Text style={[styles.txtOptionsProfile]}>Configurações do App</Text>
                            </View>
                            <Entypo name="chevron-right" size={24} color="white" />
                        </TouchableOpacity>
                    <TouchableOpacity style={styles.optionsProfile}>
                            <View style={{ display: 'flex', flexDirection: "row", alignItems: "center" }}>
                            <Feather name="user" size={24} color="white" />
                                <Text style={[styles.txtOptionsProfile]}>Modificar nome</Text>
                            </View>
                            <Entypo name="chevron-right" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionsProfile}>
                            <View style={{ display: 'flex', flexDirection: "row", alignItems: "center" }}>
                                <Ionicons name="md-key" size={24} color="white" />
                                <Text style={[styles.txtOptionsProfile]}>Alterar senha da conta</Text>
                            </View>
                            <Entypo name="chevron-right" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionsProfile}>
                            <View style={{ display: 'flex', flexDirection: "row", alignItems: "center" }}>
                                <Fontisto name="camera" size={20} color="white" />
                                <Text style={[styles.txtOptionsProfile]}>Alterar imagem de perfil</Text>
                            </View>
                            <Entypo name="chevron-right" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionsProfile}>
                            <View style={{ display: 'flex', flexDirection: "row", alignItems: "center" }}>
                                <FontAwesome5 name="hands-helping" size={20} color="white" />
                                <Text style={[styles.txtOptionsProfile]}>Sobre</Text>
                            </View>
                            <Entypo name="chevron-right" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionsProfile} onPress={() => logoutAccount()}>
                            <View style={{ display: 'flex', flexDirection: "row", alignItems: "center" }}>
                                <Ionicons name="md-exit-outline" size={30} color="red" />
                                <Text style={[styles.txtOptionsProfile, { color: '#FF4949' }]}>Sair</Text>
                            </View>
                            <Entypo name="chevron-right" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <Menu active={'profile'} />
        </SafeAreaView>
    )
}