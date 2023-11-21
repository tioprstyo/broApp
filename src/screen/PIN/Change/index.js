import React from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image,
    BackHandler,
    TouchableOpacity,
} from 'react-native';
import HeaderIcon from '../../../components/HeaderIcon';
import Toast, { BaseToast } from 'react-native-toast-message';
import PincodeInput from 'react-native-pincode-input';
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

class ChangePin extends React.Component {
    pincodeInput = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            image: require('../../../assets/img/backgroundPrimary.png'),
            pattern: require('../../../assets/img/patternLogin.png'),
            logo: require('../../../assets/img/logoBroApp.png'),
            newPin: '',
            oldPin: '',
            confirmPin: '',
            stepOne: 1,
        };
    }

    backAction = () => {
        if (this.state.stepOne === 1) {
            this.props.navigation.navigate('EnterPin');
        } else if (this.state.stepOne === 2) {
            this.setState({ stepOne: 1 });
        } else {
            this.setState({ stepOne: 2 });
        }
        return true;
    };

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            this.backAction,
        );
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    submit = async val => {
        let data = this.props.users;
        await fetch(`${env}/app/dashboard/pin`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${data.token}`,
            },
            body: JSON.stringify({
                oldPin: this.state.oldPin,
                pin: this.state.newPin,
                confirmPin: val,
            }),
        }).then(response => response.json())
            .then(json => {
                if (json.meta.code === 200) {
                    Toast.show({
                        type: 'my_custom_type',
                        props: { text1: 'Ubah PIN Berhasil!' },
                        position: 'bottom',
                    });
                } else {
                    Toast.show({
                        type: 'my_custom_type',
                        props: { text1: json.meta.message || json.meta.status },
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
        setTimeout(() => {
            this.props.navigation.navigate('EnterPin');
        }, 1000);
    };

    shakePincode() {
        this.pincodeInput.shake();
        this.setState({ confirmPin: '' });
    }

    handleOnSet(oldPin) {
        this.setState({ oldPin });
        if (oldPin.length > 5) {
            setTimeout(() => {
                this.setState({ stepOne: 2 });
            }, 500);
        }
    }

    handleNewPin(newPin) {
        this.setState({ newPin });
        if (newPin.length > 5) {
            setTimeout(() => {
                this.setState({ stepOne: 3 });
            }, 500);
        }
    }

    handleOnConfirm(confirmPin) {
        this.setState({ confirmPin });
        if (confirmPin.length > 5) {
            if (confirmPin !== this.state.newPin) {
                this.shakePincode();
            } else {
                this.submit(confirmPin);
            }
        }
    }

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
                        <Text style={styles.titleHeader}>PIN</Text>
                    </View>
                </ImageBackground>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Ubah PIN kamu</Text>
                        <Text style={styles.descTitle}>
                            {this.state.stepOne == 1
                                ? 'Masukan PIN lama'
                                : this.state.stepOne == 2
                                    ? 'Masukan PIN baru'
                                    : 'Konfirmasi PIN baru'}
                        </Text>
                    </View>

                    <View style={styles.otpForm}>
                        {this.state.stepOne == 1 ? (
                            <PincodeInput
                                ref={pincodeInput => (this.pincodeInput = pincodeInput)}
                                length={6}
                                containerStyle={styles.OtpContainer}
                                circleContainerStyle={styles.circles}
                                circleEmptyStyle={styles.circleEmpty}
                                circleFilledStyle={styles.circleFilled}
                                pin={this.state.oldPin}
                                onTextChange={this.handleOnSet.bind(this)}
                            />
                        ) : this.state.stepOne == 2 ? (
                            <PincodeInput
                                ref={pincodeInput => (this.pincodeInput = pincodeInput)}
                                length={6}
                                containerStyle={styles.OtpContainer}
                                circleContainerStyle={styles.circles}
                                circleEmptyStyle={styles.circleEmpty}
                                circleFilledStyle={styles.circleFilled}
                                pin={this.state.newPin}
                                onTextChange={this.handleNewPin.bind(this)}
                            />
                        ) : (
                            <PincodeInput
                                ref={pincodeInput => (this.pincodeInput = pincodeInput)}
                                length={6}
                                containerStyle={styles.OtpContainer}
                                circleContainerStyle={styles.circles}
                                circleEmptyStyle={styles.circleEmpty}
                                circleFilledStyle={styles.circleFilled}
                                pin={this.state.confirmPin}
                                onTextChange={this.handleOnConfirm.bind(this)}
                            />
                        )}
                        <View style={styles.bottomLine} />
                        {/* <View style={styles.actionPIN}>
                            <Text style={styles.descTitle}>Hindari penggunaan kombinasi angka yang mudah ditebak, seperti ulang tahun atau nomor telepon</Text>
                        </View> */}
                    </View>

                    {/* {this.state.stepOne !== 1 ?
                        <View style={styles.actionSign}>
                            <TouchableOpacity style={styles.btnSignIn} onPress={this.submit}>
                                <Text style={{ color: '#FFFFFF', textAlign: 'center' }}>Lanjut</Text>
                            </TouchableOpacity>
                        </View>
                        : <View></View>} */}
                </View>
                <Image style={styles.pattern} source={this.state.pattern} />
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
export default connect(mapStateToProps, mapDispatchToProps)(ChangePin);
