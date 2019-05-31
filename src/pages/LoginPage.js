import React from 'react';
import { TextInput, StyleSheet, ScrollView, View, Button, Image, KeyboardAvoidingView, ActivityIndicator, Alert } from 'react-native';

import FormRow from '../components/FormRow';
import firebase from 'firebase';
import firebaseConfig from '../components/FirebaseAPI';

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            paswd: '',
            isLoading: false,
            message: "",
        };
    }

    componentDidMount() {
        firebase.initializeApp(firebaseConfig);
    }

    onChangeHandler(field, value) {
        this.setState({ [field]: value});
    }

    getMsgByErrorCode(errorCode) {
        switch (errorCode) {
            case "auth/wrong-password":
                return "Incorrect password."
            case "auth/invalid-email":
                return "Incorrect e-mail."
            case "auth/user-not-found":
                return "User not found."
            case "auth/user-disabled":
                return "User disabled."
            case "auth/email-already-in-use":
                return "User already in use."
            case "auth/operation-not-allowed":
                return "Operation not permitted."
            case "auth/weak-password":
                return "Weak password."
            default:
                return "Unknown error."
        }
    }

    accessApp() {
        this.setState({ isLoading: false });
        this.props.navigation.replace('Habits');
    }

    login() {
        this.setState({isLoading: true, message: ''});
        const { email, paswd } = this.state;

        return firebase
            .auth()
            .signInWithEmailAndPassword(email, paswd)
            .then(user => {
                this.accessApp();
            })
            .catch(error => {
                this.setState({
                    message: this.getMsgByErrorCode(error.code),
                    isLoading: false
                });
            })
    }

    registration() {
        const { email, paswd } = this.state;

        if (!email || !paswd) {
            Alert.alert(
                "Registration.",
                "To register, inform e-mail and password."
            );

            return null;
        }
        Alert.alert(
            "Registration.",
            "Do you like to register your user?",
            [{
                text: "CANCEL",
                style: 'cancel'
            },{
                text: "REGISTER",
                onPress: () => { this.register() }
            }],
        );
    }

    register() {
        const { email, paswd } = this.state;

        return firebase
            .auth()
            .createUserWithEmailAndPassword(email, paswd)
            .then(user => {
                this.accessApp();
            })
            .catch(error => {
                this.setState({
                    message: this.getMsgByErrorCode(error.code),
                    isLoading: false
                });
            })
    }

    renderButton() {
        if (this.state.isLoading)
            return <ActivityIndicator size = "large" style = { styles.loading } />;

        return (
            <View>
                <View style = { styles.btn }>
                    <Button
                        title = 'LOGIN'
                        color = '#6542f4'
                        onPress = { () => this.login() }
                    />
                </View>
                <View style = { styles.btn }>
                    <Button
                        title = 'REGISTER'
                        color = '#a08af7'
                        onPress = { () => this.registration() }
                    />
                </View>
            </View>
        )
    }

    renderMessage() {
        const { message } = this.state;
        if (!message)
            return null;

        Alert.alert (
            "Error!",
            message.toString(),
            [{
                text: 'OK',
                onPress: () => { this.setState({ message: '' }); }
            }]
        );
    }

    render() {
        return (
            <KeyboardAvoidingView behavior = "padding" enabled style = {{flex: 1}}>
                <ScrollView style = { styles.container }>
                    <View style = { styles.logoView }>
                        <Image
                            source = { require('../img/logo.jpg') }
                            style = { styles.logo }
                        />
                    </View>
                    <FormRow>
                        <TextInput
                            style = { styles.input }
                            placeholder = "user@email.com"
                            keyboardType = "email-address"
                            value = { this.state.email }
                            onChangeText = { value => this.onChangeHandler('email', value)}
                        />
                    </FormRow>
                    <FormRow>
                        <TextInput
                            style = { styles.input }
                            placeholder = "**********"
                            secureTextEntry
                            value = { this.state.paswd }
                            onChangeText = { value => this.onChangeHandler('paswd', value)}
                        />
                    </FormRow>
                    { this.renderButton() }
                    { this.renderMessage() }
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2C1526',
        paddingRight: 10,
        paddingLeft: 10,
    },
    input: {
        paddingTop: 10,
        paddingRight: 5,
        paddingLeft: 5,
        paddingBottom: 10,
    },
    btn: {
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: 11,
    },
    logo: {
        aspectRatio: 1,
        resizeMode: "center",
        width: 400,
        height: 400,
    },
    logoView: {
        justifyContent: "center",
        alignItems: "center",
    },
    loading: {
        padding: 10,
    }
});