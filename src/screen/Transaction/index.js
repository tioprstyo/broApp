import React from 'react';
import { BackHandler, View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView, ImageBackground } from 'react-native';
import HeaderIcon from '../../components/HeaderIcon';
import styles from './style';
import Toast, { BaseToast } from 'react-native-toast-message';
import { connect } from 'react-redux';
import env from '../../config/env';
import curency from './../../config/number';
import date from './../../config/date';

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
            filterList: [
                {
                    text: 'All',
                    value: ''
                },
                {
                    text: 'Disetujui',
                    value: 1,
                },
                {
                    text: 'Ditolak',
                    value: 2
                },
                {
                    text: 'Menunggu Konfirmasi',
                    value: 0
                },
            ],
            dataList: [],
            status: '',
            imageLeft: require('../../assets/img/headerLeft.png'),
        };
    }

    backAction = () => {
        this.props.navigation.navigate('Home')
        return true;
    };

    componentDidMount() {
        this.loadData(this.state.status);
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
    }

    loadData = async (filter) => {
        await fetch(`${env}/app/dashboard/request?status=${filter}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.props.users.token}`
            },
        }).then((response) => response.json())
            .then((json) => {
                if (json.meta.code === 200) {
                    this.setState({ dataList: json.data })
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

    componentWillUnmount() {
        this.backHandler.remove();
    }

    filter = (i) => {
        this.setState({ status: i });
        this.loadData(i)
    }

    convertString(val) {
        return ((val).length > 10) ?
            (((val).substring(0, 10)) + '...') :
            val
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
                        <Text style={styles.titleHeader}>Riwayat Transaksi</Text>
                    </View>
                </ImageBackground>
                <View style={styles.content}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={styles.filterContent}>
                            {this.state.filterList.map((item, i) => {
                                return (
                                    <TouchableOpacity style={this.state.status === item.value ? styles.boxFilterActive : styles.boxFilter} key={i} onPress={() => this.filter(item.value)}>
                                        <View>
                                            <Text style={this.state.status === item.value ? styles.textFilterActive : styles.textFilter}>
                                                {item.text}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.list}>
                    {this.state.dataList.length > 0 ?
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View>
                                {this.state.dataList.map((item, j) => {
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
                                                        <Text style={styles.historyDesc}>{this.convertString(item.self_withdraw ? this.props.users.user.profile.name : item.beneficiary_name)}</Text>
                                                        <Text style={styles.historyDesc}>Rp. {curency(item.amount)}</Text>
                                                    </View>
                                                    <View style={styles.descSummary}>
                                                        <Text style={styles.textSummary}>{date(item.created_at, 'time')}</Text>
                                                        <Text
                                                            style={item.status === 0 ? styles.statusPending : item.status === 1 ? styles.statusApprove : styles.statusReject}
                                                        >
                                                            {item.statusString.includes('Menunggu') ? 'Menunggu Konfirmasi' : item.statusString}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                })}
                            </View>
                        </ScrollView>
                        :
                        <View style={styles.nullList}>
                            <Image style={styles.imgNullList} source={require('../../assets/img/history.png')} />
                            <Text style={styles.textNullList}>Tidak ada transaksi</Text>
                            <Text style={styles.textDescNull}>Anda belum melakukan transaksi apa pun.</Text>
                        </View>
                    }
                </View>
                <Toast style={{ zIndex: 10 }} config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => {
    return { users: state.user, transactions: state.transactions };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTodoClick: (user) => {
            dispatch({ type: 'SET_USER', input: user });
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Transaction);