import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    headerIcon: {
        flexDirection: 'row',
        width: 100,
        marginRight: 10,
    },
    buttonHistory: {
        textAlign: 'center',
        marginRight: 25
    },
    imgHistoryBody: {
        flexDirection: 'row',
        width: 28,
        height: 28
    },
    imgHistory: {
        width: 28,
        height: 24
    },
    buttonNotif: {
        textAlign: 'center'
    },
    imgNotifBody: {
        flexDirection: 'row',
        width: 28,
        height: 28,
        marginTop: -2
    },
    notifUnread: {
        width: 31,
        height: 29
    },
    notifRead: {
        width: 25,
        height: 29
    }
});

export default styles;