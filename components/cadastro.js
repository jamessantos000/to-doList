import React, { useState, useRef } from 'react';
import { View, Text, SafeAreaView, StatusBar, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import styles from '../src/style/styles';
import { useNavigation } from '@react-navigation/native';
import signUpValida from '../functions/signup';
import LottieView from 'lottie-react-native';

import CryptoES from "crypto-es";

export default function RegisterPage() {
    const animation = useRef(null);
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const [ok, setOk] = useState(false)
    const [name, setName] = useState('')
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')

    function SignUpSend() {
        setLoading(true)
        const accountData = { name, user, pass }
        const chave = 'S3nh@Us3r1@@#$%TaskWise';
        const encryptedData = CryptoES.AES.encrypt(JSON.stringify(accountData), chave).toString();
        signUpValida(encryptedData, (callbk) => {
            if (callbk.msg == "100") {
                setOk(true)
                setLoading(false)
                console.log("CADASTRADO COM SUCESSO")
            } else {
                console.log("ERRO AO CADASTRAR")
            }
        })
    }

    if (ok === true) {
        setTimeout(() => {
            navigation.navigate('Login')
        }, 3000);
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
                    <Text style={{ color: '#fff', fontWeight: '700' }}>Bem vindo(a), {name}</Text>
                    <Text style={{ color: '#fff', fontWeight: '700', fontSize: 20 }}>Agora, realize seu login</Text>
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
                        source={require('../src/assets/loading-page.json')}
                    />
                    <Text style={{ color: '#fff', fontWeight: '700' }}>CADASTRANDO...</Text>
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
                <StatusBar
                    barStyle="light-content"
                    backgroundColor='black'
                />
                <Text style={styles.txtCadastro}>Cadastro</Text>
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    <View>
                        <Text style={{ color: 'white' }}>Nome</Text>
                        <TextInput
                            style={styles.inputSignInUp}
                            placeholder='Informe seu nome'
                            placeholderTextColor="#535353"
                            onChangeText={setName}
                            value={name}
                            keyboardType="email-address"
                        />
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
                            placeholder='Crie uma senha'
                            placeholderTextColor="#535353"
                            onChangeText={setPass}
                            value={pass}
                            autoCapitalize="none"
                            secureTextEntry={true}
                        />
                        <TouchableOpacity style={styles.btnSignInUp} onPress={SignUpSend}>
                            <Text style={{ color: '#fff', fontSize: 16 }}>Cadastrar</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{ alignItems: 'center', marginBottom: 20 }} activeOpacity={0.5} onPress={() => navigation.navigate('Login')}>
                        <Text style={{ color: '#979797' }}>Já tem uma conta? <Text style={{ fontWeight: '300', color: '#fff' }}>Login</Text></Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}