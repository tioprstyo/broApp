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
        backgroundColor: '#FFFFFF',
        paddingHorizontal: '5%',
    },
    logo: {
        width: (70 * windowWidth)/100,
        height: (50 * windowWidth)/100,
        marginBottom: 20
    },
    content: {
        flex: 1,
        width: '100%',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: "rubik",
        color: "#5CC3B9",
        marginBottom: 5
    },
    subtitle: {
        fontSize: 14,
        fontFamily: "rubik",
        fontWeight: '400',
        textAlign: 'center',
        color: "#000000"
    },
    actionStart: {
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 30
    },
    btnStart: {
        backgroundColor: '#5CC3B9',
        width: '70%',
        borderRadius: 10,
        paddingVertical: 10,
        marginBottom: 10,
    },
    textButton: {
        color: '#FFFFFF', 
        textAlign: 'center', 
        fontWeight: 'bold', 
        fontSize: 16
    },
    descGreetings: {
        fontSize: 13,
        fontFamily: "rubik",
        fontWeight: '400',
        textAlign: 'center',
        color: "#8F8F8F"
    },
    flag: {
        width: 20,
        height: 15,
        marginTop: 3,
        marginRight: 5,
    }
});

export default styles;