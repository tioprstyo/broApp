import React from 'react';
import {
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import styles from './style';
import { connect } from 'react-redux';

const HeaderIcon = ({ navigation, users }) => {
    return (
        <View style={styles.headerIcon}>
            <TouchableOpacity style={styles.buttonHistory} onPress={() => navigation.navigate('Transaction')}>
                <View style={styles.imgHistoryBody}>
                    <Image
                        style={styles.imgHistory}
                        source={require('../../assets/icon/history.png')}
                    />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonNotif} onPress={() => navigation.navigate('Notification')}>
                <View style={styles.imgNotifBody}>
                    {users.user && users.user.unreadNotificationsCount > 0 ?
                        <Image
                            style={styles.notifUnread}
                            source={require('../../assets/icon/notification.png')}
                        /> :
                        <Image
                            style={styles.notifRead}
                            source={require('../../assets/icon/notify.png')}
                        />
                    }
                </View>
            </TouchableOpacity>
        </View>
    );
}

const mapStateToProps = (state) => {
    return { users: state.user };
}
const mapDispatchToProps = (dispatch) => {
  return {
      onTodoClick: (user) => {
        dispatch({ type: 'SET_USER', input: user });
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderIcon);