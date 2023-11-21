import React from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
} from 'react-native';
import HeaderIcon from './../../../components/HeaderIcon';
import Toast, { BaseToast } from 'react-native-toast-message';
import OTPInputView from '@twotalltotems/react-native-otp-input';
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
                zIndex: 2,
            }}>
            <Text style={{ color: '#FFFFFF', fontSize: 14, fontFamily: 'Rubik' }}>
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
            pattern: require('../../../assets/img/patternLogin.png'),
            logo: require('../../../assets/img/logoBroApp.png'),
            imageLeft: require('../../../assets/img/headerLeft.png'),
            phoneNumber: '',
            error: '',
            countDown: 30,
            countCountDown: 30,
            otp: '',
            resend: 0,
            countDownDis: 60,
            inputClear: false,
        };
    }

    componentDidMount() {
        this.loadData(0);
    }

    // onSignIn = async () => {
    //     await fetch(`${env}/auth/employee/login`, {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             phoneNumber: this.props.users.phoneNumber.substring(1),
    //         }),
    //     })
    //         .then(response => response.json())
    //         .then(json => {
    //             if (json.meta.code === 200) {
    //                 let data = this.props.users;
    //                 data.requestToken = json.data.requestToken;
    //                 this.loadData(0);
    //             } else {
    //                 Toast.show({
    //                     type: 'my_custom_type',
    //                     props: { text1: 'Nomor ponsel belum terdaftar' },
    //                     position: 'bottom',
    //                 });
    //             }
    //         })
    //         .catch(error => {
    //             Toast.show({
    //                 type: 'my_custom_type',
    //                 props: { text1: 'Maaf Bro, terjadi kesalahan' },
    //                 position: 'bottom',
    //             });
    //         });
    // };

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
                        props: { text1: 'Maaf Bro, terjadi kesalahan' },
                        position: 'bottom',
                    });
                }
            })
            .catch(error => {
                Toast.show({
                    type: 'my_custom_type',
                    props: { text1: 'Maaf Bro, terjadi kesalahan' },
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

    Verif = async () => {
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
                otpMode: 'validation',
            }),
        })
            .then(response => response.json())
            .then(json => {
                if (json.meta.code === 200) {
                    fetch(`${env}/app/dashboard/request`, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${data.token}`,
                        },
                        body: JSON.stringify(data.request),
                    })
                        .then(response => response.json())
                        .then(json => {
                            if (json.meta.code === 200) {
                                this.props.navigation.navigate('RequestSuccess');
                            } else {
                                this.props.navigation.navigate('RequestFailed');
                            }
                        })
                        .catch(error => {
                            Toast.show({
                                type: 'my_custom_type',
                                props: { text1: 'Maaf Bro, terjadi kesalahan' },
                                position: 'bottom',
                            });
                        });
                } else {
                    this.setState({ otp: '', inputClear: true });
                    Toast.show({
                        type: 'my_custom_type',
                        props: { text1: 'OTP tidak valid' },
                        position: 'bottom',
                    });
                }
            })
            .catch(error => {
                this.setState({ otp: '', inputClear: true });
                Toast.show({
                    type: 'my_custom_type',
                    props: { text1: 'OTP tidak valid' },
                    position: 'bottom',
                });
            });
    };

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={this.state.imageLeft}
                    style={styles.ImageBackground}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.headerIconLeft}>
                            <TouchableOpacity
                                style={{ textAlign: 'center', marginLeft: 20 }}
                                onPress={() => this.props.navigation.navigate('Home')}>
                                <View style={{ flexDirection: 'row', width: 28, height: 28 }}>
                                    <Image
                                        style={{ width: 25, height: 12 }}
                                        source={require('../../../assets/icon/backArrow.png')}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.headerIcon}>
                            <HeaderIcon navigation={this.props.navigation} />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.titleHeader}>Verifikasi OTP</Text>
                    </View>
                </ImageBackground>
                <View style={styles.content}>
                    <View style={styles.header}>
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
                            onPress={this.Verif}>
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
                <Toast
                    style={{ zIndex: 10 }}
                    config={toastConfig}
                    ref={ref => Toast.setRef(ref)}
                />
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
