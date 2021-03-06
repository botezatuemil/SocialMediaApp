import React, {useState, useContext, useEffect} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground, TextInput, KeyboardAvoidingView, Alert } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import * as ImagePicker from 'expo-image-picker';

import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';
import firebase from 'firebase';
import { db, app } from '../firebase';

const EditProfileScreen = ({navigation}) => {

    const {user, logout} = useContext(AuthContext);
    const [selectedImage, setSelectedImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userData, setUserData] = useState(null);

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


    const getUser = async() => {
        const currentUser = await firebase.firestore()
        db.collection('users')
        .doc(user.uid)
        .get()
        .then((documentSnapshot) => {
            if (documentSnapshot.exists) {
                setUserData(documentSnapshot.data());
            }
        })

    }

    const handleUpdate = async() => {
        let imgUrl = await uploadImage();
         
        if (imgUrl == null && userData.userImg) {
            imgUrl = userData.userImg;
        }

        firebase.firestore();
        db.collection('users')
        .doc(user.uid)
        .set({
            fname: userData.fname,
            lname: userData.lname,
            phone: userData.phone,
            email: userData.email,
            country: userData.country,
            city: userData.city,
            userImg: imgUrl,
        })
        .then(() => {
            console.log('User updated!');
            Alert.alert(
                'Profile updated!',
                'Your profile has been successfully updated.'
            )
        })
    }

    const uploadImage = async() => {

        if (selectedImage == null) {
            return null;
        }
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

    useEffect(() => {
        getUser();
    }, [])

    const renderInner = () => (
        <View style={styles.panel}>
            <View style={{alignItems: 'center'}}>
                <Text style={styles.panelTitle}>Upload photo</Text>
                <Text style={styles.panelSubtitle}>Choose your profile picture</Text>
            </View>

            <TouchableOpacity style={styles.panelButton}>
                <Text style={styles.panelButtonTitle}>Take Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.panelButton} onPress={openImagePickerAsync} >
                <Text style={styles.panelButtonTitle}>Choose from Library</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.panelButton} onPress={() => bs.current.snapTo(1)}>
                <Text style={styles.panelButtonTitle}>Cancel</Text>
            </TouchableOpacity>
        </View>
    )

    const renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.panelHeader}>
                <View style={styles.panelHandle}>
                </View>
            </View>
        </View>
    )
    
    let bs = React.createRef();
    let fall = new Animated.Value(1);

    return (
        <View style={styles.container}>
            <BottomSheet
                ref={bs}
                snapPoints={[330, 0]}
                renderContent={renderInner}
                renderHeader={renderHeader}
                initialSnap={1}
                callbackNode={fall}
                enabledGestureInteraction={true}
                enabledContentTapInteraction={false} 
            />
            <Animated.View style={{margin: 20, opacity: Animated.add(0.3, Animated.multiply(fall, 1.0))}}>
                <View style={{alignItems: 'center'}}>
                    <TouchableOpacity  onPress={() => bs.current.snapTo(0)}>
                        <View style={{
                            height: 100,
                            width: 100,
                            borderRadius: 100,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            
                            
                            <ImageBackground
                                source={{ 
                                    uri: selectedImage
                                    ? selectedImage.localUri
                                    : userData
                                    ? userData.userImg ||
                                      'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
                                    : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
                                }}
                                style={{height: 100, width: 100,}}
                                imageStyle={{borderRadius: 15}}
                            >
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Icon name="camera" size={35} color="#fff" style={{
                                        opacity: 0.7,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderWidth: 1,
                                        borderColor: '#fff',
                                        borderRadius: 10,
                                    }}
                                    />
                                </View>
                            </ImageBackground>
                        </View>
                    </TouchableOpacity>

                    <Text style={{marginTop: 10, fontSize: 20, fontWeight: 'bold'}}>
                        {userData ? userData.fname : ''} {userData ? userData.lname : ''}
                    </Text>
                </View>

                <View style={styles.action}>
                    <FontAwesome name="user-o" size={20} />
                    <TextInput
                        placeholder="First name"
                        placeholderTextColor="#666666"
                        autoCorect={false}
                        style={styles.textInput}
                        value={userData ? userData.fname : ''}
                        onChangeText={(txt) => setUserData({...userData, fname: txt})}
                    />
                </View>

                <View style={styles.action}>
                    <FontAwesome name="user-o" size={20} />
                    <TextInput
                        placeholder="Last name"
                        placeholderTextColor="#666666"
                        autoCorect={false}
                        style={styles.textInput}
                        value={userData ? userData.lname : ''}
                        onChangeText={(txt) => setUserData({...userData, lname: txt})}
                    />
                </View>

                <View style={styles.action}>
                    <Feather name="phone" size={20} />
                    <TextInput
                        placeholder="Phone"
                        placeholderTextColor="#666666"
                        keyboardType="number-pad"
                        autoCorect={false}
                        style={styles.textInput}
                        value={userData ? userData.phone : ''}
                        onChangeText={(txt) => setUserData({...userData, phone: txt})}
                    />
                </View>

                <View style={styles.action}>
                    <FontAwesome name="envelope-o" size={20} />
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor="#666666"
                        keyboardType="email-address"
                        autoCorect={false}
                        style={styles.textInput}
                        value={userData ? userData.email : ''}
                        onChangeText={(txt) => setUserData({...userData, email: txt})}
                    />
                </View>

                <View style={styles.action}>
                    <FontAwesome name="globe" size={20} />
                    <TextInput
                        placeholder="Country"
                        placeholderTextColor="#666666"
                        autoCorect={false}
                        style={styles.textInput}
                        value={userData ? userData.country : ''}
                        onChangeText={(txt) => setUserData({...userData, country: txt})}
                    />
                </View>

                <KeyboardAwareScrollView style={styles.action}>
                    <Icon name="map-marker-outline" size={20} />
                    <TextInput
                        placeholder="City"
                        placeholderTextColor="#666666"
                        autoCorect={false}
                        style={styles.textInput, {marginTop: -25, marginLeft: 28}}
                        value={userData ? userData.city : ''}
                        onChangeText={(txt) => setUserData({...userData, city: txt})}
                    />
                </KeyboardAwareScrollView >

                {/* <TouchableOpacity style={styles.commandButton} }>
                    <Text style={styles.panelButtonTitle}>Submit</Text>
                </TouchableOpacity> */}
                <FormButton buttonTitle="Update" onPress={handleUpdate}/>

            </Animated.View>
        </View>
    )
}

export default EditProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
    commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginTop: 10,
        width: 350,
        alignSelf: 'center',
    },
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
    },
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: {width: -1, height: -3},
        shadowRadius: 2,
        shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    panelTitle: {
        fontSize: 24,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#2e64e5',
        alignItems: 'center',
        marginVertical: 7,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -4,
        paddingLeft: 10,
        color: '#05375a',
    },
});