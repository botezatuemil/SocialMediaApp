import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';

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
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
//import storage from '@react-native-firebase/storage';
import {app, db} from '../firebase'
import firebase from 'firebase';

import { AuthContext } from '../navigation/AuthProvider';


const AddPostScreen = () => {
    
    const {user, logout} = useContext(AuthContext);
    const [selectedImage, setSelectedImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const [post, setPost] = useState(null);

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
    
    const submitPost = async () => {
        const imageUrl = await uploadImage();
        console.log('Image URL: ', imageUrl);

        firebase.firestore();
        db.collection('posts')
        .add ({
            userId: user.uid,
            post: post, 
            postImg: imageUrl, 
            postTime: firebase.firestore.Timestamp.fromDate(new Date()),
            likes: null, 
            comments: null,
        })
        .then(() => {
            console.log('Post added!');
            Alert.alert(
                "Post published!",
                "Your image was successfully uploaded to the Firebase Storage"
            );
            setPost(null);
        })
        .catch((error) => {
            console.log('Something went wrong', error)
        })
    }

    const uploadImage = async() => {

        // if (selectedImage == null) {
        //     return null;
        // }
        const response = await fetch(selectedImage.localUri)
        const blob = await response.blob();
        //var ref = app.storage().ref().child(new Date().toISOString());

        var filename = new Date().toISOString();

        setUploading(true);
        setTransferred(0);

        const storageRef = app.storage().ref(`photos/${filename}`)
        const task = storageRef.put(blob);

        //Set transferred State
        task.on('state_changed', taskSnapshot => {
            console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
            setTransferred (
                Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
            );
        });
          

        try {
            await task;
            const url = await storageRef.getDownloadURL();
            setUploading(false);
            setSelectedImage(null);
            return url;
        } catch(e) {
            console.log(e);
            return null;
        }
             
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
                        value={post}
                        onChangeText={(content) => setPost(content)}
                    />
                    {uploading ? (
                        <StatusWrapper>
                            <Text>{transferred} % Completed!</Text>
                            <ActivityIndicator size="large" color="#0000ff"/>
                        </StatusWrapper>
                    ) : (
                        <SubmitBtn onPress={submitPost}>
                            <SubmitBtnText>Post</SubmitBtnText>
                        </SubmitBtn>
                    )}
                    

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