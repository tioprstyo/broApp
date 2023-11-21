import React from 'react';
import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View, BackHandler } from 'react-native';
import Toast, { BaseToast } from 'react-native-toast-message';
import { connect } from 'react-redux';
import env from '../../../config/env';
import styles from './style';

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


class EmailVerificatoin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            circle: require('../../../assets/img/CIRCLE.png'),
            circlered: require('../../../assets/img/circlered.png'),
            verifIcon: require('../../../assets/img/verifEmail.png'),
            token: '',
            email: '',
            code: '',
            error: ''
        };
    }

    backAction = () => {
        this.props.navigation.navigate('SelfSignUp');
        return true;
    };

    componentDidMount() {
        if (this.props.navigation.state.params) {
            const { token, email } = this.props.navigation.state.params;
            this.setState({ token, email });
        }
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    handleInputChange = (code) => {
        this.setState({ code })
    }

    onVerify = async () => {
        await fetch(`${env}/auth/employee/register/verify`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "registration_token": this.state.token,
                "verification_code": this.state.code
            })
        }).then((response) => response.json())
            .then((json) => {
                if (json?.meta?.code === 200) {
                    this.props.navigation.navigate('SignUpNotification', { params: 'success' });
                } else if (json?.meta?.code === 406) {
                    this.props.navigation.navigate('SignUpNotification', { params: 'error' });
                } else {
                    Toast.show({
                        type: 'my_custom_type',
                        props: { text1: json.meta.message },
                        position: 'bottom',
                    });
                }
            })
            .catch((error) => {
                Toast.show({
                    type: 'my_custom_type',
                    props: { text1: 'Maaf Bro, terjadi kesalahan' },
                    position: 'bottom',
                });
            });
    }

    reSendEmailVerification = async () => {
        await fetch(`${env}/auth/employee/register`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": this.state.email,
            })
        }).then((response) => response.json())
            .then((json) => {
                if (json.meta.code === 200) {
                    this.setState({
                        token: json.data.registration_token
                    })
                } else {
                    Toast.show({
                        type: 'my_custom_type',
                        props: { text1: json.meta.message },
                        position: 'bottom',
                    });
                }
            })
            .catch((error) => {
                Toast.show({
                    type: 'my_custom_type',
                    props: { text1: 'Maaf Bro, terjadi kesalahan' },
                    position: 'bottom',
                });
            });
    }

    
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.background}>
                    <View style={styles.content}>
                        <Image
                            source={this.state.verifIcon}
                            style={styles.mainImg}
                        />
                        <Text style={styles.title}>Verifikasi Email</Text>
                        <Text style={styles.subtitle}>Untuk melanjutkan, input kode verifikasi yang sudah</Text>
                        <Text style={styles.subtitle}>Bro kirim ke email kamu</Text>

                        <Text style={styles.emailText}>{this.state.email}</Text>

                        <View>
                            <View style={styles.sectionStyle}>
                                <TextInput
                                    style={styles.formInputSignUp}
                                    underlineColorAndroid="transparent"
                                    keyboardType="numeric"
                                    value={this.state.phoneNumber}
                                    onChangeText={this.handleInputChange}
                                />
                                <TouchableOpacity
                                    style={styles.iconSendGroup}
                                    activeOpacity={1}
                                    onPress={this.onVerify}
                                >
                                    <Image
                                        style={styles.iconSent}
                                        source={require('../../../assets/img/sent.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                            <Text style={this.state.error ? styles.error: ''}>{this.state.error}</Text>
                        </View>
                        <TouchableOpacity onPress={this.reSendEmailVerification}>
                            <Text style={styles.reSendVerification}>Kirim ulang code</Text>
                        </TouchableOpacity>
                        
                    </View>
                </View>
                <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
            </SafeAreaView>
        );
    }
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
export default connect(mapStateToProps, mapDispatchToProps)(EmailVerificatoin);