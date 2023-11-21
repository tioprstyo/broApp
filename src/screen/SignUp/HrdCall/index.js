import React from 'react';
import { Image, ImageBackground, KeyboardAvoidingView, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
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


class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: require('../../../assets/img/backgroundHrdCall.png'),
            logo: require('../../../assets/img/logo-blue.png'),
            phoneNumber: '',
            name: '',
            errorName: '',
            errorPhone: '',
        };
    }

    componentDidMount() {
        this.props.navigation.addListener(
            'willFocus',
            () => {
                let data = this.props.users;
                this.setState({ phoneNumber: data.signUpPhone });
                data.signUpPhone = '';
                this.props.onTodoClick(data);
            }
        )
    }

    handleInputChangePhone = (numb) => {
        if (numb.substring(0, 1) === '0') {
            if (numb.length === 0) {
                this.setState({
                    errorPhone: 'Nomor ponsel dibutuhkan',
                    phoneNumber: ''
                });
            } else if (/^\d+$/.test(numb)) {
                this.setState({
                    phoneNumber: numb,
                    errorPhone: ''
                });

                if (this.state.phoneNumber.length < 9) {
                    this.setState({
                        phoneNumber: numb,
                        errorPhone: 'Setidaknya masukkan 9 digit nomor ponsel',
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

    handleInputChangeName = (name) => {
        if (name.length === 0) {
            this.setState({
                errorName: 'Nama dibutuhkan',
                name: ''
            });
        } else {
            if (name.length < 3) {
                this.setState({
                    name: name,
                    errorName: 'Setidaknya masukkan 3 huruf nama',
                });
            } else {
                this.setState({
                    name: name,
                    errorName: '',
                });
            }
        }
    }

    onSignUp = async () => {
        if (!this.state.errorName || !this.state.errorPhone) {
            await fetch(`${env}/auth/employee/guest-book`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "phoneNumber": this.state.phoneNumber.substring(1),
                    "name": this.state.name,
                })
            }).then((response) => response.json())
                .then((json) => {
                    if (json.meta.code === 200) {
                        this.props.navigation.navigate('Confirmation');
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
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    <View style={styles.container}>
                        <ImageBackground source={this.state.image} style={styles.background}>
                            <View style={styles.content}>
                                <KeyboardAvoidingView behavior="padding">
                                    <View style={styles.header}>
                                        <Image
                                            style={styles.logo}
                                            source={this.state.logo}
                                        />
                                        <Text style={styles.title}>Tarik Gajimu kapan aja dengan Bro Payday! ⚡️</Text>
                                        <Text style={styles.subtitle}>
                                            Kenalkan HRD atau manager kamu dengan Bro
                                        </Text>
                                        <Text style={styles.subtitle}>
                                            supaya kamu bisa segera mengakses benefit
                                        </Text>
                                        <Text style={styles.subtitle}>
                                            Bro Payday!
                                        </Text>
                                    </View>

                                    <View style={{ marginBottom: 10 }}>
                                        <View style={styles.sectionStyle}>
                                            <TextInput
                                                style={styles.formInputSignUp}
                                                placeholder="Nomor HP"
                                                placeholderTextColor="#DBDBDB"
                                                underlineColorAndroid="transparent"
                                                keyboardType="numeric"
                                                value={this.state.phoneNumber}
                                                onChangeText={this.handleInputChangePhone}
                                            />
                                            <TouchableOpacity
                                                style={{ padding: 15 }}
                                                activeOpacity={.7}
                                                onPress={() => this.props.navigation.navigate('Contact', { params: 'signUp' })}
                                            >
                                                <Image
                                                    source={require('../../../assets/icon/contact.png')}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                        <Text style={styles.error}>{this.state.errorPhone}</Text>
                                    </View>

                                    <View style={{ marginBottom: 10 }}>
                                        <View style={styles.sectionStyle}>
                                            <TextInput
                                                style={styles.formInputSignUp}
                                                placeholder="HR Name"
                                                placeholderTextColor="#DBDBDB"
                                                underlineColorAndroid="transparent"
                                                value={this.state.name}
                                                onChangeText={this.handleInputChangeName}
                                            />
                                        </View>
                                        <Text style={styles.error}>{this.state.errorName}</Text>
                                    </View>

                                    <View style={styles.actionSign}>
                                        <TouchableOpacity
                                            style={
                                                !this.state.errorName && !this.state.errorPhone &&
                                                    this.state.name && this.state.phoneNumber ? styles.btnSignIn : styles.btnSignInDis}
                                            onPress={this.onSignUp}
                                            disabled={
                                                this.state.errorName || this.state.errorPhone ||
                                                !this.state.name || !this.state.phoneNumber
                                            }
                                        >
                                            <Text style={{ color: '#FFFFFF', textAlign: 'center' }}>Kirim</Text>
                                        </TouchableOpacity>
                                    </View>
                                </KeyboardAvoidingView>
                            </View>
                            <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
                        </ImageBackground>
                    </View>
                </ScrollView>
            </SafeAreaView>
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
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);