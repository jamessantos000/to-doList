import React, { useRef, useState, useContext } from 'react';
import { View, Text, SafeAreaView, StatusBar, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView } from 'react-native'
import styles from '../src/style/styles';
import { useNavigation } from '@react-navigation/native';
import signInValida from '../functions/Login/signin';
import LottieView from 'lottie-react-native';
import { TaskContext } from '../functions/context';

import CryptoES from "crypto-es";

export default function LoginPage() {
    const { saveUserLogin } = useContext(TaskContext)
    const navigation = useNavigation()
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [loading, setLoading] = useState(false)
    const animation = useRef(null);
    const [returnLognIn, setReturnLognIn] = useState(null)
    const [dataAuth, setDataAuth] = useState('')

    function SignInSend() {
        if (user == "" || pass == "") {
            return Alert.alert("Erro", "Primeiro preencha seus dados de login")
        }
        setLoading(true)
        const accountData = { user, pass }
        const chave = 'S3nh@Us3r1@@#$%TaskWise';
        const encryptedData = CryptoES.AES.encrypt(JSON.stringify(accountData), chave).toString();
        signInValida(encryptedData, (callbk) => {
            setLoading(false); setUser(''); setPass('')
            if (callbk.msg == "010") {
                setDataAuth(callbk.bcnd)
                setReturnLognIn(true)
            } if (callbk.msg == "015") {
                setReturnLognIn(false)
            }
        })
    }

    function LoggedOk() {
        setTimeout(() => {
            saveUserLogin(dataAuth)
            setReturnLognIn(null)
        }, 1700);
    }

    function LoggedNo() {
        setTimeout(() => {
            setReturnLognIn(null)
        }, 1700);
    }

    if (returnLognIn === true) {
        LoggedOk()
        return (
            <SafeAreaView style={styles.containerLogin}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    flex: 1
                }}>
                    <LottieView
                        autoPlay
                        ref={animation}
                        style={{
                            width: 400,
                            height: 400,
                            backgroundColor: '#000',
                        }}
                        source={require('../src/assets/sucesso.json')}
                    />
                    {/* <Text style={{ color: '#fff', fontWeight: '700' }}>Bem vindo(a), ${nameUser}</Text> */}
                </View>
            </SafeAreaView>
        );
    }
    if (returnLognIn === false) {
        LoggedNo()
        return (
            <SafeAreaView style={styles.containerLogin}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    flex: 1
                }}>
                    <LottieView
                        autoPlay
                        ref={animation}
                        style={{
                            width: 400,
                            height: 400,
                            backgroundColor: '#000',
                        }}
                        source={require('../src/assets/erro.json')}
                    />
                </View>
            </SafeAreaView>
        );
    }

    if (loading) {
        return (
            <SafeAreaView style={styles.containerLogin}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    flex: 1
                }}>
                    <LottieView
                        autoPlay
                        ref={animation}
                        style={{
                            width: 400,
                            height: 400,
                            backgroundColor: '#000',
                        }}
                        source={require('../src/assets/loading-lotie.json')}
                    />
                    <Text style={{ color: '#fff', fontWeight: '700' }}>VALIDANDO...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <KeyboardAvoidingView
            behavior="padding"
            style={{flex: 1, backgroundColor: '#000'}}
        >
        <SafeAreaView style={styles.containerLogin}>
            <Text style={styles.txtLogin}>Login</Text>
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <View>
                    <Text style={{ color: 'white' }}>Usuário</Text>
                    <TextInput
                        style={styles.inputSignInUp}
                        placeholder='Digite seu e-mail'
                        placeholderTextColor="#535353"
                        onChangeText={setUser}
                        value={user}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                    <Text style={{ color: 'white' }}>Senha</Text>
                    <TextInput
                        style={styles.inputSignInUp}
                        placeholder='Digite sua senha'
                        placeholderTextColor="#535353"
                        onChangeText={setPass}
                        value={pass}
                        autoCapitalize="none"
                        secureTextEntry={true}
                    />
                    <TouchableOpacity style={styles.btnSignInUp} onPress={SignInSend}>
                        <Text style={{ color: '#fff', fontSize: 16 }}>Login</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ alignItems: 'center', marginBottom: 20 }} activeOpacity={0.5} onPress={() => navigation.navigate('Cadastro')}>
                    <Text style={{ color: '#979797' }}>Não tem uma conta? <Text style={{ fontWeight: '300', color: '#fff' }}>Cadastre-se</Text></Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
        </KeyboardAvoidingView>
    );
}