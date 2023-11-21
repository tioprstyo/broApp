import { StyleSheet, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
    },
    content: {
        width: '100%',
        paddingRight: '5%',
    },
    formContact: {
        backgroundColor: '#F2F1F6',
        borderRadius: 40,
        marginRight: 10,
        paddingHorizontal: 20,
    },
    abjad: {
        marginTop: 5,
        paddingHorizontal: 10,
        fontSize: 12,
    },
    list: {
        padding: 10,
    },
    title: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#878B95',
        backgroundColor: '#F2F1F6',
        marginVertical: 20,
        borderRadius: 40
    },
    title2: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#F2F1F6',
        marginBottom: 3,
        borderRadius: 10,
        flexDirection: 'row',
    },
    title2first: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#F2F1F6',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        marginBottom: 3,
        flexDirection: 'row',
    },
    title2last: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#F2F1F6',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        marginBottom: 3,
        flexDirection: 'row',
    },
    avatar: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
        borderRadius: 40,
        backgroundColor: '#878B95',
        justifyContent: 'center',
        alignContent: 'center'
    },
    textAva: {
        color: '#ffffff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 12
    },
    overlay: {
        flex: 1,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        left: 0,
        top: 0,
        width: windowWidth,
        height: windowHeight
    }
});

export default styles;