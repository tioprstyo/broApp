import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    SafeAreaView,
    Modal,
    Pressable,
} from 'react-native';
import Toast, { BaseToast } from 'react-native-toast-message';
import styles from './style';
import { connect } from 'react-redux';
import env from '../../config/env';

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

class FisrtLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logo: require('../../assets/img/logo-blue.png'),
            modalVisible: false,
        };
    }

    nextTransaction = value => {
        if (this.state.modalVisible) {
            this.setState({ modalVisible: false });
        }
        let data = this.props.users;
        fetch(`${env}/app/bonus/${value}/first-time-offer`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${data.token}`,
            },
        })
            .then(response => response.json())
            .then(json => {
                if (json.meta.code === 200) {
                    this.props.navigation.navigate('Home');
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

    setModalVisible = visible => {
        this.setState({ modalVisible: visible });
    };

    render() {
        const { modalVisible } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    <View style={{ zIndex: 100 }}>
                        <Text style={styles.title}>
                            Tarik gajimu kapan aja dengan Bro Payday!
                        </Text>
                        <Text style={styles.descTitle}>
                            Mau Bonus Rp. 50,000 {'\n'}
                            di penarikan pertamamu? 🤑 {'\n'} {'\n'}
                            Caranya Simple!
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={styles.btnNext}
                        onPress={() => this.nextTransaction('accept')}>
                        <Text style={styles.textBtnNext}>Lanjut</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btnCancel}
                        onPress={() => this.setModalVisible(!modalVisible)}>
                        <Text style={styles.textBtnCancel}>Nanti aja deh</Text>
                    </TouchableOpacity>
                    <Image
                        style={styles.background}
                        source={require('../../assets/img/patternFirst.png')}
                    />
                </View>
                <Toast config={toastConfig} ref={ref => Toast.setRef(ref)} />
                {modalVisible ? (
                    <View style={styles.centeredView}>
                        <Modal
                            contentContainerStyle={styles.modalPosition}
                            animationType="fade"
                            transparent={true}
                            visible={modalVisible}>
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Pressable
                                        style={styles.positionClose}
                                        onPress={() => this.setModalVisible(!modalVisible)}>
                                        <Image
                                            style={styles.iconClose}
                                            source={require('../../assets/icon/close.png')}
                                        />
                                    </Pressable>
                                    <Image
                                        style={styles.iconModal}
                                        source={require('../../assets/icon/money.png')}
                                    />
                                    <Text style={styles.modalText}>Kamu Yakin? 🤔</Text>
                                    <Text style={styles.modalDesc}>
                                        Kamu bakal kehilangan Bonus {'\n'}{' '}
                                        <Text style={{ fontWeight: 'bold' }}>Rp. 25,000</Text> loh!
                                    </Text>
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => this.nextTransaction('decline')}>
                                        <Text style={styles.textStyle}>Iya, Skip Bonusnya</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </Modal>
                    </View>
                ) : (
                    <View />
                )}
            </SafeAreaView>
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
export default connect(mapStateToProps, mapDispatchToProps)(FisrtLogin);
