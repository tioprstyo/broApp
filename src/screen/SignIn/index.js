import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, BackHandler, KeyboardAvoidingView, ScrollView } from 'react-native';
import Toast, { BaseToast } from 'react-native-toast-message';
import styles from './style';
import env from '../../config/env';
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


class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: require('../../assets/img/backgroundPrimary.png'),
            logo: require('../../assets/img/logo-blue.png'),
            circle: require('../../assets/img/CIRCLE.png'),
            phoneNumber: '',
            error: '',
            errorSignIn: '',
        };
    }

    backAction = () => {
        BackHandler.exitApp()
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

    handleInputChange = (numb) => {
        if (numb.substring(0, 1) === '0') {
            if (numb.length === 0) {
                this.setState({
                    error: 'Nomor ponsel dibutuhkan',
                    phoneNumber: ''
                });
            } else if (/^\d+$/.test(numb)) {
                this.setState({
                    phoneNumber: numb,
                    error: ''
                });

                if (numb.length < 9) {
                    this.setState({
                        error: 'Setidaknya masukkan 9 digit nomor ponsel',
                    });
                }
            }
        } else {
            this.setState({
                phoneNumber: '',
                error: 'Nomor ponsel harus di awali dengan angka 0',
            });
        }
    }

    onSignIn = async () => {
        if (this.state.phoneNumber !== '') {
            await fetch(`${env}/auth/employee/login`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "phoneNumber": this.state.phoneNumber.substring(1)
                })
            }).then((response) => response.json())
                .then((json) => {
                    if (json.meta.code === 200) {
                        let data = this.props.users;
                        data.requestToken = json.data.requestToken;
                        data.phoneNumber = this.state.phoneNumber;
                        data.localization = 'id';
                        this.props.onTodoClick(data);
                        this.props.navigation.navigate('Otp');
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
                });;
        } else {
            this.setState({
                error: 'Nomor ponsel dibutuhkan',
                phoneNumber: ''
            });
        }
    }

    onSignUp = () => {
        this.props.navigation.navigate('SelfSignUp');
    }

    onCompanySignUp = () => {
        this.props.navigation.navigate('CompanySignUp');
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.background}>
                        <KeyboardAvoidingView
                            behavior="padding"
                        >
                            <View style={styles.content}>
                                <View style={styles.header}>
                                    <Image
                                        style={styles.logo}
                                        source={this.state.logo}
                                    />
                                    <Text style={styles.title}> 👋 Halo Bro!</Text>
                                    <Text style={styles.subtitle}>Masukan nomor HP kamu buat kode verifikasi</Text>
                                </View>

                                <View style={{ marginBottom: 10 }}>
                                    <View style={styles.sectionStyle}>
                                        <TextInput
                                            style={styles.formInputSignIn}
                                            placeholder="Nomor HP"
                                            underlineColorAndroid="transparent"
                                            placeholderTextColor="#A4A4A4"
                                            keyboardType="numeric"
                                            value={this.state.phoneNumber}
                                            onChangeText={this.handleInputChange}
                                        />
                                    </View>
                                    <Text style={styles.error}>{this.state.error}</Text>
                                </View>

                                <View style={styles.actionSign}>
                                    <TouchableOpacity style={styles.btnSignIn} onPress={this.onSignIn}>
                                        <Text style={{ color: '#FFFFFF', textAlign: 'center', fontWeight: 'bold', }}>Masuk</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.btnSignUp} onPress={this.onSignUp}>
                                        <Text style={{ color: '#5CC3B9', textAlign: 'center', fontWeight: 'bold' }}>Daftar Dulu</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={this.onCompanySignUp}>
                                        <Text style={styles.registCompany}>Perusahaan? Klik disini</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </KeyboardAvoidingView>
                    </View>
                    <Image
                        style={styles.circles}
                        source={this.state.circle}
                    />
                </ScrollView>
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
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);