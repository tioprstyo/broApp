import { StyleSheet, Dimensions } from 'react-native';

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
    },
    pattern: {
        position: 'absolute',
        bottom: 0,
        zIndex: 0,
        opacity: 0.8
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
        marginBottom: 50
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: "rubik",
        color: "#FFFFFF",
        marginBottom: 10
    },
    descTitle: {
        fontSize: 14,
        fontWeight: '400',
        fontFamily: "rubik",
        color: "#FFFFFF",
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
        paddingHorizontal: 32
    },
    circleEmpty: {
        borderWidth: 1,
        borderColor: "#C4C4C4",
        backgroundColor: "#C4C4C4"
    },
    circleFilled: {
        backgroundColor: "#283044"
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
    actionPIN: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 32
    },
    RBSHeader: {
        paddingVertical: 10,
        marginTop: 20,
        paddingHorizontal: 20,
        alignContent: 'center',
        alignItems: 'center',
    },
    titleRBS: {
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: 'rubik',
        color: '#5CC3B9',
        textAlign: 'center',
        marginBottom: 20
    },
    descRBS: {
        fontSize: 14,
        fontFamily: 'rubik',
        color: '#757575',
        textAlign: 'center',
    },
    imgBottom: {
        width: 92,
        height: 92,
    },
    actionRBS: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 30
    },
    noButton: {
        width: '48%',
        paddingVertical: 13,
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 40,
        borderWidth: 1,
        borderColor: '#283044',
    },
    yesButton: {
        width: '48%',
        paddingVertical: 13,
        backgroundColor: '#283044',
        alignItems: 'center',
        borderRadius: 40,
        borderWidth: 1,
        borderColor: '#283044',
    },
    resetYes: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'rubik'
    },
    resetNo: {
        color: '#283044',
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'rubik'
    },
});

export default styles;