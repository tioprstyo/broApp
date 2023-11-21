import { StyleSheet, Dimensions } from 'react-native';
const windowHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        position: 'relative',
        backgroundColor: '#54B2AA'
    },
    background: {
        flex: 1,
        resizeMode: "cover",
        padding: 20,
    },
    pattern: {
        position: 'absolute',
        bottom: 0,
        zIndex: 0,
        opacity: 0.5
    },
    header: {
        alignItems: 'center',
        top: 30,
        marginBottom: 20
    },
    headerIconLeft: {
        paddingVertical: 30,
        flexDirection: 'row',
        width: 100,
        marginRight: 10,
    },
    headerIcon: {
        paddingVertical: 30,
        flexDirection: 'row',
        width: 100,
        marginRight: 10,
        marginLeft: 'auto',
    },
    titleHeader: {
        color: '#ffffff',
        fontSize: 20,
        marginLeft: 20,
        fontWeight: '700',
    },
    content: {
        zIndex: 1,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingTop: 50,
        marginTop: 30,
        paddingHorizontal: '5%',
        backgroundColor: '#F9F9F9',
        position: 'absolute',
        bottom: 0,
        top: 110
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        fontFamily: "rubik",
        color: "#283044",
        marginBottom: 10
    },
    subtitle: {
        fontSize: 14,
        fontFamily: "rubik",
        fontWeight: '400',
        color: "#283044"
    },
    label: {
        fontSize: 12,
        fontFamily: "rubik",
        fontWeight: '400',
        color: "#283044",
        marginBottom: 8,
        marginLeft: 15,
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
    ImageBackground: {
        width: '100%',
        height: 140,
    },
    underlineStyleBase: {
        width: 50,
        height: 70,
        fontSize: 40,
        borderWidth: 0,
        fontWeight: 'bold',
        borderBottomWidth: 4,
        color: '#283044'
    },
    underlineStyleHighLighted: {
        borderColor: '#283044',
    },
    countDownText: {
        fontSize: 14,
        fontFamily: "rubik",
        fontWeight: '400',
        color: "#283044",
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