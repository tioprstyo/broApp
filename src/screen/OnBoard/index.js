import React from 'react';
import { View, Dimensions, ImageBackground, Image, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


class OnBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: undefined,
            img:
            [
                {
                    logo: require('../../assets/img/logo-blue.png'),
                    background: require('../../assets/img/pattern-onboard1.png'),
                    img: require('../../assets/img/people1.png')
                },
                {
                    logo: require('../../assets/img/logoBroApp.png'),
                    background: require('../../assets/img/pattern-onboard2.png'),
                    img: require('../../assets/img/people2.png')
                },
                {
                    logo: require('../../assets/img/logoBroApp.png'),
                    background: require('../../assets/img/pattern-onboard3.png'),
                    img: require('../../assets/img/people3.png')
                }
            ],
            index: 0,
        };
    }

    componentDidMount() {
        this.storeData(true);
    }

    storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@onBoard', jsonValue);
        } catch (e) {
            // saving error
        }
    }
    
    jewelStyle = function (options) {
        const style = [
            {
                background: {
                    flex: 1,
                    height: windowHeight,
                    width: windowWidth,
                    position: 'relative',
                    backgroundColor: '#FFFFFF',
                },
                text: {
                    color: '#000000',
                    fontSize: 25,
                    fontFamily: "rubik",
                    fontWeight: '700',
                    alignItems: 'center',
                },
                textSlary: {
                    color: '#00B7A7',
                    fontSize: 25,
                    fontFamily: "rubik",
                    fontWeight: '700',
                    alignItems: 'center',
                }
            },
            {
                background: {
                    flex: 1,
                    height: windowHeight,
                    width: windowWidth,
                    position: 'relative',
                    backgroundColor: '#143586',
                },
                text: {
                    color: '#FFFFFF',
                    fontSize: 25,
                    fontFamily: "rubik",
                    fontWeight: '700',
                },
                textSlary: {
                    color: '#00B7A7',
                    fontSize: 25,
                    fontFamily: "rubik",
                    fontWeight: '700',
                    alignItems: 'center',
                }
            },
            {
                background: {
                    flex: 1,
                    height: windowHeight,
                    width: windowWidth,
                    position: 'relative',
                    backgroundColor: '#00B7A7',
                },
                text: {
                    color: '#000000',
                    fontSize: 25,
                    fontFamily: "rubik",
                    fontWeight: '700',
                },
                textSlary: {
                    color: '#FFFFFF',
                    fontSize: 25,
                    fontFamily: "rubik",
                    fontWeight: '700',
                    alignItems: 'center',
                }
            },
        ]
        return style[options];
    }

    people = function (options) {
        const style = [
            {
                width: windowWidth,
                height: 400,
                resizeMode: 'contain',
                bottom: 150,
                position: 'absolute',
            },
            {
                width: windowWidth,
                height: 500,
                resizeMode: 'contain',
                bottom: 150,
                position: 'absolute',
            },
            {
                width: windowWidth,
                height: 600,
                resizeMode: 'contain',
                bottom: 150,
                position: 'absolute',
            }
        ]
        return style[options];
    }

    handleSwipeIndexChange = (i) => {
        this.setState({ index: i })
    }

    _onPressButtonSkip = () => {
        this.props.navigation.navigate('Greetings');
    }

    prevButton = function () {
        return (
            <View style={styles.leftButton}>
                <Text style={styles.textButtonSkip}>Back</Text>
            </View>
        )
    }

    nextButton = function () {
        return (
            <View style={styles.rightButton}>
                <Text style={styles.textButtonNext}>Next</Text>
            </View>
        )
    }
    
    render() {
        return (
            <View style={{ flex: 1 }}>
                {!this.state.data ?
                    <Swiper
                        style={styles.wrapper}
                        scrollEnabled={false}
                        onIndexChanged={this.handleSwipeIndexChange.bind(this)}
                        dotStyle={this.state.index < 2 ? styles.dot : { display: 'none' }}
                        activeDotColor={'#293044'}
                        dotColor={'#6778A9'}
                        activeDotStyle={this.state.index < 2 ? styles.activeDot : { display: 'none' }}
                        showsButtons={true}
                        prevButton={this.state.index === 1 ? this.prevButton() : <View></View>}
                        nextButton={this.state.index < 2 ? this.nextButton() : <View></View>}
                        buttonWrapperStyle={styles.buttonControl}
                    >
                        {this.state.img.map((item, i) => {
                            return (
                                <View style={this.jewelStyle(i).background} key={i}>
                                    <View style={styles.header}>
                                        <Image
                                            style={styles.logo}
                                            source={item.logo}
                                        />
                                        <View style={{ alignItems: 'center' }}>
                                            <Text style={this.jewelStyle(i).textSlary}>Salary<Text style={this.jewelStyle(i).text}> right</Text></Text>
                                            <Text style={this.jewelStyle(i).text}>at your fingertips</Text>
                                        </View>
                                    </View>
                                    <View style={styles.images}>
                                        <ImageBackground source={item.background} style={styles.background}>
                                            <Image
                                                style={this.people(i)}
                                                source={item.img}
                                            />
                                        </ImageBackground>
                                    </View>
                                    <View style={styles.actionOnboard}>
                                        {i === 0 ?
                                            <View style={styles.slideAction1}>
                                                <TouchableOpacity style={styles.leftButton} onPress={this._onPressButtonSkip}>
                                                    <Text style={styles.textButtonSkip}>Skip</Text>
                                                </TouchableOpacity>
                                                
                                            </View>
                                            : i === 2 ?
                                                <View style={styles.styleAction3}>
                                                    <TouchableOpacity style={styles.endButton} onPress={this._onPressButtonSkip}>
                                                        <Text style={styles.textButtonNext}>Get Started</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                :
                                                <View>
                                                </View>
                                        }
                                    </View>
                                </View>
                            )
                        })}
                    </Swiper>
                    : <View></View>
                }
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return { users: state.user };
}
export default connect(mapStateToProps)(OnBoard);