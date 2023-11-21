import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './style';
import { connect } from 'react-redux';


class OtpConfirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: require('../../../assets/icon/close_failed.png'),
            close: require('../../../assets/icon/ic_close.png')
        };
    }

    close = () => {
        this.props.navigation.navigate('SignIn');
    }

    
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.iconClose} onPress={this.close}>
                    <Image
                        source={this.state.close}
                    />
                </TouchableOpacity>
                <Image
                    source={this.state.image}
                />
                <Text style={styles.titlePage}>Anda telah memasukkan OTP yang salah 3 kali</Text>
                <Text style={styles.descPage}>Silakan coba lagi dengan memberikan nomor ponsel Anda lagi dan masukkan kode verifikasi yang benar</Text>
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
export default connect(mapStateToProps, mapDispatchToProps)(OtpConfirm);