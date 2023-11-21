import { StyleSheet, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        position: 'relative',
    },
    background: {
        flex: 1,
        height: windowHeight,
        backgroundColor: '#FFFFFF'
    },
    circlestop: {
        width: '100%',
        position: 'absolute',
        top: -70,
        height: 130,
        transform: [{ rotate: '180deg'}]
    },
    divCircle: {
        width: '100%',
        paddingHorizontal: 30,
        position: 'absolute',
        bottom: 0,
    },
    circlesbottom: {
        width: '100%',
        height: 60
    },
    content: {
        flex: 1,
        flexDirection: "column",
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainImg: {
        width: 200,
        height: 250,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: "rubik",
        color: "#5CC3BB",
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 12,
        fontFamily: "rubik",
        fontWeight: '400',
        textAlign: 'center',
        color: "#000000"
    },
    emailText: {
        fontSize: 16,
        fontFamily: "rubik",
        fontWeight: '400',
        textAlign: 'center',
        color: "#000000",
        marginVertical: 30,
    },
    reSendVerification: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: "rubik",
        color: "#5CC3BB",
        marginVertical: 10,
    },
    sectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: (windowWidth * 80)/ 100,
        backgroundColor: '#fff',
        borderWidth: 0,
        height: 50,
        borderRadius: 40,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 2,
    },
    formInputSignUp: {
        flex: 1,
        paddingHorizontal: 20,
        borderLeftWidth: 0.5,
        borderLeftColor: 'transparent',
        color: '#000000'
    },
    error: {
        fontSize: 12,
        color: '#E55155',
        paddingLeft: 5,
        marginTop: 5,
        fontFamily: 'rubik',
        marginBottom: 10
    },
    iconSent: {
        width: 40,
        height: 35,
    },
    iconSendGroup: { 
        backgroundColor: '#76C0BA', 
        padding: 8, 
        borderTopRightRadius: 40,
        borderBottomRightRadius: 40
    },
    RBSHeader: {
        paddingVertical: 5,
        marginTop: 10,
        paddingHorizontal: 20,
        alignContent: 'center',
        alignItems: 'center',
    },
    TitleRbs: {
        fontSize: 20,
        color: '#0F0F0F',
        fontWeight: '500'
    },
    btnRbs: {
        backgroundColor: '#5CC3B9',
        padding: 10,
        marginTop: 20,
        borderRadius: 20,
        width: '40%',
    },
    textStyle: {
        fontSize: 14,
        color: '#FFFFFF',
        fontFamily: 'rubik',
        fontWeight: 'bold',
        textAlign: 'center'
    },
});

export default styles;