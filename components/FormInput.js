import React from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { windowHeight, windowWidth } from '../utils/Dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { Lato_400Regular } from '@expo-google-fonts/lato';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

const FormInput = ({LabelValue, placeholderText, iconType, ...rest}) => {
    let [fontsLoaded, error] = useFonts ({
        Lato_400Regular,
      });
    
    if (!fontsLoaded) {
        return <AppLoading/>
    }
    
    return (
        <View style={styles.inputContainer}>
            <View style={styles.iconStyle}>
                <AntDesign name={iconType} size={25} color={'#666666'} />
            </View>
            <TextInput 
                style={styles.input}
                value={LabelValue}
                numberOfLines={1}
                placeholder={placeholderText}
                placeholderTextColor='#666666'  
                {...rest}  
            />
        </View>
    );
}

export default FormInput

const styles = StyleSheet.create({
    inputContainer: {
        marginTop: 5,
        marginBottom: 10,
        width: '100%',
        height: windowHeight / 15,
        borderColor: '#ccc',
        borderRadius: 3,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
      },
      iconStyle: {
        padding: 10,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightColor: '#ccc',
        borderRightWidth: 1,
        width: 50,
      },
      input: {
        padding: 10,
        flex: 1,
        fontSize: 16,
        fontFamily: 'Lato_400Regular',
        color: '#333',
        justifyContent: 'center',
        alignItems: 'center',
      },
      inputField: {
        padding: 10,
        marginTop: 5,
        marginBottom: 10,
        width: windowWidth / 1.5,
        height: windowHeight / 15,
        fontSize: 16,
        borderRadius: 8,
        borderWidth: 1,
      },
});
