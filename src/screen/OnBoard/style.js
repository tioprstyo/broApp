import { StyleSheet, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative'
    },
    images: {
        width: windowWidth,
        height: 550,
        bottom: 0,
        position: 'absolute',
    },
    background: {
        width: '100%',
        height: '100%',
        bottom: -150,
        position: 'absolute',
    },
    header: {
        alignItems: 'center',
        top: 30,
        marginBottom: 70,
    },
    logo: {
        marginBottom: 20
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        fontFamily: "rubik",
        color: "#FFFFFF",
        marginBottom: 15
    },
    actionOnboard: {
        position: 'absolute',
        top: windowHeight - 70,
        paddingHorizontal: 30,
        width: windowWidth,
    },
    slideAction1: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    styleAction3: {
        flex: 1,
        alignItems: 'center',
        zIndex: 500,
    },
    rightButton: {
        backgroundColor: '#293044',
        paddingHorizontal: 18,
        paddingVertical: 4,
        borderRadius: 5,
    },
    textButtonSkip: {
        fontSize: 14,
        fontFamily: 'rubik',
        color: '#293044'
    },
    textButtonNext: {
        fontSize: 14,
        fontFamily: 'rubik',
        color: '#FFFFFF'
    },
    endButton: {
        backgroundColor: '#293044',
        paddingHorizontal: 18,
        paddingVertical: 4,
        borderRadius: 5,
        alignItems: 'center',
    },
    dot: {
        width: 13,
        height: 13,
        borderRadius: 50,
        marginRight: 10,
        zIndex: 0,
    },
    activeDot: {
        width: 15,
        height: 15,
        borderRadius: 50,
        marginRight: 10
    },
    buttonControl: {
        top: windowHeight - 83,
        alignItems: 'baseline', 
        paddingHorizontal: 30,
    }
});

export default styles;