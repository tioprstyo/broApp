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
import RBSheet from 'react-native-raw-bottom-sheet';
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

class EnterPin extends React.Component {
    pincodeInput = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            image: require('../../../assets/img/backgroundPrimary.png'),
            pattern: require('../../../assets/img/patternLogin.png'),
            logo: require('../../../assets/img/logoBroApp.png'),
            imageLeft: require('../../../assets/img/headerLeft.png'),
            pin: '',
        };
    }

    backAction = () => {
        this.props.navigation.goBack();
        return true;
    };

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            this.backAction,
        );
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('willFocus', () => {
            this.forceUpdate();
        });
    }

    componentWillUnmount() {
        this.focusListener.remove();
        this.backHandler.remove();
    }

    shakePincode() {
        this.pincodeInput.shake();
        this.setState({ pin: '' });
    }

    handleOnTextChange(pin) {
        this.setState({ pin });
        if (pin.length > 5) {
            this.submit(pin);
        }
    }

    pinReset = () => {
        this.setState({ pin: '' });
        let data = this.props.users;
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
                this.RBSheet.close();
                if (json.meta.code === 200) {
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
        setTimeout(() => {
            this.props.navigation.navigate('EnterPin');
        }, 1000);
    };

    submit = async val => {
        let data = this.props.users;
        await fetch(`${env}/app/dashboard/pin/verify`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${data.token}`,
            },
            body: JSON.stringify({
                pin: val,
            }),
        }).then(response => response.json())
            .then(json => {
                console.log(json)
                data.request.pin = val;
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
                            console.log(json)
                            if (json.meta.code === 200) {
                                this.props.navigation.navigate('RequestSuccess');
                            } else {
                                this.props.navigation.navigate('RequestFailed');
                            }
                        })
                        .catch(error => {
                            console.log(error);
                            Toast.show({
                                type: 'my_custom_type',
                                props: { text1: 'Maaf terjadi kesalahan bro' },
                                position: 'bottom',
                            });
                        });
                } else {
                    this.setState({ pin: '' });
                    Toast.show({
                        type: 'my_custom_type',
                        props: { text1: 'Invalid PIN' },
                        position: 'bottom',
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    render() {
        const { pin } = this.state;
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
                        <Text style={styles.title}>Masukan PIN kamu</Text>
                    </View>

                    <View style={styles.otpForm}>
                        <PincodeInput
                            ref={pincodeInput => (this.pincodeInput = pincodeInput)}
                            length={6}
                            containerStyle={styles.OtpContainer}
                            circleContainerStyle={styles.circles}
                            circleEmptyStyle={styles.circleEmpty}
                            circleFilledStyle={styles.circleFilled}
                            pin={pin}
                            onTextChange={this.handleOnTextChange.bind(this)}
                        />
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
                <Toast
                    style={{ zIndex: 100 }}
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
export default connect(mapStateToProps, mapDispatchToProps)(EnterPin);
