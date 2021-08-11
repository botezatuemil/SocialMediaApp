import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { windowHeight, windowWidth } from '../utils/Dimensions';

import { Lato_400Regular } from '@expo-google-fonts/lato';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

const FormButton = ({buttonTitle, ...rest}) => {
    let [fontsLoaded, error] = useFonts ({
        Lato_400Regular,
      });
    
    if (!fontsLoaded) {
        return <AppLoading/>
    }

    return (
        <TouchableOpacity style={styles.buttonContainer} {...rest}>
            <Text style={styles.buttonText}>{buttonTitle}</Text>
        </TouchableOpacity>
    );
}

export default FormButton

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 10,
        width: '100%',
        height: windowHeight / 15,
        backgroundColor: '#2e64e5',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
    },
    buttonText: {
        fontSize: 18,
        //fontWeight: 'bold',
        color: '#ffffff',
        fontFamily: 'Lato_400Regular',
    }
});
