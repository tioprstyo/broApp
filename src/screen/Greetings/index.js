import React from 'react';
import { Image, SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import styles from './style';


class Greetings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flag: require('../../assets/icon/ind.png'),
            logo: require('../../assets/img/greetings.png'),
            error: ''
        };
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.background}>
                    <View style={styles.content}>
                        <Image
                            source={this.state.logo}
                            style={styles.logo}
                        />
                        <Text style={styles.title}>Selamat Datang di Bro!</Text>

                        <Text style={styles.subtitle}>Aplikasi gajian instan pertama di Indonesia!</Text>
                        <Text style={styles.subtitle}>Sekarang kamu bisa tarik gajimu kapan aja.</Text>
                    </View>
                    <View style={styles.actionStart}>
                        <TouchableOpacity style={styles.btnStart} onPress={() => this.props.navigation.navigate('SignIn')}>
                            <Text style={styles.textButton}>Mulai Yuk!</Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                source={this.state.flag}
                                style={styles.flag}
                            />
                            <Text style={styles.descGreetings}>Bangga buatan Indonesia</Text>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

export default Greetings;