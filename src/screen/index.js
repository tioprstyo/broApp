import React from 'react';
import { View, Text, Image } from 'react-native';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import Toast, { BaseToast } from 'react-native-toast-message';
import { connect } from 'react-redux';

const toastConfig = {
  success: ({ props, ...rest }) => (
    <BaseToast
        {...rest}
    />
  ),
  
  my_custom_type: ({ props, ...rest }) => (
    <View style={{ height: 40, width: '90%', backgroundColor: '#015E9F', justifyContent: 'center', paddingHorizontal: 15 }}>
      <Text style={{ color: '#FFFFFF', fontSize: 14, fontFamily: 'rubik' }}>{props.text1}</Text>
    </View>
  )
};


class Blank extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pattern: require('../assets/img/pattern-onboard1.png'),
            logo: require('../assets/img/logo-blue.png'),
            people: require('../assets/img/people1.png'),
            firstLoad: false,
        };
    }
    
    componentDidMount() {
        this.requestUserPermission();
        if (!this.state.firstLoad) {
            this.loadData();
        }
    }

    componentWillUnmount() {
        if (this.appStateSubscription) {
            this.appStateSubscription.remove();
        }
    }

    loadData() {
        this.setState({ firstLoad: true })
        setTimeout(() => {
            AsyncStorage.getItem('@onBoard')
            .then(onboard => {
                if (onboard) {
                AsyncStorage.getItem('@auth')
                    .then(auth => {
                        if (auth) {
                            this.props.navigation.push('Home')
                        } else {
                            this.props.navigation.navigate('SignIn')
                        }
                })
                .catch(err => {
                    return this.props.navigation.navigate('SignIn')
                });
            } else {
                return this.props.navigation.navigate('OnBoard')
            }
            })
            .catch(err => {});
        }, 1500);
    }

    getFcmToken = async () => {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
            console.log("Your Firebase Token is:", fcmToken);
            this._onChangeToken(fcmToken)
        } else {
            console.log("Failed", "No token received");
        }

        messaging().setBackgroundMessageHandler(async remoteMessage => {
            console.log('Push notification data is:', remoteMessage);

            let data = this.props.users;
            data.notice = true;
            this.props.onTodoClick(data);
        });
    }
    
    requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        if (enabled) {
            this.getFcmToken();
        }
    }

    _onChangeToken = (token) => {
        var data = {
            'device_token': token,
            'device_type': Platform.OS,
        };

        this._loadDeviceInfo(data);
    }

    _loadDeviceInfo = async (deviceData) => {
        var value = JSON.stringify(deviceData);
        try {
            await AsyncStorage.setItem('deviceInfoKey', value);
        } catch (error) {
            console.log(error);
        }
    }; 
    
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Image
                            style={styles.logo}
                            source={this.state.logo}
                        />
                        <Text style={styles.subtitle}>Mau Gajian Kapan Aja? BISA BRO!</Text>
                    </View>
                </View>
                <Image
                    style={styles.pattern}
                    source={this.state.pattern}
                />
                <Image
                    style={styles.patternPeople}
                    source={this.state.people}
                />
                <Toast config={toastConfig} style={{ zIndex: 100 }} ref={(ref) => Toast.setRef(ref)} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        position: 'relative',
        backgroundColor: '#FFFFFF',
    },
    pattern: {
        position: 'absolute',
        top: 300,
        zIndex: 0,
    },
    patternPeople: {
        position: 'absolute',
        bottom: 0,
        height: '60%',
        resizeMode: 'contain',
        zIndex: 0,
    },
    header: {
        alignItems: 'center',
        top: 30,
    },
    content: {
        zIndex: 100,
        flex: 1,
    },
    logo: {
        marginVertical: 20
    },
    subtitle: {
        fontSize: 30,
        fontFamily: "rubik",
        fontWeight: 'bold',
        color: "#283044",
        width: '80%',
        textAlign: 'center'
    },
});

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
export default connect(mapStateToProps, mapDispatchToProps)(Blank);