import { StyleSheet, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        position: 'relative',
        backgroundColor: '#54B2AA',
    },
    ImageBackground: {
        width: '100%',
        height: 140,
    },
    headers: {
        flex: 1,
        flexDirection: 'row',
    },
    headerIcon: {
        flex: 1,
        paddingVertical: 30,
        flexDirection: 'row',
        width: 100,
        marginRight: 10,
        alignSelf: 'flex-end',
    },
    header: {
        paddingBottom: 25,
        paddingHorizontal: 20
    },
    titleHeader: {
        fontSize: 25,
        color: '#FFFFFF',
        fontFamily: 'rubik',
        fontWeight: 'bold',
    },
    subTitleHeader: {
        fontSize: 14,
        color: '#FFFFFF',
        fontFamily: 'rubik',
        fontWeight: 'bold'
    },
    cardHome: {
        backgroundColor: '#F9F9F9',
        width: windowWidth,
        justifyContent: 'space-between',
        bottom: 0,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingTop: 30,
        paddingBottom: 70,
        paddingHorizontal: '5%'
    },
    formInputSignIn: {
        borderWidth: 1,
        borderColor: '#283044',
        color: '#000000',
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: '5%',
        color: '#283044',
        fontSize: 18,
        borderRadius: 40,
        alignItems: 'center',
        textAlign: 'center'
    },
    error: {
        fontSize: 12,
        color: '#f37a73',
        paddingLeft: '5%',
        marginTop: 5,
        marginBottom: 20,
    },
    boxContent: {
        width: '60%',
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
        elevation: 3,
    },
    titleBox: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        color: '#757575',
        fontSize: 13,
    },
    iconInfo: {
        marginTop: 5,
        width: 12,
        height: 12
    },
    nominal: {
        borderBottomColor: '#D5D5D5',
        borderBottomWidth: 1,
    },
    price: {
        fontSize: 18,
        color: '#5CC3B9',
        fontFamily: 'rubik',
        fontWeight: 'bold',
        paddingBottom: 5,
        paddingTop: 5,
    },
    toHidden: {
        textAlign: 'center',
        color: '#0099FF',
        fontSize: 11,
        fontFamily: 'rubik',
        paddingVertical: 5,
    },
    date: {
        fontSize: 10,
        color: '#757575',
        fontFamily: 'rubik',
        paddingVertical: 5,
    },
    titleSummary: {
        fontSize: 22,
        fontFamily: 'rubik',
        color: '#283044',
        fontWeight: 'bold',
        marginBottom: 30
    },
    descSummary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    textSummary: {
        fontSize: 12,
        color: '#828282',
        fontFamily: 'rubik',
        marginBottom: 5,
    },
    textSummaryPrice: {
        fontSize: 12,
        color: '#828282',
        fontFamily: 'rubik',
        fontWeight: 'bold'
    },
    endSummary: {
        fontSize: 14,
        color: '#828282',
        fontFamily: 'rubik',
        fontWeight: 'bold'
    },
    priceEndSummary: {
        fontSize: 22,
        color: '#5CC3B9',
        fontFamily: 'rubik',
        fontWeight: 'bold'
    },
    widthrawButton: {
        width: '48%',
        paddingVertical: 13,
        backgroundColor: '#283044',
        alignItems: 'center',
        borderRadius: 40,
        borderWidth: 1,
        borderColor: '#283044',
    },
    widthrawButtonDis: {
        width: '48%',
        paddingVertical: 13,
        backgroundColor: '#BEBEBE',
        alignItems: 'center',
        borderRadius: 40,
        borderWidth: 1,
        borderColor: '#BEBEBE',
    },
    widthraw: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'rubik'
    },
    transfer: {
        color: '#283044',
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'rubik'
    },
    transferDis: {
        color: '#BEBEBE',
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'rubik'
    },
    transferButton: {
        width: '48%',
        paddingVertical: 13,
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 40,
        borderWidth: 1,
        borderColor: '#283044',
    },
    transferButtonDis: {
        width: '48%',
        paddingVertical: 13,
        alignItems: 'center',
        backgroundColor: '#F9F9F9',
        borderRadius: 40,
        borderWidth: 1,
        borderColor: '#BEBEBE',
    },
    titleProgress: {
        color: '#283044',
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: 'rubik',
        marginBottom: 10
    },
    textDescProgress: {
        color: '#283044',
        fontSize: 12,
        fontFamily: 'rubik'
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
        elevation: 3,
        marginTop: 20
    },
    historyCard: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 10,
        alignContent: 'center'
    },
    iconHistory: {
        width: 27,
        height: 23,
        alignItems: 'center',
        marginRight: 20
    },
    historyDesc: {
        fontFamily: 'rubik',
        fontSize: 16,
        color: '#283044',
        fontWeight: 'bold'
    },
    statusPending: {
        fontFamily: 'rubik',
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FFCD34'
    },
    statusApprove: {
        fontFamily: 'rubik',
        fontSize: 12,
        fontWeight: 'bold',
        color: '#229E54'
    },
    statusReject: {
        fontFamily: 'rubik',
        fontSize: 12,
        fontWeight: 'bold',
        color: '#E55155'
    },
    hiddenShow: {
        color: '#D5D5D5',
        fontSize: 16,
        fontFamily: 'rubik',
        fontWeight: 'bold',
        paddingBottom: 10,
        paddingTop: 5,
        marginRight: 10
    },
    allTransaction: {
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: 'rubik',
        color: '#5CC3B9'
    },
    RBSHeader: {
        paddingVertical: 10,
        marginTop: 20,
        paddingHorizontal: 20,
        alignContent: 'center',
        alignItems: 'center',
    },
    imgBottom: {
        width: 37,
        height: 31,
        marginBottom: 20
    },
    RBSContent: {
        alignContent: 'center',
        paddingHorizontal: '5%',
        marginBottom: 40,
    },
    titleRBS: {
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: 'rubik',
        color: '#283044',
        textAlign: 'center',
        marginBottom: 20
    },
    descRBS: {
        fontSize: 14,
        fontFamily: 'rubik',
        color: '#757575',
        textAlign: 'center',
    },
    actionRBS: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    loading: {
        flex: 1,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        zIndex: 50
    },
    overlay: {
        flex: 1,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        left: 0,
        top: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        width: windowWidth,
        height: windowHeight
    },
    circle: {
        borderColor: '#5CC3B9',
        borderWidth: 6,
        width: 108,
        height: 108,
        borderRadius: 100,
        justifyContent: 'center',
        alignContent: 'center',
    },
    DaysTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: -10
    },
    DaysSub: {
        fontSize: 14,
        textAlign: 'center'
    },
    bonus: {
        fontSize: 12,
        color: '#5CC3B9',
        fontFamily: 'Roboto',
        textAlign: 'center'
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        paddingHorizontal: 20
    },
    buttonClose: {
        backgroundColor: "#283044",
    },
    textStyle: {
        color: "white",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 20,
        textAlign: "center",
        fontFamily: 'rubik',
        fontWeight: 'bold',
        color: '#283044',
        fontSize: 16,
    },
    modalDesc: {
        marginBottom: 20,
        textAlign: "center",
        fontFamily: 'rubik',
        color: '#283044',
        fontSize: 14,
    },
    iconModal: {
        width: 50,
        height: 50,
        marginBottom: 30
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(20, 20, 20, 0.5)',
    },
    positionClose: {
        position: 'absolute',
        right: 20,
        top: 20,
    },
    iconClose: {
        width: 15,
        height: 15,
    },
    pullContainer: {
        marginBottom: 20,
    },
    pullIcon: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        width: 47,
        height: 47,
        backgroundColor: '#fff',
        borderRadius: 40,
        marginTop: -50,
        marginBottom: 10,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pullText: {
        textAlign: 'center',
        color: '#757575',
        fontSize: 12,
    }
});

export default styles;