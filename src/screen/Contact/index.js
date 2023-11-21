import React from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, TextInput, Image, ActivityIndicator, PermissionsAndroid } from 'react-native';
import Contacts from 'react-native-contacts';
import { connect } from 'react-redux';
import styles from './style';

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: [],
            allList: [],
            search: '',
            backRoute: ''
        };
    }

    componentDidMount() {
        if (this.props.navigation.state.params) {
            this.setState({ backRoute: this.props.navigation.state.params.params });
        }
        this.permissions()
    }

    permissions = async () => {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
                title: "Contacts",
                message:
                    "This app would like to view your contacts.",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            this.loadKontak();
        } else {
            console.log("Contact permission denied");
        }
    }

    goToTop = () => {
        this.scroll.scrollTo({ x: 0, y: this.layout.y, animated: true });
    }

    loadKontak = async () => {
        await Contacts.getAll().then(kontak => {
            kontak.sort((a, b) => (a.displayName > b.displayName) ? 1 : -1)
            let data = kontak.reduce((r, e) => {
                // get first letter of name of current element
                let alphabet = e.displayName ? e.displayName[0].toLowerCase() : '';

                // if there is no property in accumulator with this letter create it
                if (alphabet && e.phoneNumbers.length > 0) {
                    if (!r[alphabet]) r[alphabet] = { alphabet, record: [e] }

                    // if there is push current element to children array for that letter
                    else r[alphabet].record.push(e);
                }
                // return accumulator
                return r;
            }, {});

            let result = Object.values(data);
            this.setState({ result: result, allList: result })
        })
    }

    handleInputChange = (search) => {
        this.setState({ search });
        // let data = this.state.result.filter(e => e.alphabet[0].toLowerCase() === search[0].toLowerCase());
        // data = data[0].record.filter(e => e.givenName.toLowerCase() === search.toLowerCase())
        // console.log(data);
    }

    setName = (val) => {
        let data = this.props.users;
        var phone = val.phoneNumbers;
        if (val.phoneNumbers.length > 0) {
            if ((phone[phone.length - 1].number).substring(0, 1) === '+') {
                phone = `0${(phone[phone.length - 1].number).substring(3)}`
            } else {
                phone = phone[phone.length - 1].number;
            }

            if (this.state.backRoute === 'signUp') {
                data.signUpPhone = phone;
                this.props.onTodoClick(data);
                this.props.navigation.navigate('SignUp');
            } else {
                data.request.options.beneficiaryName = val.displayName;
                data.request.options.phoneNumber = phone;
                this.props.onTodoClick(data);
                this.props.navigation.navigate('Transfer');
            }
        }
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff', paddingTop: 30, paddingLeft: '5%', paddingRight: '1%' }}>
                {/* <View style={{ marginBottom: 10 }}>
                    <TextInput
                        style={styles.formContact}
                        placeholder="Search"
                        placeholderTextColor="#878B95"
                        value={this.state.search}
                        onChangeText={this.handleInputChange}
                    />
                </View> */}
                {this.state.result.length > 0 ?
                    <View style={styles.container}>
                        <View style={styles.content}>
                            <ScrollView showsVerticalScrollIndicator={false} ref={(c) => { this.scroll = c }}>
                                {this.state.result.map((item, j) => {
                                    return (
                                        <View key={j}>
                                            <Text
                                                style={styles.title}
                                                onLayout={event => this.layout = event.nativeEvent.layout}
                                            >
                                                {item.alphabet.charAt(0).toUpperCase() + item.alphabet.slice(1)}
                                            </Text>
                                            {item.record.map((name, i) => {
                                                return (
                                                    <TouchableOpacity style={
                                                        i == 0 && i == (item.record.length - 1) ? styles.title2 :
                                                            i == 0 ? styles.title2first :
                                                                i == (item.record.length - 1) ? styles.title2last :
                                                                    styles.title2}
                                                        onPress={() => this.setName(name)}
                                                        key={i}
                                                    >
                                                        {name.hasThumbnail ?
                                                            <Image style={styles.avatar} source={{ uri: name.thumbnailPath }} />
                                                            :
                                                            <View style={styles.avatar}>
                                                                <Text style={styles.textAva}>{name.displayName[0].charAt(0).toUpperCase() + item.alphabet.slice(1)}</Text>
                                                            </View>}
                                                        <Text style={{ padding: 10, fontSize: 16, color: '#1C1C1E', fontWeight: 'bold' }}>{name.displayName}</Text>
                                                    </TouchableOpacity>
                                                )
                                            })}
                                        </View>
                                    )
                                })}
                            </ScrollView>
                        </View>
                        {/* <View style={{ marginTop: 20 }}>
                            {this.state.result.map((item, j) => {
                                return (
                                    <TouchableOpacity key={j} onPress={() => this.goToTop()}>
                                        <Text style={styles.abjad}>{item.alphabet.charAt(0).toUpperCase() + item.alphabet.slice(1)}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View> */}
                    </View>
                    :
                    <View style={styles.overlay}>
                        <ActivityIndicator size="large" color="#3FAFA4" />
                    </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(Contact);