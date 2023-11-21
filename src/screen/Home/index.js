import React from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    SafeAreaView,
    Image,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    Keyboard,
    ScrollView,
    BackHandler,
    Modal,
    Pressable,
    RefreshControl,
    Dimensions,
    AppState
} from 'react-native';
import Toast, { BaseToast } from 'react-native-toast-message';
import RBSheet from "react-native-raw-bottom-sheet";
import HeaderIcon from '../../components/HeaderIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Progress from 'react-native-progress';
import styles from './style';
import { connect } from 'react-redux';
import curency from './../../config/number';
import date from './../../config/date';
import NumberFormat from 'react-number-format';
import messaging from '@react-native-firebase/messaging';
import env from '../../config/env';
const windowWidth = Dimensions.get('window').width;

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

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            budget: '',
            error: '',
            infoIcon: require('../../assets/icon/Info.png'),
            iconPull: require('../../assets/icon/back.png'),
            historyIcon: require('../../assets/icon/historyList.png'),
            imageLeft: require('../../assets/img/headerLeft.png'),
            imageRight: require('../../assets/img/headerRight.png'),
            view1: false,
            view2: false,
            profile: null,
            isLoadingPage: false,
            isLoadingProcess: false,
            loadingRefresh: false,
            tap: false,
            modalVisible: false,
            firstLoad: false,
        };
    }


    backAction = () => {
        BackHandler.exitApp()
        return true;
    };

    componentDidMount() {
        // AsyncStorage.clear();
        this.setState({ isLoadingPage: true, firstLoad: true });
        this.fromNotification();
        this.getNotifActif();
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('willFocus', () => {
            this.setState({ budget: '' });
            let data = this.props.users;
            data.request = null;
            this.props.onTodoClick(data);
            if (!this.state.firstLoad) {
                this.loadData();
            }
        })
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
        if (!this.state.firstLoad) {
            this.loadData();
        }
    }

    componentWillUnmount() {
        this.focusListener.remove();
        this.backHandler.remove();
    }

    getMyObject = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@auth');
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // read error
        }

    }

    getModalInfo = async () => {
        try {
            const modalInfo = await AsyncStorage.getItem('@modalInfo');
            if (!modalInfo) {
                return true;
            }
            return false;
        } catch (e) {
            // read error
        }
    }

    loadData = async () => {
        // AsyncStorage.clear();
        let data = await this.getMyObject();
        let modalInfo = await this.getModalInfo();
        await fetch(`${env}/app/dashboard`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${data.token}`
            },
        }).then((response) => response.json())
            .then((json) => {
                const dataBonus = [];
                json.meta.bonuses.bonusLists.map((item) => dataBonus.push(item.id));
                if (json.meta.profile) {
                    data.user = json.meta;
                    data.user.transactions = json.data.histories;
                    data.user.bonus = json.meta.bonuses.total;
                    data.user.bonusList = dataBonus.toString();
                    this.setState({
                        profile: data.user,
                        isLoadingPage: false,
                        loadingRefresh: false,
                        budget: '',
                        error: '',
                        view1: false,
                        view2: false,
                        modalVisible: modalInfo,
                        firstLoad: false,
                    });
                    this.props.onTodoClick(data);
                    AsyncStorage.setItem('@modalInfo', JSON.stringify(true));
                } else {
                    Toast.show({
                        type: 'my_custom_type',
                        props: { text1: json.meta.message },
                        position: 'bottom',
                    });
                    setTimeout(() => {
                        AsyncStorage.removeItem('@auth');
                        this.props.navigation.navigate('SignIn');
                    }, 2000);
                }
            })
            .catch((error) => {
                this.props.navigation.navigate('SignIn');
                Toast.show({
                    type: 'my_custom_type',
                    props: { text1: 'Maaf Bro, Terjadi kesalahan. Silahkan kembali masuk' },
                    position: 'bottom',
                });
            });;
    }

    handleInputChange = (numb) => {
        var inputValue = numb === 'Rp. ' ? '' : numb;
        this.setState({
            error: '',
            budget: inputValue
        });
        var number = numb.replace('Rp. ', '').replace(/\,/g, '');
        if (Number(number) < 50000) {
            this.setState({
                error: 'Penarikan minimal setidaknya Rp. 50.000',
            });
        }

        if (Number(number) > Number(this.state.profile.availableToBeWithdrawn)) {
            this.setState({
                error: 'Penarikan tidak bisa melebihi gaji yang dihasilkan',
            });
        }
    }

    showChange1 = () => {
        this.setState({ view1: !this.state.view1 });
    }

    showChange2 = () => {
        this.setState({ view2: !this.state.view2 });
    }

    transferToMe = async (val) => {
        this.setState({ isLoadingProcess: true });
        let data = this.props.users;
        const budget = Number(this.state.budget.replace('Rp. ', '').replace(/\,/g, ''));
        await fetch(`${env}/app/dashboard/request/invoice?amount=${budget}&type=${val}bonus=${this.props.users.user.bonusList}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${data.token}`
            },
        }).then((response) => response.json())
            .then((json) => {
                if (json.meta.code === 200) {
                    var options = {};
                    if (val) {
                        options = {
                            beneficiaryName: json.data.beneficiaryName,
                            accountNumber: json.data.accountNumber,
                        };
                    } else {
                        options = {
                            beneficiaryName: '',
                            accountNumber: '',
                            phoneNumber: '',
                            bankId: '',
                            fee: json.data.fee,
                        };
                    }
                    data.request = {
                        amount: json.data.amount,
                        fee: json.data.fee,
                        type: val,
                        bonus: json.data.bonus,
                        options: options,
                    }
                    this.props.onTodoClick(data);
                    setTimeout(() => {
                        this.setState({ isLoadingProcess: false });
                        if (val) {
                            this.props.navigation.navigate('Widrawal');
                        } else {
                            this.props.navigation.navigate('Transfer');
                        }
                    }, 1000);
                } else {
                    this.setState({ isLoadingProcess: false });
                    Toast.show({
                        type: 'my_custom_type',
                        props: { text1: json.meta.message || json.meta.status },
                        position: 'bottom',
                    });
                }
            })
            .catch((error) => {
                this.setState({ isLoadingProcess: false });
                Toast.show({
                    type: 'my_custom_type',
                    props: { text1: 'Maaf Bro, terjadi kesalahan' },
                    position: 'bottom',
                });
            });;
    }

    onRefresh = () => {
        let data = this.props.users;
        data.notice = false;
        this.props.onTodoClick(data);
        this.setState({ loadingRefresh: true, pullRefresh: false });
        this.loadData();
    }

    autoBlur = () => {
        setTimeout(() => {
            Keyboard.dismiss();
        }, 3000);
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    fromNotification() {
        this.appStateSubscription = AppState.addEventListener(
            "change",
            nextAppState => {
                if (nextAppState === 'active' && this.props.users.notice) {
                    this.setState({ pullRefresh: this.props.users.notice })
                }
            }
        );
        if (this.appStateSubscription) {
            this.appStateSubscription.remove();
        }
    };

    getNotifActif() {
        messaging().onMessage(async remoteMessage => {
            let data = this.props.users;
            data.notice = true;
            this.props.onTodoClick(data);
            this.setState({ pullRefresh: this.props.users.notice })

            if (remoteMessage.notification.title.includes('Hiks')) {
                Toast.show({
                    type: 'my_custom_type',
                    props: { text1: 'Akun Anda telah dinonaktifkan atau ditandai sebagai mengundurkan diri' },
                    position: 'bottom',
                });
                setTimeout(() => {
                    AsyncStorage.removeItem('@auth');
                    this.props.navigation.navigate('SignIn');
                }, 2000);
            }
        });
    }

    convertString(val) {
        return ((val).length > 10) ?
            (((val).substring(0, 10)) + '...') :
            val
    }

    render() {
        const { modalVisible, pullRefresh } = this.state;

        return (
            <SafeAreaView style={{ flex: 1 }}>
                {this.state.profile && !this.state.isLoadingPage ?
                    <View>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.loadingRefresh}
                                    onRefresh={this.onRefresh}
                                />
                            }
                        >
                            <View style={styles.container}>
                                <View style={styles.headers}>
                                    <ImageBackground source={this.state.imageLeft} style={styles.ImageBackground}>
                                        <View style={styles.headerIcon}>
                                            <HeaderIcon navigation={this.props.navigation} />
                                        </View>
                                        <View style={styles.header}>
                                            <Text style={styles.titleHeader}>Hi {this.state.profile.profile.name}!</Text>
                                        </View>
                                    </ImageBackground>
                                </View>
                                <View style={styles.cardHome}>
                                    {pullRefresh ?
                                        <View style={styles.pullContainer}>
                                            <View style={styles.pullIcon}>
                                                <Image
                                                    source={this.state.iconPull}
                                                />
                                            </View>
                                            <Text style={styles.pullText}>Geser ke bawah untuk memperbaharui data</Text>
                                        </View> : <View></View>
                                    }
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40 }}>
                                        <View style={styles.boxContent}>
                                            <View style={styles.titleBox}>
                                                <Text style={styles.title}>Gaji yang sudah dihasilkan</Text>
                                                <Image
                                                    style={styles.iconInfo}
                                                    source={this.state.infoIcon}
                                                />
                                            </View>
                                            {this.state.view1 ?
                                                <TouchableOpacity style={styles.nominal} onPress={this.showChange1}>
                                                    <Text style={styles.price}>Rp. {curency(this.state.profile.availableToBeWithdrawn)}</Text>
                                                    <Text style={styles.toHidden}>Hide</Text>
                                                </TouchableOpacity>
                                                :
                                                <TouchableOpacity style={styles.nominal} onPress={this.showChange1}>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text style={styles.hiddenShow}>Tap untuk lihat</Text>
                                                        <Image style={{ marginTop: 12 }} source={require('../../assets/icon/eye.png')} />
                                                    </View>
                                                </TouchableOpacity>
                                            }
                                            <Text style={styles.date}>Per {date(new Date(), null)}</Text>
                                        </View>
                                        <View style={{ width: '40%', alignItems: 'center' }}>
                                            <View style={styles.circle}>
                                                <Text style={styles.DaysTitle}>{this.state.profile.validWorkdays}</Text>
                                                <Text style={styles.DaysSub}>Hari Kerja</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ alignItems: 'center', }}>
                                        <Text style={{ fontSize: 15, color: '#757575', marginBottom: 15 }}>Berapa jumlah yang ingin kamu tarik?</Text>
                                        {/* <TextInput
                                            style={styles.formInputSignIn}
                                            placeholder={!this.state.tap ? "Rp. 0" : ''}
                                            keyboardType="numeric"
                                            placeholderTextColor="#283044"
                                            value={this.state.budget}
                                            onBlur={() => this.setState({ tap: false, budget: this.state.budget ? `Rp. ${curency(this.state.budget)}` : '' })}
                                            onFocus={() => this.setState({ tap: true, budget: this.state.budget.replace('Rp. ', '').replace(/\./g, '')})}
                                            onChangeText={this.handleInputChange}
                                            onKeyPress={this.autoBlur}
                                        /> */}
                                        <NumberFormat
                                            value={!this.state.tap && this.state.budget === '' ? 'Rp. 0' : this.state.budget}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            prefix={'Rp. '}
                                            renderText={value => (
                                                <TextInput
                                                    underlineColorAndroid="transparent"
                                                    style={styles.formInputSignIn}
                                                    onChangeText={(value) => this.handleInputChange(value)}
                                                    value={value}
                                                    onBlur={() => this.setState({ tap: false })}
                                                    onFocus={() => this.setState({ tap: true })}
                                                    keyboardType="numeric"
                                                />
                                            )}
                                        />
                                    </View>
                                    <Text style={styles.error}>{this.state.error}</Text>
                                    <View style={{ marginBottom: 40 }}>
                                        <View style={styles.descSummary}>
                                            <TouchableOpacity
                                                style={!this.state.budget || this.state.error ? styles.widthrawButtonDis : styles.widthrawButton}
                                                disabled={!this.state.budget || this.state.error}
                                                onPress={() => this.transferToMe(1)}
                                            >
                                                <Text style={styles.widthraw}>Tarik</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={!this.state.budget || this.state.error ? styles.transferButtonDis : styles.transferButton}
                                                disabled={!this.state.budget || this.state.error}
                                                onPress={() => this.transferToMe(0)}
                                            >
                                                <Text style={!this.state.budget || this.state.error ? styles.transferDis : styles.transfer}>Transfer ke Teman</Text>
                                            </TouchableOpacity>
                                        </View>
                                        {this.props.users.user && this.props.users.user.bonuses.total > 0 ?
                                            <Text style={styles.bonus}>💰 Rp. {curency(this.props.users.user.bonuses.total)} akan ditambahkan ke rekening kamu!</Text>
                                            : <View></View>}
                                    </View>
                                    <View style={{ marginBottom: 40 }}>
                                        <Text style={styles.titleProgress}>{this.state.profile.transactionLeft}/{this.state.profile.transactionFreeLimit} <Text style={{ fontSize: 15, fontWeight: '100' }}>- Yuk, tarik lagi!</Text></Text>
                                        <Progress.Bar
                                            progress={this.state.profile.transactionLeft / this.state.profile.transactionFreeLimit}
                                            width={windowWidth - 40}
                                            color="#5CC3B9"
                                            style={{ marginBottom: 15 }}
                                            height={20}
                                            borderWidth={0}
                                            borderRadius={10}
                                            unfilledColor="#D3EBE9"
                                        />
                                        <Text style={styles.textDescProgress}>Dapatkan GRATIS biaya transaksi pada transaksi ke-10!</Text>
                                    </View>
                                    <View style={{ marginBottom: 40 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={styles.titleProgress}>Riwayat Transaksi</Text>
                                            <TouchableOpacity style={{ marginTop: 8 }} onPress={() => this.props.navigation.navigate('Transaction')}>
                                                <Text style={styles.allTransaction}>Lihat Semua</Text>
                                            </TouchableOpacity>
                                        </View>
                                        {this.state.profile.transactions.map((item, j) => {
                                            return (
                                                <View style={styles.boxHistory} key={j}>
                                                    <View style={styles.historyCard}>
                                                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '15%' }}>
                                                            <Image
                                                                style={styles.iconHistory}
                                                                source={item.self_withdraw ? require('../../assets/icon/notificationList.png') : require('../../assets/icon/historyList.png')}
                                                            />
                                                        </View>
                                                        <View style={{ width: '85%' }}>
                                                            <Text style={styles.textSummary}>{item.self_withdraw ? 'Tarik tunai ke' : 'Transfer ke'}</Text>
                                                            <View style={styles.descSummary}>
                                                                <Text style={styles.historyDesc} numberOfLines={1}>{this.convertString(item.self_withdraw ? this.state.profile.profile.name : item.beneficiary_name)}</Text>
                                                                <Text style={styles.historyDesc}>Rp. {curency(item.amount)}</Text>
                                                            </View>
                                                            <View style={styles.descSummary}>
                                                                <Text style={styles.textSummary}>{date(item.created_at, 'time')}</Text>
                                                                <Text
                                                                    style={item.status === 0 ? styles.statusPending : item.status === 1 ? styles.statusApprove : styles.statusReject}
                                                                >
                                                                    {item.status === 0 ? 'Menunggu Konfirmasi' : item.status === 1 ? 'Disetujui' : 'Ditolak'}
                                                                </Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            )
                                        })}
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                        {this.state.isLoadingProcess ?
                            <View style={styles.overlay}>
                                <ActivityIndicator size="large" color="#3FAFA4" />
                            </View> : <View></View>
                        }
                    </View>
                    :
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#3FAFA4" />
                    </View>}
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
                            position: 'relative'
                        },
                        wrapper: {
                            backgroundColor: 'rgba(52, 52, 52, 0.8)',
                        },
                        draggableIcon: {
                            backgroundColor: '#B8B8B8',
                            width: 80
                        }
                    }}
                >
                    <View style={styles.RBSHeader}>
                        <Image
                            style={styles.imgBottom}
                            source={require('../../assets/icon/historyList.png')}
                        />
                        <View style={styles.RBSContent}>
                            <Text style={styles.titleRBS}>Withdraw Confirmation</Text>
                            <Text style={styles.descRBS}>Are you sure want to withdraw for
                                <Text style={{ color: '#283044', fontWeight: 'bold' }}> Rp. {curency(this.state.budget)}</Text>
                            </Text>
                        </View>
                        <View style={styles.actionRBS}>
                            <TouchableOpacity
                                style={styles.transferButton}
                                onPress={() => this.RBSheet.close()}
                            >
                                <Text style={styles.transfer}>No</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.widthrawButton} onPress={() => this.widthraw()}>
                                <Text style={styles.widthraw}>Yes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </RBSheet>
                <Toast config={toastConfig} style={{ zIndex: 100 }} ref={(ref) => Toast.setRef(ref)} />
                {modalVisible ?
                    <View style={styles.centeredView}>
                        <Modal
                            contentContainerStyle={styles.modalPosition}
                            animationType="fade"
                            transparent={true}
                            visible={modalVisible}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Pressable
                                        style={styles.positionClose}
                                        onPress={() => this.setModalVisible(!modalVisible)}
                                    >
                                        <Image style={styles.iconClose} source={require('../../assets/icon/close.png')} />
                                    </Pressable>
                                    <Image style={styles.iconModal} source={require('../../assets/icon/handshake.png')} />
                                    <Text style={styles.modalText}>Tarik Gajimu Yuks!</Text>
                                    <Text style={styles.modalDesc}>
                                        Tarik gajimu yang sudah kamu hasilkan
                                        kapan saja! Hal ini dihitung berdasarkan
                                        jumlah hari kerjamu yang sudah terpenuhi disetiap bulannya.
                                    </Text>
                                </View>
                            </View>
                        </Modal>
                    </View> : <View></View>
                }
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
export default connect(mapStateToProps, mapDispatchToProps)(Home);