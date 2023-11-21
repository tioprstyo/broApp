import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import React from 'react';
import { BackHandler, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
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

GoogleSignin.configure({
    scopes: ['email'],
    webClientId: '531733313993-abegsg4hld7slfqukkc15r6hc14rm9it.apps.googleusercontent.com',
});


class SelfSignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: require('../../../assets/img/backgroundPrimary.png'),
            logo: require('../../../assets/img/logo-blue.png'),
            circle: require('../../../assets/img/CIRCLE.png'),
            email: '',
            error: '',
        };
    }

    backAction = () => {
        this.props.navigation.navigate('SignIn');
        return true;
    };

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    handleInputEmail = (email) => {
        this.setState({ email, error: '' });
        const reEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if (!reEmail.test(this.state.email)) {
            this.setState({
                error: 'Format email tidak sesuai'
            });
        }
    }

    onVerification = async () => {
        if (this.state.email) {
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
                        this.props.navigation.navigate('EmailVerification', { token: json.data.registration_token, email: this.state.email });
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
            } else {
                this.setState({ error: 'Masukkan email kamu' });
            }
    }

    signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            this.setState({ email: userInfo.user.email });
            this.onVerification();
        } catch (error) {
            console.log(error)
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.background}>
                    <View style={styles.content}>
                        <View style={styles.header}>
                            <Image
                                style={styles.logo}
                                source={this.state.logo}
                            />
                            <Text style={styles.title}> Email Kerja</Text>
                            <Text style={styles.subtitle}>Masukan email kerja kamu</Text>
                        </View>

                        <View style={{ alignSelf: 'center' }}>
                            <View style={styles.sectionStyle}>
                                <TextInput
                                    style={styles.formInputSignIn}
                                    underlineColorAndroid="transparent"
                                    value={this.state.email}
                                    onChangeText={this.handleInputEmail}
                                />
                            </View>
                            <Text style={styles.error}>{this.state.error}</Text>
                        </View>

                        <Text style={styles.Selection}>Atau</Text>

                        <View style={{ marginVertical: 25, alignSelf: 'center' }}>
                            <GoogleSigninButton
                                style={{ width: 250, height: 60, shadowColor: 'red' }}
                                size={GoogleSigninButton.Size.Wide}
                                color={GoogleSigninButton.Color.Light}
                                onPress={this.signIn}
                                disabled={this.state.isSigninInProgress}
                            />
                        </View>

                        <View style={styles.actionSign}>
                            <TouchableOpacity style={styles.btnSignIn} onPress={this.onVerification}>
                                <Text style={{ color: '#FFFFFF', textAlign: 'center', fontWeight: 'bold', }}>Lanjut</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
                <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTodoClick: (user) => {
            dispatch({ type: 'SET_USER', input: user });
        }
    }
}
const mapStateToProps = (state) => {
    return { users: state.user };
}
export default connect(mapStateToProps, mapDispatchToProps)(SelfSignUp);