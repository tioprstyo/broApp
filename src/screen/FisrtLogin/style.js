import { StyleSheet, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#ffffff',
        height: windowHeight
    },
    content: {
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
        top: '15%',
        paddingHorizontal: '10%',
        paddingBottom: '10%',
    },
    background: {
        position: 'absolute',
        bottom: 0,
        height: '60%',
        width: windowWidth,
        zIndex: 0
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'rubik',
        color: '#283044',
        textAlign: 'center',
        height: 120,
    },
    descTitle: {
        fontSize: 22,
        fontFamily: 'rubik',
        color: '#283044',
        textAlign: 'center',
    },
    btnNext: {
        width: '50%',
        borderRadius: 40,
        paddingVertical: 10,
        marginTop: 30,
        borderWidth: 1,
        backgroundColor: '#283044',
        borderColor: '#283044',
        zIndex: 100
    },
    textBtnNext: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: '500'
    },
    btnCancel: {
        width: '50%',
        borderRadius: 40,
        paddingVertical: 10,
        marginTop: 15,
        borderWidth: 1,
        backgroundColor: '#ffffff',
        borderColor: '#283044',
        zIndex: 100
    },
    textBtnCancel: {
        color: '#283044',
        textAlign: 'center',
        fontWeight: '500'
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        paddingHorizontal: 20
    },
    buttonClose: {
        backgroundColor: "#283044",
    },
    textStyle: {
        color: "white",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 20,
        textAlign: "center",
        fontFamily: 'rubik',
        fontWeight: 'bold',
        color: '#283044',
        fontSize: 16,
    },
    modalDesc: {
        marginBottom: 20,
        textAlign: "center",
        fontFamily: 'rubik',
        color: '#283044',
        fontSize: 14,
    },
    iconModal: {
        width: 50,
        height: 50,
        marginBottom: 30
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(20, 20, 20, 0.5)',
    },
    positionClose: {
        position: 'absolute',
        right: 20,
        top: 20,
    },
    iconClose: {
        width: 15,
        height: 15,
    }
});

export default styles;