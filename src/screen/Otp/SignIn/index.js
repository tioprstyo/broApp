import React from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
    BackHandler,
} from 'react-native';
import Toast, { BaseToast } from 'react-native-toast-message';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import env from '../../../config/env';
import styles from './style';
import { connect } from 'react-redux';

const toastConfig = {
    success: ({ props, ...rest }) => <BaseToast {...rest} />,

    my_custom_type: ({ props, ...rest }) => (
        <View
            style={{
                height: 40,
                width: '90%',
                backgroundColor: '#015E9F',
                justifyContent: 'center',
                paddingHorizontal: 15,
            }}>
            <Text style={{ color: '#FFFFFF', fontSize: 14, fontFamily: 'rubik' }}>
                {props.text1}
            </Text>
        </View>
    ),
};

class Otp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: require('../../../assets/img/backgroundPrimary.png'),
            logo: require('../../../assets/img/logoBroApp.png'),
            phoneNumber: '',
            error: '',
            countDown: 30,
            countCountDown: 30,
            otp: '',
            resend: 0,
            countDownDis: 60,
            tokenDevice: '',
            inputClear: false,
        };
    }

    backAction = () => {
        this.props.navigation.navigate('SignIn');
        return true;
    };

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            this.backAction,
        );
        this.loadData(0);
        this.getTokenDevice();
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    async getTokenDevice() {
        await AsyncStorage.getItem('deviceInfoKey')
            .then(auth => {
                this.setState({ tokenDevice: JSON.parse(auth).device_token });
            })
            .catch(err => {
                console.log(error);
            });
    }

    loadData = async val => {
        if (val > 2) {
            this.interval = setInterval(
                () =>
                    this.setState(prevState => ({
                        countDownDis: prevState.countDownDis - 1,
                    })),
                1000,
            );
        } else {
            this.interval = setInterval(
                () =>
                    this.setState(prevState => ({ countDown: prevState.countDown - 1 })),
                1000,
            );
        }

        await fetch(
            `${env}/otp-hints?phoneNumber=${this.props.users.phoneNumber.substring(
                1,
            )}&token=p723uxxUEhKcyU2w2UfY&localization=${this.props.users.localization
            }`,
        )
            .then(response => response.json())
            .then(json => {
                if (json.meta.code === 200) {
                    let data = this.props.users;
                    this.props.onTodoClick(data);
                } else {
                    Toast.show({
                        type: 'my_custom_type',
                        props: { text1: `Maaf Bro, terjadi kesalahan` },
                        position: 'bottom',
                    });
                }
            })
            .catch(error => {
                Toast.show({
                    type: 'my_custom_type',
                    props: { text1: `Maaf Bro, terjadi kesalahan` },
                    position: 'bottom',
                });
            });
    };

    resendOTP = () => {
        var count = this.state.countCountDown;
        this.setState({
            countCountDown: count * 2,
            countDown: count * 2,
            resend: this.state.resend + 1,
        });
        this.loadData(this.state.resend + 1);
    };

    componentDidUpdate() {
        if (this.state.resend < 3) {
            if (this.state.countDown === 0) {
                clearInterval(this.interval);
            }
        } else {
            if (this.state.countDownDis === 0) {
                clearInterval(this.interval);
                this.setState({ resend: 0, countDown: 0 });
            }
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    handleInputChange = numb => {
        if (numb.length === 0) {
            this.setState({
                error: 'Mobile number is required',
                phoneNumber: '',
            });
        } else if (/^\d+$/.test(numb)) {
            this.setState({
                phoneNumber: numb,
                error: '',
            });

            if (this.state.phoneNumber.length < 9) {
                this.setState({
                    error: 'At least input 9 digits mobile number',
                });
            }
        }
    };

    SignIn = async () => {
        let data = this.props.users;
        await fetch(`${env}/auth/employee/verify`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                requestToken: data.requestToken,
                otpCode: this.state.otp,
                otpMode: 'token',
            }),
        }).then(response => response.json())
            .then(json => {
                if (json.meta.code === 200) {
                    data.token = json.data.token;
                    data.exp = json.data.expires_in;
                    this.storeData(data);
                    this.props.onTodoClick(data);
                    this.registerDevice(data.token);
                } else {
                    if (json.meta.message === 'Resource not found') {
                        this.props.navigation.navigate('ErrorOTP');
                    } else {
                        this.setState({ otp: '', inputClear: true });
                        Toast.show({
                            type: 'my_custom_type',
                            props: { text1: 'Invalid OTP code' },
                            position: 'bottom',
                        });
                    }
                }
            })
            .catch(error => {
                this.setState({ otp: '', inputClear: true });
                Toast.show({
                    type: 'my_custom_type',
                    props: { text1: 'Maaf Bro, terjadi kesalahan' },
                    position: 'bottom',
                });
            });
    };

    registerDevice = async token => {
        let data = this.props.users;
        await fetch(`${env}/app/register-device`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${data.token}`,
            },
            body: JSON.stringify({
                deviceToken: this.state.tokenDevice,
            }),
        }).then(response => response.json())
            .then(json => {
                if (json.meta.code === 200) {
                    console.log('Your notification is actived!');
                } else {
                    console.log('Your cannot get notification in this app!');
                }
            })
            .catch(error => {
                Toast.show({
                    type: 'my_custom_type',
                    props: { text1: 'Maaf Bro, terjadi kesalahan' },
                    position: 'bottom',
                });
            });
        this.loadFlagLogin();
    };

    loadFlagLogin = async () => {
        let data = this.props.users;
        fetch(`${env}/app/dashboard`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${data.token}`,
            },
        })
            .then(response => response.json())
            .then(json => {
                if (json.meta && json.meta.firstTimeLogin === true) {
                    this.props.navigation.navigate('FisrtLogin');
                } else {
                    this.props.navigation.navigate('Home');
                }
            })
            .catch(error => {
                this.props.navigation.navigate('Home');
            });
    };

    storeData = async value => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('@auth', jsonValue);
        } catch (e) {
            // saving error
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={this.state.image} style={styles.background}>
                    <View style={styles.content}>
                        <View style={styles.header}>
                            <Image style={styles.logo} source={this.state.logo} />
                            <Text style={styles.title}>Verifikasi dulu ya</Text>
                            <Text style={styles.subtitle}>
                                Kode OTP sudah dikirim ke nomormu {this.props.users.phoneNumber}
                            </Text>
                        </View>

                        <View style={styles.otpForm}>
                            <OTPInputView
                                style={{ width: '100%', height: 100, fontSize: 18 }}
                                pinCount={6}
                                code={this.state.otp}
                                autoFocusOnLoad
                                clearInputs={this.state.inputClear}
                                codeInputFieldStyle={styles.underlineStyleBase}
                                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                                onCodeChanged={code => {
                                    this.setState({ otp: code });
                                    this.setState({ inputClear: false });
                                }}
                            />
                            {this.state.resend > 2 ? (
                                <View>
                                    <Text style={styles.countDownText}>
                                        You have requested to resend code for 3 times,
                                    </Text>
                                    <Text style={styles.countDownText}>
                                        please try again in{' '}
                                        <Text style={styles.dongkerText}>
                                            {this.state.countDownDis}
                                        </Text>{' '}
                                        minutes.
                                    </Text>
                                </View>
                            ) : (
                                <View>
                                    {this.state.countDown > 0 ? (
                                        <Text style={styles.countDownText}>
                                            Please tunggu{' '}
                                            <Text style={styles.dongkerText}>
                                                {this.state.countDown}
                                            </Text>{' '}
                                            detik untuk kirim ulang OTP
                                        </Text>
                                    ) : (
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                            }}>
                                            <Text style={styles.countDownText}>
                                                Ngga dapet kode OTP?
                                            </Text>
                                            <TouchableOpacity onPress={() => this.resendOTP()}>
                                                <Text style={styles.dongkerText}>KIRIM ULANG</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </View>
                            )}
                        </View>

                        <View style={styles.actionSign}>
                            <TouchableOpacity
                                style={
                                    this.state.resend < 3 ? styles.btnSignIn : styles.btnSignInDis
                                }
                                disabled={this.state.resend > 2}
                                onPress={this.SignIn}>
                                <Text
                                    style={{
                                        color: '#FFFFFF',
                                        textAlign: 'center',
                                        fontWeight: 'bold',
                                    }}>
                                    Masuk
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
                <Toast config={toastConfig} ref={ref => Toast.setRef(ref)} />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return { users: state.user };
};

const mapDispatchToProps = dispatch => {
    return {
        onTodoClick: user => {
            dispatch({ type: 'SET_USER', input: user });
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Otp);
