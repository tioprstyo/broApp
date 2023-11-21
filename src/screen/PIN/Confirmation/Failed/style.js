import { StyleSheet, Dimensions } from 'react-native';
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#5CC3B9',
    },
    content: {
        backgroundColor: '#fff',
        paddingTop: 100,
        alignItems: 'center',
        paddingHorizontal: '5%',
        height: windowHeight - 110,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    titlePage: {
        fontSize: 30,
        fontFamily: 'rubik',
        fontWeight: 'bold',
        color: '#5CC3B9',
        marginVertical: 30
    },
    descPage: {
        fontSize: 14,
        fontFamily: 'rubik',
        color: '#757575',
        textAlign: 'center',
        paddingHorizontal: '5%'
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
    actionClose: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        width: '100%',
    },
    btnClose: {
        backgroundColor: '#fff',
        borderColor: '#283044',
        borderWidth: 1,
        width: '50%',
        borderRadius: 40,
        paddingVertical: 10,
        marginBottom: 15,
    },
});

export default styles;