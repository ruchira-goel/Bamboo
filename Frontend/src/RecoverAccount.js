import React, {Component} from 'react';
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    Platform,
    Alert,
    TouchableOpacity,
} from 'react-native';
import URL from './url';
import * as Constants from './Constants';

export default class RecoverAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            borderColor: Constants.COLORS.gray,
        };
    }

    onFocus() {
        this.setState({
            borderColor: Constants.COLORS.primary.main,
        });
    }

    onBlur() {
        this.setState({
            borderColor: Constants.COLORS.gray,
        });
    }

    sendEmail = () => {
        const {email} = this.state;
        if (!email) {
            Alert.alert('Email Empty', 'Please enter an email.', [{text: 'OK'}]);
            return;
        }
        const expression = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
        if (!expression.test(String(email).toLowerCase())) {
            Alert.alert(
                'Not Valid',
                'Ensure that the email is valid.',
                [{text: 'OK'}],
            );
            return;
        }
        fetch(
            Platform.OS === 'android'
                ? `${URL.android}/User/recoverAccount?email=${email}`
                : `${URL.ios}/User/recoverAccount?email=${email}`,
        )
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.error) {
                    if (data.message === "This email isn't registered yet") {
                        Alert.alert('Not registered', data.message, [{text: 'OK'}]);
                    } else if (data.message === "Couldn't send email") {
                        Alert.alert(
                            data.message,
                            "Couldn't send email at this time, please try again later.",
                            [{text: 'OK'}],
                        );
                    }
                } else {
                    //TODO: Add loading bar
                    Alert.alert('Check Your Inbox', 'Email has been successfully sent.', [
                        {text: 'OK'},
                    ]);
                }
            });
    };

    enterEmail = () => {
        return (
            <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={styles.heading}>Forgot your password?</Text>
                <Text style={styles.text}>
                    Enter your email and we'll send you a password reset link.
                </Text>
                <TextInput
                    onBlur={() => this.onBlur()}
                    onFocus={() => this.onFocus()}
                    style={[styles.fieldText, {borderColor: this.state.borderColor}]}
                    autoCapitalize="none"
                    placeholder="Enter email"
                    onChangeText={email => this.setState({email})}
                />
                <TouchableOpacity style={styles.btnStyle} onPress={this.sendEmail}>
                    <Text style={styles.btnText}>Send email</Text>
                </TouchableOpacity>
            </View>
        );
    };

    render() {
        return <View style={{flex: 1}}>{this.enterEmail()}</View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 45,
    },
    heading: {
        fontSize: 20,
        marginTop: 20,
        marginBottom: 10,
    },
    inputContainer: {
        flexDirection: 'row',
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        width: Constants.DIMENSIONS.screenWidth * 0.75,
    },
    btnText: {
        fontSize: 16,
        textAlign: 'center',
    },
    switch: {
        textAlign: 'center',
        justifyContent: 'center',
    },
    fieldText: {
        fontSize: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderRadius: 4,
        padding: 10,
        marginVertical: 30,
        width: Constants.DIMENSIONS.screenWidth * 0.75,
    },
    btnStyle: {
        width: Constants.DIMENSIONS.screenWidth * 0.75,
        backgroundColor: Constants.COLORS.primary.main,
        borderRadius: 4,
        borderColor: Constants.COLORS.primary.main,
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
