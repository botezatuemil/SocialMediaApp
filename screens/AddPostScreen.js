import React, {useState} from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';

import { 
    InputWrapper, 
    InputField, 
    AddImage,
    SubmitBtn,
    SubmitBtnText,
    StatusWrapper, 
} from '../styles/AddPost';

import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
//import ImagePicker from 'react-native-image-crop-picker';
import * as ImagePicker from 'expo-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
//import storage from '@react-native-firebase/storage';
import {app} from '../firebase';


const AddPostScreen = () => {
    
    const [selectedImage, setSelectedImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);

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
    
    const submitPost = async() => {
        // const blob = await new Promise((resolve, reject) => {
        //     const xhr = new XMLHttpRequest();
        //     xhr.onload = function() {
        //         resolve(xhr.response);
        //     };
        //     xhr.onerror = function() {
        //         reject(new TypeError("Network request failed"));
        //     };
        //     xhr.responseType = 'blob';
        //     xhr.open('GET', uri, true);
        //     xhr.send(null);
        // });
       

        const uploadUri = selectedImage.localUri;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

        setUploading(true)

        try {
            await app.storage().ref(filename).put(uploadUri)
            setUploading(false);
            Alert.alert();
        } catch(e) {
            console.log(e)
        }
        setSelectedImage(null);
    }  
    
    const uploadImage = async() => {
        const response = await fetch(selectedImage.localUri)
        const blob = await response.blob();
        var ref = app.storage().ref().child("FolderName");

        try {
            await ref.put(blob);
            setUploading(false);
            Alert.alert();
        } catch(e) {
            console.log(e)
        }
        setSelectedImage(null); 
        
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

                <SubmitBtn onPress={uploadImage}>
                    <SubmitBtnText>Post</SubmitBtnText>
                </SubmitBtn>

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