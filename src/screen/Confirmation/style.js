import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: '5%'
    },
    iconClose: {
        position: 'absolute',
        top: 20,
        right: 20,
        alignSelf: 'flex-end'
    },
    titlePage: {
        fontSize: 30,
        fontFamily: 'rubik',
        fontWeight: 'bold',
        color: '#5CC3B9',
        marginVertical: 30,
        textAlign: 'center'
    },
    descPage: {
        fontSize: 14,
        fontFamily: 'rubik',
        color: '#242A36',
        textAlign: 'center'
    }
});

export default styles;