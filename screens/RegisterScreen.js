import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as firebase from 'firebase';

export default class RegisterScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    name: '',
    email: '',
    password: '',
    errorMessage: null
  };

  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(userCredentials => {
        return userCredentials.user.updateProfile({
          displayName: this.state.name
        });
      })
      .catch(error => this.setState({ errorMessage: error.message }));
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content'></StatusBar>

        <Image
          source={require('../assets/authHeader.png')}
          style={{ marginTop: -176, marginLeft: -50 }}
        ></Image>

        <Image
          source={require('../assets/authFooter.png')}
          style={{ position: 'absolute', bottom: -325, right: -225 }}
        ></Image>

        <TouchableOpacity
          style={styles.back}
          onPress={() => this.props.navigation.goBack('')}
        >
          <Ionicons
            name='ios-arrow-round-back'
            size={32}
            color='#FFF'
          ></Ionicons>
        </TouchableOpacity>

        <View
          style={{
            position: 'absolute',
            top: 64,
            alignItems: 'center',
            width: '100%'
          }}
        >
          <Text style={styles.greeting}>
            {'Hello!\nSign up to get started.'}
          </Text>
          <TouchableOpacity style={styles.avatar}>
            <Ionicons
              name='ios-add'
              size={40}
              color='#fff'
              style={{ marginTop: 6, marginLeft: 2 }}
            ></Ionicons>
          </TouchableOpacity>
        </View>

        <View style={styles.errorMessage}>
          {this.state.errorMessage && (
            <Text style={styles.error}> {this.state.errorMessage} </Text>
          )}
        </View>

        <View style={styles.form}>
          <View>
            <Text style={styles.inputTitle}>Full Name</Text>
            <TextInput
              style={styles.input}
              autoCapitalize='none'
              onChangeText={name => this.setState({ name })}
              value={this.state.name}
            ></TextInput>
          </View>

          <View style={{ marginTop: 32 }}>
            <Text style={styles.inputTitle}>Email Address</Text>
            <TextInput
              style={styles.input}
              autoCapitalize='none'
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            ></TextInput>
          </View>

          <View style={{ marginTop: 32 }}>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              autoCapitalize='none'
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            ></TextInput>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
          <Text style={{ color: '#fff', fontWeight: '500' }}>Sign up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ alignSelf: 'center', marginTop: 32 }}
          onPress={() => this.props.navigation.navigate('Login')}
        >
          <Text style={{ color: '#414959', fontSize: 13 }}>
            New to SocialApp?{' '}
            <Text style={{ fontWeight: '500', color: '#E9446A' }}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  greeting: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    color: '#FFF'
  },
  errorMessage: {
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30
  },
  error: {
    color: '#e9446a',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center'
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30
  },
  inputTitle: {
    color: '#8a8f9e',
    fontSize: 10,
    textTransform: 'uppercase'
  },
  input: {
    borderBottomColor: '#8a8f9e',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: '#161f3d'
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: '#E9446a',
    borderRadius: 4,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center'
  },
  back: {
    position: 'absolute',
    top: 48,
    left: 32,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(21,22,48,0.1)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e1e2e6',
    marginTop: 46,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
