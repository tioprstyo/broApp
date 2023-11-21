import { StyleSheet, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        alignItems: 'center',
        backgroundColor: '#54B2AA'
    },
    list: {
        paddingTop: 20,
        width: windowWidth,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: '#F9F9F9',
        paddingHorizontal: '5%',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        top: 140,
    },
    boxHistory: {
        width: '100%',
        padding: '4%',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 1,
        marginBottom: 20,
    },
    boxHistoryUnread: {
        width: '100%',
        padding: '4%',
        backgroundColor: '#DEECFE',
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 1,
        marginBottom: 20,
    },
    historyCard: {
        width: '100%',
        flexDirection: 'row',
        alignContent: 'center',
        position: 'relative',
    },
    iconHistory: {
        width: 27,
        height: 23,
        resizeMode: 'contain',
        alignItems: 'center',
        marginRight: 20,
    },
    historyDesc: {
        fontFamily: 'rubik',
        fontSize: 14,
        marginBottom: 5,
        color: '#283044',
        fontWeight: 'bold'
    },
    textSummary: {
        fontSize: 12,
        color: '#828282',
        fontFamily: 'rubik',
        marginBottom: 5,
    },
    nullList: {
        marginTop: 80
    },
    textNullList: {
        fontFamily: 'rubik',
        fontWeight: 'bold',
        fontSize: 20,
        color: '#5CC3B9',
        alignSelf: 'center',
        marginBottom: 20
    },
    imgNullList: {
        alignSelf: 'center',
        marginBottom: 20
    },
    textDescNull: {
        fontFamily: 'rubik',
        fontSize: 14,
        color: '#757575',
        alignSelf: 'center',
        textAlign: 'center'
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