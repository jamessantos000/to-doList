import React from 'react';
import { useRef, useContext } from 'react';
import { SafeAreaView } from 'react-native'
import LottieView from 'lottie-react-native';
import VerifyLogin from '../functions/verifyLogin';
import { useNavigation } from '@react-navigation/native';
import { TaskContext } from '../functions/context';

function LoadingScreen() {
    const animation = useRef(null);
    const VerfLogn = new VerifyLogin()
    const navigation = useNavigation()

    VerfLogn.Verify((signed) => {
        if (signed) {
            console.log(signed)
            // setLiberado(true)
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }]
            })
        } else {
            console.log("NAO LOGADO")
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }]
            })
        }
    })

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center' }}>
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
        </SafeAreaView>
    )
}

export default LoadingScreen