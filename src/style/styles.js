import {
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'space-between'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20
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
    }

});

export default styles;