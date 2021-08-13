<<<<<<< HEAD
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FormButton from '../components/FormButton';

const HomeScreen = () => {
    return (
        <View style={styles.text}>
            <Text style={styles.text}>Welcome</Text>
            <FormButton buttonTitle="Logout" onPress={() => {}} />
=======
import React, {useContext} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';

const HomeScreen = () => {
    const {user, logout} = useContext(AuthContext)
    return (
        <View style={styles.text}>
            <Text style={styles.text}>Welcome {user.uid}</Text>
            <FormButton buttonTitle="Logout" onPress={() => logout()} />
>>>>>>> tmp
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9fafd',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        fontSize: 20,
        color: '#333333',
    }
});