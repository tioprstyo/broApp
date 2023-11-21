import React from 'react';
import { View, Text, Image, BackHandler, ScrollView, SafeAreaView, RefreshControl, ImageBackground, TouchableOpacity } from 'react-native';
import HeaderIcon from './../../components/HeaderIcon';
import styles from './style';
import Toast, { BaseToast } from 'react-native-toast-message';
import date from './../../config/date';
import env from '../../config/env';
import { connect } from 'react-redux';

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

class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterList: [
                {
                    text: 'All',
                    value: ''
                },
                {
                    text: 'Approve',
                    value: 2,
                },
                {
                    text: 'Pending',
                    value: 1
                },
                {
                    text: 'Rejected',
                    value: 3
                },
            ],
            dataList: [],
            loadingRefresh: false,
            imageLeft: require('../../assets/img/headerLeft.png'),
        };
    }

    backAction = () => {
        this.props.navigation.navigate('Home')
        return true;
    };

    componentDidMount() {
        this.loadData();
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
    }

    loadData = async () => {
        let data = this.props.users;
        await fetch(`${env}/app/dashboard/notifications`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${data.token}`
            },
        }).then((response) => response.json())
            .then((json) => {
                if (json.meta.code === 200) {
                    this.setState({ dataList: json.data, loadingRefresh: false })
                    json.data.map((item, index) => !item.state ? this.readNotif(item.id, index) : '')
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

    onRefresh = () => {
        this.setState({ loadingRefresh: true });
        this.loadData();
    }

    readNotif = async (id, index) => {
        let data = this.props.users;
        await fetch(`${env}/app/dashboard/notifications/${id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${data.token}`
            },
        }).then((response) => response.json())
            .then((json) => {
                console.log('The notification has been read')
            })
            .catch((error) => {
                Toast.show({
                    type: 'my_custom_type',
                    props: { text1: 'Maaf Bro, koneksi kamu bermasalah' },
                    position: 'bottom',
                });
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
                        <Text style={styles.titleHeader}>Notifikasi</Text>
                    </View>
                </ImageBackground>
                <View style={styles.list}>
                    {this.state.dataList.length > 0 ?
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.loadingRefresh}
                                    onRefresh={this.onRefresh}
                                />
                            }
                        >
                            <View>
                                {this.state.dataList.map((item, j) => {
                                    return (
                                        <View
                                            style={item.state ? styles.boxHistory : styles.boxHistoryUnread}
                                            key={j}
                                        >
                                            <View style={styles.historyCard}>
                                                <View style={{ justifyContent: 'center', alignItems: 'center', width: '15%' }}>
                                                    <Image
                                                        style={styles.iconHistory}
                                                        source={
                                                            item.title_slug.includes('adv') ?
                                                                require('../../assets/icon/notificationList.png') :
                                                                item.title_slug.includes('request') ?
                                                                    require('../../assets/icon/historyList.png') :
                                                                    require('../../assets/icon/userList.png')}
                                                    />
                                                </View>
                                                <View style={{ width: '85%' }}>
                                                    <Text style={styles.historyDesc}>{item.title}</Text>
                                                    <Text style={styles.textSummary}>{item.content}</Text>
                                                    <Text style={styles.textSummary}>{date(item.created_at, 'time')}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                })}
                            </View>
                        </ScrollView>
                        :
                        <View style={styles.nullList}>
                            <Image style={styles.imgNullList} source={require('../../assets/img/notification.png')} />
                            <Text style={styles.textNullList}>Belum ada notifikasi</Text>
                            <Text style={styles.textDescNull}>Pantau terus! Notifikasi tentang aktivitas Anda</Text>
                            <Text style={styles.textDescNull}>akan ditampilkan di sini.</Text>
                        </View>
                    }
                </View>
                <Toast style={{ zIndex: 10 }} config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
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
export default connect(mapStateToProps, mapDispatchToProps)(Notification);