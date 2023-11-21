import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, SafeAreaView, KeyboardAvoidingView, BackHandler, ImageBackground } from 'react-native';
import styles from './style';
import HeaderIcon from '../../components/HeaderIcon';
import CheckBox from '@react-native-community/checkbox';
import Toast, { BaseToast } from 'react-native-toast-message';
import env from '../../config/env';
import { connect } from 'react-redux';
import curency from './../../config/number';

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
            name: '',
            errorName: '',
            banks: [],
            bankOpen: false,
            bankSelected: null,
            phoneNumber: '',
            errorPhone: '',
            accountNumber: '',
            errorAccount: '',
            errorBank: '',
            isSelectedSave: false,
            imageLeft: require('../../assets/img/headerLeft.png'),
            rekeningOk: null,
        };
    }

    backAction = () => {
        this.props.navigation.navigate('Home');
        return true;
    };

    componentDidMount() {
        this.props.navigation.addListener(
            'willFocus',
            () => {
                let data = this.props.users.request;
                this.setState({
                    name: data?.options.beneficiaryName,
                    phoneNumber: data?.options.phoneNumber,
                    errorPhone: '',
                    errorName: ''
                });
            }
        )

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
                    this.loadContact();
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

    loadContact = async () => {
        await fetch(`${env}/app/dashboard/contact`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.props.users.token}`
            },
        }).then((response) => response.json())
            .then((json) => {
                if (json.meta.code === 200) {
                    var data = json.data.phone_number;
                    if (data.includes('+62')) {
                        data = `0${data.slice(3)}`
                    }
                    const findBank = this.state.banks.find(e => e.bank_id === json.data.bank_data_id);

                    this.setState({
                        phoneNumber: data,
                        name: json.data.beneficiary_name,
                        bankSelected: findBank,
                        accountNumber: json.data.account_number
                    })
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
        if (this.state.name && this.state.phoneNumber && this.state.accountNumber && this.state.bankSelected && this.state.rekeningOk) {
            let data = this.props.users;
            data.request = {
                amount: this.props.users.request.amount,
                fee: this.props.users.request.fee,
                type: 0,
                options: {
                    beneficiaryName: this.state.name,
                    accountNumber: this.state.accountNumber,
                    bankId: this.state.bankSelected.bank_id,
                    phoneNumber: this.state.phoneNumber,
                    fee: this.props.users.request.fee,
                }
            }
            this.props.onTodoClick(data);

            if (this.state.isSelectedSave) {
                fetch(`${env}/app/dashboard/contact`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${data.token}`
                    },
                    body: JSON.stringify(data.request.options)
                }).then((response) => response.json())
                    .then((json) => {
                        if (json.meta.code !== 200) {
                            Toast.show({
                                type: 'my_custom_type',
                                props: { text1: 'Cannot save this contact' },
                                position: 'bottom',
                            });
                        }
                    })
                    .catch((error) => {
                        Toast.show({
                            type: 'my_custom_type',
                            props: { text1: 'Cannot save this contact' },
                            position: 'bottom',
                        });
                    });;
            }

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
        } else {
            if (!this.state.name) {
                this.setState({ errorName: 'Nama lengkap teman-mu dibutuhkan' })
            }
            if (!this.state.bankSelected) {
                this.setState({ errorBank: 'Pilihan nama bank dibutuhkan' })
            }
            if (!this.state.phoneNumber) {
                this.setState({ errorPhone: 'No HP teman-mu dibutuhkan' })
            }
            if (!this.state.accountNumber || !this.state.rekeningOk) {
                this.setState({ errorAccount: 'Nomor rekening teman-mu dibutuhkan' })
            }
        }
    }

    handleInputChangeName = (name) => {
        if (name.length === 0) {
            this.setState({
                errorName: 'Nama lengkap teman-mu dibutuhkan',
                name: ''
            });
        } else {
            if (name.length < 3) {
                this.setState({
                    name: name,
                    errorName: 'Setidaknya masukkan 3 karakter',
                });
            } else {
                this.setState({
                    name: name,
                    errorName: '',
                });
            }
        }
    }

    handleInputChangePhone = (numb) => {
        if (numb.length === 0) {
            this.setState({
                errorPhone: 'No HP teman-mu dibutuhkan',
                phoneNumber: ''
            });
        } else {
            this.setState({
                phoneNumber: numb,
                errorPhone: ''
            });

            if (this.state.phoneNumber.length < 9) {
                this.setState({
                    phoneNumber: numb,
                    errorPhone: 'Setidaknya masukkan 9 digit nomor HP',
                });
            }
        }
    }

    handleInputChangeAccount = (account) => {
        if (account.length === 0) {
            this.setState({
                errorAccount: 'Nomor rekening teman-mu dibutuhkan',
                accountNumber: ''
            });
        } else {
            this.setState({
                accountNumber: account,
                errorAccount: '',
            });
        }
    }

    selectBank = (val) => {
        this.setState({ bankSelected: val, bankOpen: false, errorBank: '' })
    }

    cekRekening = () => {
        let data = this.props.users;
        fetch(`${env}/transact/beneficiary?bankId=${Number(this.state.bankSelected.bank_id)}&accountNumber=${this.state.accountNumber}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${data.token}`
            },
        }).then((response) => response.json())
            .then((json) => {
                if (json.meta.code === 200) {
                    this.setState({ rekeningOk: true, name: json.data.beneficiaryName, errorAccount: '' })
                } else {
                    this.setState({ rekeningOk: false, errorAccount: 'Nomor rekening tidak valid' });
                }
            })
            .catch((error) => {
                this.setState({ rekeningOk: false, errorAccount: 'Nomor rekening tidak valid' });
            });;
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
                        <Text style={styles.titleHeader}>Detail Transfer</Text>
                    </View>
                </ImageBackground>
                <View style={styles.content}></View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.list}>
                        <View style={{ paddingBottom: '30%' }}>
                            <View style={styles.RBSHeader}>
                                <Image
                                    style={styles.imgBottom}
                                    source={require('../../assets/icon/historyList.png')}
                                />
                                <View style={styles.RBSContent}>
                                    <Text style={styles.descRBS}>Kamu akan mentransfer sebesar</Text>
                                    <Text style={styles.price}>Rp. {curency((this.props.users.request?.amount - this.props.users.request?.fee) + this.props.users.request?.bonus)}</Text>
                                </View>
                            </View>
                            <View style={styles.summary}>
                                <Text style={styles.titleSummary}>Ringkasan</Text>
                                <View style={styles.descSummary}>
                                    <Text style={styles.textSummary}>Jumlah Penarikan</Text>
                                    <Text style={styles.textSummaryPrice}>Rp. {curency(this.props.users.request?.amount)}</Text>
                                </View>
                                {this.props.users.request.bonus > 0 ?
                                    <View style={styles.descSummary}>
                                        <Text style={styles.bonus}>Bonus Perdana</Text>
                                        <Text style={styles.bonus}>Rp. {curency(this.props.users.request?.bonus)}</Text>
                                    </View>
                                    : <View></View>
                                }
                                <View style={styles.descSummary}>
                                    <Text style={styles.textSummary}>Biaya Transaksi</Text>
                                    {this.props.users.request.fee > 0 ?
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
                            <View style={{ flex: 1 }}>
                                <KeyboardAvoidingView behavior="padding">
                                    <View style={styles.form}>
                                        <View style={styles.sectionStyle}>
                                            <TextInput
                                                style={styles.formInputSignUp}
                                                placeholder="Nama Lengkap Temanmu"
                                                placeholderTextColor="#DBDBDB"
                                                underlineColorAndroid="transparent"
                                                value={this.state.name}
                                                onChangeText={this.handleInputChangeName}
                                            />
                                        </View>
                                        <Text style={this.state.errorName ? styles.error : { display: 'none' }}>{this.state.errorName}</Text>
                                    </View>
                                    <View style={styles.form}>
                                        <View style={styles.sectionStyle}>
                                            <TextInput
                                                style={styles.formInputSignUp}
                                                placeholder="Masukan No.HP"
                                                placeholderTextColor="#DBDBDB"
                                                underlineColorAndroid="transparent"
                                                keyboardType="numeric"
                                                value={this.state.phoneNumber}
                                                onChangeText={this.handleInputChangePhone}
                                            />
                                            <TouchableOpacity
                                                style={{ padding: 15 }}
                                                activeOpacity={.7}
                                                onPress={() => this.props.navigation.navigate('Contact')}
                                            >
                                                <Image
                                                    source={require('../../assets/icon/contact.png')}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                        <Text style={this.state.errorPhone ? styles.error : { display: 'none' }}>{this.state.errorPhone}</Text>
                                    </View>
                                    <View style={styles.form}>
                                        <TouchableOpacity style={styles.button} activeOpacity={.7} onPress={() => this.setState({ bankOpen: !this.state.bankOpen })}>
                                            <Text style={this.state.bankSelected ? styles.fill : styles.placeholder}>
                                                {this.state.bankSelected ? this.state.bankSelected.bank_name : 'Pilih Bank'}
                                            </Text>
                                            <View style={{ marginTop: 5 }}>
                                                <Image
                                                    source={require('../../assets/icon/arrow-down.png')}
                                                />
                                            </View>
                                        </TouchableOpacity>
                                        <Text style={this.state.errorBank ? styles.error : { display: 'none' }}>{this.state.errorBank}</Text>
                                        {this.state.bankOpen && this.state.banks.length > 0 ?
                                            <View
                                                style={{
                                                    backgroundColor: '#ffffff',
                                                    height: 262,
                                                    width: '100%',
                                                    padding: 20,
                                                    zIndex: 100,
                                                    borderColor: '#283044',
                                                    borderWidth: 1,
                                                    borderRadius: 20,
                                                    marginTop: 5
                                                }}>
                                                <ScrollView nestedScrollEnabled={true}>
                                                    <View>
                                                        {this.state.banks.map((item, j) => {
                                                            return (
                                                                <TouchableOpacity key={j} onPress={() => this.selectBank(item)}>
                                                                    <View style={{ marginBottom: 20 }}>
                                                                        <Text>{item.bank_name}</Text>
                                                                    </View>
                                                                </TouchableOpacity>
                                                            )
                                                        })}
                                                    </View>
                                                </ScrollView>
                                            </View>
                                            :
                                            <View></View>
                                        }
                                    </View>
                                    <View style={styles.form}>
                                        <View style={styles.sectionBank}>
                                            <View style={styles.inputBank}>
                                                <TextInput
                                                    style={styles.formInputSignUp}
                                                    placeholder="Nomor Rekening Temanmu"
                                                    placeholderTextColor="#DBDBDB"
                                                    keyboardType="numeric"
                                                    underlineColorAndroid="transparent"
                                                    value={this.state.accountNumber}
                                                    onChangeText={this.handleInputChangeAccount}
                                                />
                                                {this.state.rekeningOk ?
                                                    <View style={{ marginRight: '5%' }}>
                                                        <Image
                                                            source={require('../../assets/icon/rekeningOke.png')}
                                                        />
                                                    </View>
                                                    : this.state.rekeningOk === false ?
                                                        <View style={styles.iconError}>
                                                            <Image
                                                                source={require('../../assets/icon/closeRek.png')}
                                                            />
                                                        </View>
                                                        : <View></View>
                                                }
                                            </View>
                                            <TouchableOpacity style={!this.state.bankSelected ? styles.btnDisabled : styles.btnBank} onPress={this.cekRekening} disabled={!this.state.bankSelected}>
                                                <Text style={{ color: '#FFFFFF', textAlign: 'center' }}>Cek</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <Text style={this.state.errorAccount ? styles.error : { display: 'none' }}>{this.state.errorAccount}</Text>
                                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                            <CheckBox
                                                disabled={false}
                                                value={this.state.isSelectedSave}
                                                boxType="circle"
                                                tintColors={{ true: '#5CC3B9', false: '#5CC3B9' }}
                                                onValueChange={(newValue) => this.setState({ isSelectedSave: newValue })}
                                            />
                                            <Text style={styles.labelCheckbox}>Simpan informasi ini</Text>
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