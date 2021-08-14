import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, Platform } from 'react-native';

import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { Lato_400Regular, Lato_700Bold_Italic, Lato_700Bold } from '@expo-google-fonts/lato';

import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import { AuthContext } from '../navigation/AuthProvider';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const {login} = useContext(AuthContext);
    const {signinWithGoogle} = useContext(AuthContext);

    let [fontsLoaded, error] = useFonts ({
      Lato_400Regular,
      Lato_700Bold_Italic,
      Lato_700Bold
    });

    if (!fontsLoaded) {
        return <AppLoading/>
    } 

    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/rn-social-logo.png')}
          style={styles.logo}
        />
        <Text style={styles.text}>Social App PP</Text>

        <FormInput 
          LabelValue={email}
          onChangeText={(userEmail) => setEmail(userEmail)}
          placeholderText="Email"
          iconType="user"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <FormInput 
          LabelValue={password}
          onChangeText={(userPassword) => setPassword(userPassword)}
          placeholderText="Password"
          iconType="lock"
          secureTextEntry={true}
        />

        <FormButton
          buttonTitle="Sign In"
          onPress={() => login(email, password)}
        />

        <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
          <Text style={styles.navButtonText}>Forgot Password?</Text>
        </TouchableOpacity>

        {Platform.OS == 'android' ? (
        <View>
          <SocialButton
            buttonTitle="Sign in with Facebook"
            btnType="facebook"
            color="#4867aa"
            backgroundColor="#e6eaf4"
            onPress={() => {}}
          />

          <SocialButton
            buttonTitle="Sign in with Google"
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
            onPress={() => signinWithGoogle()}
          />
        </View>
        ) : null}

        <TouchableOpacity style={styles.forgotButton} onPress={() => {navigation.navigate('Signup')}}>
          <Text style={styles.navButtonText}>Don't have an account? Create here</Text>
        </TouchableOpacity>
      </View>  
    );
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
  },
  text: {
    fontFamily: 'Lato_700Bold_Italic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    color: '#2e64e5',
    fontFamily: 'Lato_700Bold',
  },
});
