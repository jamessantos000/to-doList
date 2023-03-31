import {
    Platform,
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'space-between',
        paddingTop: Platform.OS === 'ios' ? 25 : 0
    },
    containerLogin: {
        flex: 1,
        backgroundColor: '#000000',
        paddingLeft: 25,
        paddingRight: 25,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
    },
    txtWhite: {
        fontSize: 20,
        color: 'white'
    },
    taskClean: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    menus: {
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
        backgroundColor: '#363636',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    itemMenu: {
        alignItems: 'center'
    },
    txtMenu: {
        color: 'white',
        marginTop: 10,
        fontFamily: 'Lato_400Regular',
        fontSize: 12
    },
    addTask: {
        backgroundColor: '#8687E7',
        width: 70,
        height: 70,
        marginLeft: -25,
        marginRight: -25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        top: -50
    },
    modalNTask: {
        padding: 20,
        backgroundColor: '#363636',
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        justifyContent: 'space-evenly'
    },
    taskUnd: {
        padding: 10,
        backgroundColor: '#363636',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10
    },
    checkboxContainer: {
        width: 24,
        height: 24,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checked: {
        borderColor: '#000',
        backgroundColor: '#fff',
    },
    checkmark: {
        color: 'blue'
    },
    blurContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    titleCalendar: {
        textTransform: 'uppercase',
        fontSize: 15,
        fontWeight: '700'
    },
    descCalendar: {
        fontSize: 15
    },
    txtDateCalendar: {
        color: '#505050'
    },
    txtLogin: {
        color: '#fff',
        fontSize: 30,
        fontWeight: '700',
        marginTop: '15%',
        marginBottom: '50%'
    },
    txtCadastro: {
        color: '#fff',
        fontSize: 30,
        fontWeight: '700',
        marginTop: '15%',
        marginBottom: '40%'
    },
    inputSignInUp: {
        backgroundColor: '#1D1D1D',
        padding: 10,
        borderWidth: 1,
        borderColor: '#979797',
        color: '#fff',
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 25,
        height: 50
    },
    btnSignInUp: {
        backgroundColor: '#8687E7',
        padding: 15,
        alignItems: 'center'
    },
    txtNameProfile: {
        color: 'white',
        fontSize: 17,
        marginTop: 20,
        fontFamily: 'Lato_400Regular',
    },
    optionsProfile: {
        alignItems: "center",
        display: 'flex',
        flexDirection: "row",
        marginTop: 15,
        marginBottom: 15,
        justifyContent: 'space-between'
    },
    txtOptionsProfile:{
        marginLeft: 20,
        fontSize: 15,
        color: 'white'
    }

});

export default styles;