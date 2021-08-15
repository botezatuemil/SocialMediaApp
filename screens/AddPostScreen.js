import React, {useState} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { InputWrapper, InputField } from '../styles/AddPost';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
//import ImagePicker from 'react-native-image-crop-picker';
import * as ImagePicker from 'expo-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';


const AddPostScreen = () => {
    
    const [selectedImage, setSelectedImage] = React.useState(null);
    
    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
    
        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        console.log(pickerResult);
    
        if (pickerResult.cancelled === true) {
            return;
        }
    
        setSelectedImage({ localUri: pickerResult.uri });
    }
  
    if (selectedImage !== null) {
        return (
                
            <View style={styles.container}>

                <Image
                    source={{ uri: selectedImage.localUri }}
                    style={styles.thumbnail}
                />

                <InputWrapper>
                    <InputField
                        placeholder="What's on your mind?"
                        multiline
                        numberOfLines={4}
                    />
                </InputWrapper>

                <ActionButton buttonColor="rgba(231,76,60,1)">
                    <ActionButton.Item buttonColor='#9b59b6' title="Take Photo" onPress={() => {}}>
                        <Icon name="camera-outline" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#3498db' title="Choose Photo" onPress={openImagePickerAsync}>
                        <Icon name="md-images-outline" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <InputWrapper>
                <InputField
                    placeholder="What's on your mind?"
                    multiline
                    numberOfLines={4}
                />
            </InputWrapper>

            <ActionButton buttonColor="rgba(231,76,60,1)">
                <ActionButton.Item buttonColor='#9b59b6' title="Take Photo" onPress={() => {}}>
                    <Icon name="camera-outline" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#3498db' title="Choose Photo" onPress={openImagePickerAsync}>
                    <Icon name="md-images-outline" style={styles.actionButtonIcon} />
                </ActionButton.Item>
            </ActionButton>
        </View>
    );
}

export default AddPostScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    wrapper: {

    },
    thumbnail: {
        width: 300,
        height: 300,
        resizeMode: "contain"
    }
})