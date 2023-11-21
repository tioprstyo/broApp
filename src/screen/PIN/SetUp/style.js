import { StyleSheet, Dimensions } from 'react-native';

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
        opacity: 0.4
    },
    header: {
        alignItems: 'center',
        top: 30,
        marginBottom: 20
    },
    content: {
        zIndex: 20,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingTop: 50,
        backgroundColor: '#f9f9f9',
        position: 'absolute',
        bottom: 0,
        top: 140
    },
    logo: {
        marginBottom: 50
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: "rubik",
        color: "#283044",
        marginBottom: 10
    },
    descTitle: {
        fontSize: 14,
        fontWeight: '400',
        fontFamily: "rubik",
        color: "#283044",
        marginBottom: 10,
        textAlign: 'center'
    },
    otpForm: {
        justifyContent: 'center',
        alignContent: 'center',
        paddingHorizontal: 10,
        marginBottom: 50
    },
    OtpContainer: {
        display: "flex",
        width: "100%",
        height: 100,
        justifyContent: "center"
    },
    circles: {
        paddingHorizontal: 32,
    },
    circleEmpty: {
        borderWidth: 1,
        borderColor: "#C4C4C4",
        backgroundColor: "#C4C4C4",
        width: 12,
        height: 12
    },
    circleFilled: {
        backgroundColor: "#283044",
        width: 12,
        height: 12
    },
    bottomLine: {
        borderWidth: 1,
        borderColor: '#FFFFFF',
        marginHorizontal: 32,
        marginBottom: 10
    },
    textStyle: {
        fontSize: 14,
        color: '#283044',
        fontFamily: 'rubik',
        fontWeight: 'bold'
    },
    actionPIN: {
        alignContent: 'center',
        paddingHorizontal: 32,
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
    ImageBackground: {
        width: '100%',
        height: 140,
    },
    headerIconLeft: {
        paddingVertical: 30,
        flexDirection: 'row',
        width: 100,
        marginRight: 10,
    },
    titleHeader: {
        color: '#ffffff',
        fontSize: 20,
        marginLeft: 20,
        fontWeight: '700',
    },
    headerIcon: {
        paddingVertical: 30,
        flexDirection: 'row',
        width: 100,
        marginRight: 10,
        marginLeft: 'auto',
    },
});

export default styles;