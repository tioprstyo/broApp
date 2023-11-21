import { StyleSheet, Dimensions } from 'react-native';
const windowHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        position: 'relative',
    },
    background: {
        flex: 1,
        resizeMode: "cover",
        padding: 20,
        height: windowHeight
    },
    header: {
        alignItems: 'center',
        top: 30,
        marginBottom: 20
    },
    content: {
        zIndex: 100,
    },
    logo: {
        marginBottom: 100
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        fontFamily: "rubik",
        color: "#FFFFFF",
        marginBottom: 10
    },
    subtitle: {
        fontSize: 14,
        fontFamily: "rubik",
        fontWeight: '400',
        color: "#FFFFFF"
    },
    label: {
        fontSize: 12,
        fontFamily: "rubik",
        fontWeight: '400',
        color: "#FFFFFF",
        marginBottom: 8,
        marginLeft: 15,
    },
    sectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: '#b3b3b3',
        height: 50,
        borderRadius: 40,
    },
    numbCode: {
        padding: 5,
        margin: 5,
        alignItems: 'center',
        color: '#6d7278',
    },
    formInputSignIn: {
        flex: 1,
        paddingLeft: 10,
        borderLeftWidth: 0.5,
        borderLeftColor: '#b3b3b3'
    },
    actionSign: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnSignIn: {
        backgroundColor: '#283044',
        width: '50%',
        borderRadius: 40,
        paddingVertical: 10,
        marginBottom: 15,
    },
    btnSignInDis: {
        backgroundColor: '#BEBEBE',
        width: '50%',
        borderRadius: 40,
        paddingVertical: 10,
        marginBottom: 15,
    },
    btnSignUp: {
        width: '50%',
        borderRadius: 40,
        paddingVertical: 10,
        borderWidth: 1,
        borderLeftColor: '#283044'
    },
    toas: {
        backgroundColor: 'red'
    },
    error: {
        fontSize: 12,
        color: '#f37a73',
        paddingLeft: 15,
        marginTop: 5
    },
    otpForm: {
        justifyContent: 'center',
        alignContent: 'center',
        paddingHorizontal: 10,
        marginBottom: 50
    },
    underlineStyleBase: {
        width: 50,
        height: 70,
        fontSize: 40,
        borderWidth: 0,
        fontWeight: 'bold',
        borderBottomWidth: 4,
        color: '#FFFFFF'
    },
    underlineStyleHighLighted: {
        borderColor: '#159146',
    },
    countDownText: {
        fontSize: 14,
        fontFamily: "rubik",
        fontWeight: '400',
        color: "#FFFFFF",
        textAlign: 'center',
    },
    dongkerText: {
        fontSize: 14,
        fontFamily: "rubik",
        fontWeight: '400',
        color: "#283044",
        fontWeight: 'bold',
        textAlign: 'center',
    }
});

export default styles;