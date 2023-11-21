import React from 'react';
import { View, BackHandler, ImageBackground, Image, Text } from 'react-native';
import styles from './style';
import { connect } from 'react-redux';
import * as Progress from 'react-native-progress';


class SignUpNotification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            background: require('../../../assets/img/backgroundsignups.png'),
            logo: require('../../../assets/img/smiley.png'),
            status: '',
            timer: 172800,
            hours: '00',
            minutes: '00',
            seconds: '00'
        };
    }

    backAction = () => {
        BackHandler.exitApp()
        return true;
    };

    componentDidMount() {
        if (this.props.navigation.state.params) {
            this.setState({ status: this.props.navigation.state.params.params });
        }

        this.interval = setInterval(
            () => this.setState((prevState)=> ({ 
                timer: prevState.timer - 1, 
                hours: Math.floor((prevState.timer - 1)/3600),
                minutes: Math.floor((((prevState.timer - 1)%3600) / 60)),
                seconds: Math.floor((((prevState.timer - 1)%3600) % 60)),
                percentage: ((172800 - this.state.timer)/172800) * 10
            })),
            1000
        );

        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
    }

    componentDidUpdate(){
        if(this.state.timer === 1){ 
            clearInterval(this.interval);
        }
    }

    componentWillUnmount() {
        this.backHandler.remove();
        clearInterval(this.interval);
    }

    onCallHrd = () => {
        this.props.navigation.navigate('SignUp')
    }

    render() {
        return (
            <View>
                <ImageBackground source={this.state.background} style={styles.ImageBackground}>
                    <View style={styles.content}>
                        <Image
                            style={styles.logo}
                            source={this.state.logo}
                        />
                        { this.state.status === 'success' ?
                            <View>
                                <Text style={styles.title}>Selamat</Text>
                                <Text style={styles.subtitle}>Akunmu telah berhasil terdaftar!</Text>
                                <Text style={styles.subtitle}>Mohon tunggu persetujuan akses dari HRD</Text>
                                <Text style={styles.subtitle}>perusahaanmu ya!</Text>
                            </View>
                        :
                            <View>
                                <Text style={styles.title}>Oh, Snap!</Text>
                                <Text style={styles.subtitle}>Keliatannya perusahaanmu belum terdaftar</Text>
                                <Text style={styles.subtitle}>di BRO Network. Biar BRO cek dulu ya!</Text>
                            </View>
                        }

                        <View style={{ marginTop: 30, alignItems: 'center' }}>
                            <Progress.Bar 
                                progress={this.state.percentage} 
                                width={250} 
                                height={40} 
                                color={'#73BBB5'} 
                                unfilledColor={'#E5E5E5'} 
                                borderRadius={10} 
                                borderColor={'transparent'}
                            />
                            <Text style={styles.timer}> {this.state.hours} : {this.state.minutes} : {this.state.seconds} </Text>
                        </View>

                        <Text style={styles.progressDesc}>BRO akan menghubungi kembali dalam 48 jam.</Text>
                        <Text style={styles.registCompany} onPress={this.onCallHrd}>Mau lebih cepat? Klik disini</Text>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTodoClick: (user) => {
            dispatch({ type: 'SET_USER', input: user });
        }
    }
}
const mapStateToProps = (state) => {
    return { users: state.user };
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUpNotification);