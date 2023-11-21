import React from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image,
    BackHandler,
    TouchableOpacity,
} from 'react-native';
import Toast, { BaseToast } from 'react-native-toast-message';
import PincodeInput from 'react-native-pincode-input';
import styles from './style';
import env from '../../../config/env';
import RBSheet from 'react-native-raw-bottom-sheet';
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

class ResetPin extends React.Component {
    pincodeInput = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            image: require('../../../assets/img/backgroundPrimary.png'),
            pattern: require('../../../assets/img/patternLogin.png'),
            logo: require('../../../assets/img/logoBroApp.png'),
            newPin: '',
            confirmPin: '',
            stepOne: true,
        };
    }

    backAction = () => {
        if (this.state.stepOne) {
            this.props.navigation.navigate('EnterPin');
        } else {
            this.setState({ stepOne: true });
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

    pinReset = () => {
        let data = this.props.users;
        this.RBSheet.close();
        fetch(`${env}/app/dashboard/pin`, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${data.token}`,
            },
        })
            .then(response => response.json())
            .then(json => {
                if (json.meta.code === 200) {
                    this.props.navigation.navigate('ResetPin');
                    Toast.show({
                        type: 'my_custom_type',
                        props: { text1: json.meta.message },
                        position: 'bottom',
                    });
                } else {
                    Toast.show({
                        type: 'my_custom_type',
                        props: { text1: json.meta.message },
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
                pin: this.state.newPin,
                confirmPin: this.state.newPin,
                oldPin: val,
            }),
        }).then(response => response.json())
            .then(json => {
                if (json.meta.code === 200) {
                    data.request.pin = this.state.newPin;
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
                            console.log(error);
                        });
                } else {
                    Toast.show({
                        type: 'my_custom_type',
                        props: { text1: json.meta.message },
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

    shakePincode() {
        this.pincodeInput.shake();
        this.setState({ confirmPin: '' });
    }

    handleOnSet(newPin) {
        this.setState({ newPin });
        if (newPin.length > 5) {
            this.setState({ stepOne: false });
        }
    }

    handleOnConfirm(confirmPin) {
        this.setState({ confirmPin });
        if (confirmPin.length > 5) {
            this.submit(confirmPin);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={this.state.image} style={styles.background}>
                    <View style={styles.content}>
                        <View style={styles.header}>
                            <Image style={styles.logo} source={this.state.logo} />
                            <Text style={styles.title}>
                                {' '}
                                {this.state.stepOne ? 'Masukan PIN bro' : 'PIN lama bro'}
                            </Text>
                            <Text style={styles.descTitle}>
                                {this.state.stepOne ? '' : 'Masukan PIN'}
                            </Text>
                        </View>

                        <View style={styles.otpForm}>
                            {this.state.stepOne ? (
                                <PincodeInput
                                    ref={pincodeInput => (this.pincodeInput = pincodeInput)}
                                    length={6}
                                    containerStyle={styles.OtpContainer}
                                    circleContainerStyle={styles.circles}
                                    circleEmptyStyle={styles.circleEmpty}
                                    circleFilledStyle={styles.circleFilled}
                                    pin={this.state.newPin}
                                    onTextChange={this.handleOnSet.bind(this)}
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
                            <View style={styles.actionPIN}>
                                <TouchableOpacity onPress={() => this.RBSheet.open()}>
                                    <Text style={styles.textStyle}>Reset</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('ChangePin')}>
                                    <Text style={styles.textStyle}>Ubah</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <RBSheet
                            ref={ref => {
                                this.RBSheet = ref;
                            }}
                            height={330}
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
                                <Image
                                    style={styles.imgBottom}
                                    source={require('../../../assets/img/reset.png')}
                                />
                                <View style={styles.RBSContent}>
                                    <Text style={styles.titleRBS}>Konfirmasi Reset PIN</Text>
                                    <Text style={styles.descRBS}>
                                        Apakah Anda yakin ingin mereset PIN Anda?
                                    </Text>
                                </View>
                                <View style={styles.actionRBS}>
                                    <TouchableOpacity
                                        style={styles.noButton}
                                        onPress={() => this.RBSheet.close()}>
                                        <Text style={styles.resetNo}>Tidak</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.yesButton}
                                        onPress={() => this.pinReset()}>
                                        <Text style={styles.resetYes}>Ya</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </RBSheet>
                    </View>
                    <Image style={styles.pattern} source={this.state.pattern} />
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
export default connect(mapStateToProps, mapDispatchToProps)(ResetPin);
