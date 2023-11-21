import { StyleSheet, Dimensions } from 'react-native';
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    ImageBackground: {
        width: '100%',
        height: windowHeight,
    },
    content: {
        flex: 1,
        flexDirection: "column",
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
        marginTop: 100,
    },
    title: {
        fontSize: 25,
        color: '#000000',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 14,
        fontFamily: "rubik",
        fontWeight: '400',
        textAlign: 'center',
        color: "#000000",
        fontWeight: '500',
    },
    progressDesc: {
        fontSize: 10,
        fontFamily: "rubik",
        fontWeight: '400',
        textAlign: 'center',
        color: "#B5B5B5",
        fontWeight: '500',
        marginBottom: 50,
    },
    registCompany: {
        fontSize: 14,
        fontFamily: "rubik",
        fontWeight: '400',
        textAlign: 'center',
        color: "#000000",
        fontWeight: '500',
        textDecorationLine: 'underline'
    },
    timer: {
        fontSize: 18,
        color: '#6A6A6A',
        marginTop: -33,
        marginBottom: 15,
        fontWeight: 'bold'
    }
});

export default styles;