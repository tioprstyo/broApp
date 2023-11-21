import React from 'react';
import { View, Text, Image, TouchableOpacity, BackHandler, ImageBackground } from 'react-native';
import HeaderIcon from '../../../../components/HeaderIcon';
import styles from './style';
import curency from './../../../../config/number';
import { connect } from 'react-redux';


class RequestFailed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: require('../../../../assets/icon/close_failed.png'),
            close: require('../../../../assets/icon/ic_close.png'),
            imageLeft: require('../../../../assets/img/headerLeft.png'),
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
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    close = () => {
        this.props.navigation.navigate('Home');
    }

    
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={this.state.imageLeft} style={styles.ImageBackground}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.headerIconLeft}>
                            <TouchableOpacity style={{ textAlign: 'center', marginLeft: 20 }} onPress={() => this.props.navigation.navigate('Home')}>
                                <View style={{ flexDirection: 'row', width: 28, height: 28 }}>
                                    <Image
                                        style={{ width: 25, height: 12 }}
                                        source={require('../../../../assets/icon/backArrow.png')}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.headerIcon}>
                            <HeaderIcon navigation={this.props.navigation} />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.titleHeader}>Transaksi Gagal</Text>
                    </View>
                </ImageBackground>
                <View style={styles.content}>
                    <Image
                        source={this.state.image}
                    />
                    <Text style={styles.titlePage}>{this.props.users.request.type === 1 ? 'Penarikan' : 'Transfer ke Teman' } Gagal!</Text>
                    <Text style={styles.descPage}>
                        {this.props.users.request.type === 1 ? 'Penarikan' : 'Transfer ke Teman' } sejumlah
                        <Text style={{ fontWeight: 'bold', color: '#283044' }}> Rp. {curency(this.props.users.request.amount)} </Text>
                        telah gagal.
                    </Text>
                    <View style={styles.actionClose}>
                        <TouchableOpacity style={styles.btnClose} onPress={this.close}>
                            <Text style={{ color: '#283044', textAlign: 'center', fontWeight: '700' }}>Balik ke Home</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(RequestFailed);