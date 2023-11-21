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
        padding: 20,
        height: windowHeight,
        backgroundColor: '#FFFFFF'
    },
    header: {
        alignItems: 'center',
        top: 30,
        marginBottom: 70
    },
    content: {
        zIndex: 100
    },
    logo: {
        marginBottom: 70
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: "rubik",
        color: "#5CC3B9",
        marginBottom: 5
    },
    subtitle: {
        fontSize: 14,
        fontFamily: "rubik",
        fontWeight: '400',
        width: '60%',
        textAlign: 'center',
        color: "#2A2A2A"
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
        borderWidth: 0,
        width: 250,
        height: 50,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 2,
    },
    numbCode: {
        padding: 5,
        margin: 5,
        alignItems: 'center',
        color: '#000000',
    },
    formInputSignIn: {
        flex: 1,
        paddingHorizontal: 20,
        borderLeftWidth: 0.5,
        borderLeftColor: 'transparent',
        color: '#000000',
        
    },
    actionSign: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnSignIn: {
        backgroundColor: '#5CC3B9',
        width: '70%',
        borderRadius: 10,
        paddingVertical: 10,
        marginBottom: 15,
    },
    btnSignUp: {
        width: '50%',
        borderRadius: 40,
        paddingVertical: 10,
        borderWidth: 1,
        borderLeftColor: '#5CC3B9',
        borderColor: '#5CC3B9',
    },
    toas: {
        backgroundColor: 'red'
    },
    error: {
        fontSize: 12,
        color: '#E55155',
        paddingLeft: 5,
        marginTop: 5,
        marginBottom: 15,
        fontWeight: 'bold',
        fontFamily: 'rubik'
    },
    circles: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        height: 130
    },
    registCompany: {
        fontSize: 12,
        marginTop: 10,
    },
    Selection: {
        textAlign: 'center',
    }
});

export default styles;