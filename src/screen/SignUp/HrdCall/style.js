import { StyleSheet, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        position: 'relative',
        width: windowWidth,
    },
    background: {
        flex: 1,
        resizeMode: "cover",
        paddingHorizontal: 20,
        paddingVertical: '10%',
        height: windowHeight
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
        marginBottom: 50
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: "rubik",
        color: "#76C0BA",
        marginBottom: 15,
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 14,
        fontFamily: "rubik",
        fontWeight: '400',
        color: "#000000",
        textAlign: 'center'
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
    numbCode: {
        padding: 5,
        margin: 5,
        alignItems: 'center',
        color: '#000000',
    },
    formInputSignUp: {
        flex: 1,
        paddingHorizontal: 20,
        borderLeftWidth: 0,
        color: '#000000',
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
    toas: {
        backgroundColor: 'red'
    },
    error: {
        fontSize: 12,
        color: '#f37a73',
        paddingLeft: 15,
        marginTop: 5
    }
});

export default styles;