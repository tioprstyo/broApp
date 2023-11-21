import React from 'react';
import { Image, SafeAreaView, Text, BackHandler, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
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


class CompanySignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            circle: require('../../../assets/img/CIRCLE.png'),
            circlered: require('../../../assets/img/circlered.png'),
            cs: require('../../../assets/img/cs.png'),
            phoneNumber: '',
            error: ''
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

                if (this.state.phoneNumber.length < 9) {
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

    Finished = () => {
        this.RBSheet.close();
        this.props.navigation.navigate('SignIn');
    }

    Register = async () => {
        if (!this.state.error && this.state.phoneNumber) {
            await fetch(`${env}/auth/company/register`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "phone_number": this.state.phoneNumber.substring(1),
                })
            }).then((response) => response.json())
                .then((json) => {
                    if (json.meta.code === 200) {
                        this.RBSheet.open();
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
            this.setState({ error: 'Masukkan nomor telepon kamu' });
        }
    }

    
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.background}>
                        <View style={styles.content}>
                            <Image
                                source={this.state.cs}
                                style={styles.mainImg}
                            />
                            <Text style={styles.title}>Mau tau lebih lanjut?</Text>

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
                                        onPress={this.Register}
                                    >
                                        <Image
                                            style={styles.iconSent}
                                            source={require('../../../assets/img/sent.png')}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <Text style={this.state.error ? styles.error: ''}>{this.state.error}</Text>
                            </View>
                            <Text style={styles.subtitle}>Masukan nomor telepon kamu.</Text>
                            <Text style={styles.subtitle}>Kami akan segera menghubungi kamu, Bro</Text>
                        </View>
                        <Image
                            style={styles.circlestop}
                            source={this.state.circle}
                        />
                        <View style={styles.divCircle}>
                            <Image
                                source={this.state.circlered}
                                style={styles.circlesbottom}
                            />
                        </View>
                    </View>
                    <RBSheet
                        ref={ref => {
                            this.RBSheet = ref;
                        }}
                        height={150}
                        closeOnDragDown={true}
                        customStyles={{
                            container: {
                                backgroundColor: '#ffffff',
                                borderTopLeftRadius: 40,
                                borderTopRightRadius: 40,
                                position: 'relative',
                            },
                            wrapper: {
                                backgroundColor: 'rgba(52, 52, 52, 0.8)',
                            },
                            draggableIcon: {
                                backgroundColor: '#B8B8B8',
                                width: 80,
                            },
                        }}>
                        <View style={styles.RBSHeader}>
                            <Text style={styles.TitleRbs}>We will get back to you! </Text>
                            <TouchableOpacity style={styles.btnRbs} onPress={() => this.Finished()}>
                                <Text style={styles.textStyle}>Oke!</Text>
                            </TouchableOpacity>
                        </View>
                    </RBSheet>
                </ScrollView>
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
export default connect(mapStateToProps, mapDispatchToProps)(CompanySignUp);