import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './style';
import { connect } from 'react-redux';


class Confirmation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: require('../../assets/icon/confirmation.png'),
            close: require('../../assets/icon/ic_close.png')
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
                <Text style={styles.titlePage}>Berhasil Mendaftar!</Text>
                <Text style={styles.descPage}>Pengajuan datamu untuk bergabung telah berhasil dikirim</Text>
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
export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);