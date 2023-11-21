import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, SafeAreaView, KeyboardAvoidingView, BackHandler, ImageBackground } from 'react-native';
import styles from './style';
import HeaderIcon from '../../components/HeaderIcon';
import Toast, { BaseToast } from 'react-native-toast-message';
import { connect } from 'react-redux';
import env from '../../config/env';
import curency from '../../config/number';

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

class Transaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reason: '',
            isSelectedSave: false,
            imageLeft: require('../../assets/img/headerLeft.png'),
        };
    }

    backAction = () => {
        this.props.navigation.navigate('Home');
        return true;
    };

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
        this.loadData();
    }

    componentWillUnmount() {
        this.backHandler.remove();
        // this.focusListener.remove();
    }

    loadData = async () => {
        await fetch(`${env}/bank`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.props.users.token}`
            },
        }).then((response) => response.json())
            .then((json) => {
                if (json.meta.code === 200) {
                    this.setState({ banks: json.data });
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
    }


    submit = async () => {
        let data = this.props.users;
        data.request = {
            amount: this.props.users.request?.amount,
            fee: this.props.users.request?.fee,
            type: this.props.users.request?.type,
            notes: this.state.reason,
            options: this.props.users.request?.options,
        }
        this.props.onTodoClick(data);

        if (this.props.users.user.firstTimeTransaction) {
            await fetch(`${env}/auth/employee/login`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "phoneNumber": this.props.users.phoneNumber.substring(1)
                })
            }).then((response) => response.json())
                .then((json) => {
                    if (json.meta.code === 200) {
                        let data = this.props.users;
                        data.requestToken = json.data.requestToken;
                        data.phoneNumber = this.props.users.phoneNumber;
                        data.localization = 'id';
                        this.props.onTodoClick(data);
                        setTimeout(() => {
                            this.props.navigation.navigate('Verification');
                        }, 1000);
                    } else {
                        Toast.show({
                            type: 'my_custom_type',
                            props: { text1: 'Nomor ponsel belum terdaftar' },
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
            setTimeout(() => {
                if (!this.props.users.user.profile.hasPin) {
                    this.props.navigation.navigate('SetUpPin');
                } else {
                    this.props.navigation.navigate('EnterPin');
                }
            }, 1000);
        }
    }

    handleInputChangeReason = (reason) => {
        this.setState({
            reason: reason,
        });
    }


    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ImageBackground source={this.state.imageLeft} style={styles.ImageBackground}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.headerIconLeft}>
                            <TouchableOpacity style={{ textAlign: 'center', marginLeft: 20 }} onPress={() => this.props.navigation.navigate('Home')}>
                                <View style={{ flexDirection: 'row', width: 28, height: 28 }}>
                                    <Image
                                        style={{ width: 25, height: 12 }}
                                        source={require('../../assets/icon/backArrow.png')}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.headerIcon}>
                            <HeaderIcon navigation={this.props.navigation} />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.titleHeader}>Detail Penarikan</Text>
                    </View>
                </ImageBackground>
                <View style={styles.content}></View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.list}>
                        <View style={{ paddingBottom: '30%' }}>
                            <View style={styles.RBSHeader}>
                                <Image
                                    style={styles.imgBottom}
                                    source={require('../../assets/icon/notificationList.png')}
                                />
                                <View style={styles.RBSContent}>
                                    <Text style={styles.descRBS}>Kamu akan menerima</Text>
                                    <Text style={styles.price}>Rp. {curency((this.props.users.request?.amount - this.props.users.request?.fee) + this.props.users.request?.bonus)}</Text>
                                </View>
                            </View>
                            <View style={styles.summary}>
                                <Text style={styles.titleSummary}>Ringkasan</Text>
                                <View style={styles.descSummary}>
                                    <Text style={styles.textSummary}>Jumlah Penarikan</Text>
                                    <Text style={styles.textSummaryPrice}>Rp. {curency(this.props.users.request?.amount)}</Text>
                                </View>
                                {this.props.users.request?.bonus > 0 ?
                                    <View style={styles.descSummary}>
                                        <Text style={styles.bonus}>Bonus Perdana</Text>
                                        <Text style={styles.bonus}>Rp. {curency(this.props.users.request?.bonus)}</Text>
                                    </View>
                                    : <View></View>
                                }
                                <View style={styles.descSummary}>
                                    <Text style={styles.textSummary}>Biaya Transaksi</Text>
                                    {this.props.users.request?.fee > 0 ?
                                        <Text style={styles.textSummaryPrice}>Rp. {curency(this.props.users.request?.fee)}</Text>
                                        :
                                        <Text style={styles.bonus}>Gratis</Text>
                                    }
                                </View>
                                <View style={styles.descSummary}>
                                    <Text style={styles.endSummary}>Jumlah Penarikan</Text>
                                    <Text style={styles.endSummary}>Rp. {curency((this.props.users.request?.amount - this.props.users.request?.fee) + this.props.users.request?.bonus)}</Text>
                                </View>
                            </View>
                            <View style={styles.rekeningInfo}>
                                <View>
                                    <Text style={styles.endSummary}>Transfer ke rekening bank-mu</Text>
                                    <Text style={styles.endSummary}>{this.props.users.request?.options.beneficiaryName}  {this.props.users.request?.options.accountNumber}</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1 }}>
                                <KeyboardAvoidingView behavior="padding">
                                    <View style={styles.form}>
                                        <View style={styles.sectionStyle}>
                                            <TextInput
                                                style={styles.formInputSignUp}
                                                placeholder="Alasan Penarikan (Tenang, ini opsional kok)"
                                                placeholderTextColor="#DBDBDB"
                                                underlineColorAndroid="transparent"
                                                value={this.state.reason}
                                                onChangeText={this.handleInputChangeReason}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.actionSign}>
                                        <TouchableOpacity style={styles.btnSignIn} onPress={this.submit}>
                                            <Text style={{ color: '#FFFFFF', textAlign: 'center' }}>Lanjut</Text>
                                        </TouchableOpacity>
                                    </View>
                                </KeyboardAvoidingView>
                            </View>
                        </View>
                    </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(Transaction);