import { StyleSheet, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        alignItems: 'center',
        backgroundColor: '#54B2AA'
    },
    content: {
        backgroundColor: '#F9F9F9',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        width: windowWidth,
        paddingVertical: '5%'
    },
    summary: {
        flex: 1,
        borderBottomColor: '#D6D6D6',
        borderBottomWidth: 1,
        paddingBottom: 5,
        marginBottom: 20,
        marginHorizontal: '5%'
    },
    rekeningInfo: {
        flex: 1,
        paddingBottom: 5,
        marginBottom: 30,
        marginHorizontal: '5%'
    },
    titleSummary: {
        fontSize: 22,
        fontFamily: 'rubik',
        color: '#283044',
        fontWeight: 'bold',
        marginBottom: 10
    },
    descSummary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    textSummary: {
        fontSize: 14,
        color: '#828282',
        fontFamily: 'rubik',
    },
    textSummaryPrice: {
        fontSize: 14,
        color: '#828282',
        fontFamily: 'rubik',
    },
    endSummary: {
        fontSize: 14,
        color: '#828282',
        fontFamily: 'rubik',
        fontWeight: 'bold'
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
    list: {
        paddingBottom: '8%',
        width: windowWidth,
        backgroundColor: '#F9F9F9',
        alignItems: 'center',
    },
    RBSHeader: {
        alignContent: 'center',
        alignItems: 'center',
        paddingTop: 5,
    },
    imgBottom: {
        width: 37,
        height: 31,
        marginBottom: 20
    },
    RBSContent: {
        marginBottom: 10,
    },
    price: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'rubik',
        color: '#5CC3B9',
        textAlign: 'center',
        marginBottom: 15
    },
    descRBS: {
        fontSize: 14,
        fontFamily: 'rubik',
        color: '#757575',
        textAlign: 'center',
        marginBottom: 10
    },
    info: {
        fontSize: 14,
        fontFamily: 'rubik',
        color: '#757575',
        textAlign: 'center',
    },
    infoAction: {
        fontSize: 14,
        fontFamily: 'rubik',
        color: '#0099FF',
        textAlign: 'center',
        marginBottom: 30
    },
    sectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: '#b3b3b3',
        height: 50,
        borderRadius: 40,
    },
    placeholder: {
        color: '#DBDBDB'
    },
    button: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: '#b3b3b3',
        height: 50,
        borderRadius: 40,
    },
    formInputSignUp: {
        flex: 1,
        paddingLeft: 15,
        color: '#000000',
    },
    label: {
        fontSize: 12,
        fontFamily: "rubik",
        fontWeight: '400',
        color: "#6D7278",
        marginBottom: 8,
        marginLeft: 15,
    },
    labelCheckbox: {
        fontSize: 12,
        fontFamily: "rubik",
        fontWeight: '400',
        color: "#283044",
        marginTop: 7,
    },
    form: {
        marginBottom: 30,
        zIndex: 10,
        width: windowWidth,
        paddingHorizontal: '5%'
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
    fill: {
        fontFamily: 'rubik',
        color: '#6D7278',
        fontSize: 14
    },
    error: {
        fontSize: 12,
        color: '#f37a73',
        paddingLeft: 15,
        marginTop: 5,
    },
    bonus: {
        color: '#229E54',
        fontSize: 14,
        fontFamily: 'rubik',
        fontWeight: 'bold'
    }
});

export default styles;