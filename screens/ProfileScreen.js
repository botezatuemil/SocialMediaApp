import React, { useContext, useState, useEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'

import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';
import EditProfileScreen from './EditProfileScreen';

import PostCard from '../components/PostCard';

import { db, app } from '../firebase';
import firebase from 'firebase';

const ProfileScreen = ({navigation, route}) => {
    const {user, logout} = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleted, setDeleted] = useState(false);
    const [userData, setUserData] = useState(null);

      
    const fetchPosts = async() => {
      try {
        const list = [];
        await firebase.firestore();
        await db.collection('posts')
        .where('userId', '==', route.params ? route.params.userId : user.uid)
        .orderBy('postTime', 'desc')
        .get()
        .then((querySnapshot) => {
            querySnapshot.docs.forEach((doc) => {
              const {userId, post, postImg, postTime, likes, comments} = doc.data();
              list.push({
              id: doc.id,
              userId,
              userName: 'Test name',
              userImg: require('../assets/users/user-7.jpg'),
              postTime,
              post,
              postImg,
              liked: false,
              likes,
              comments,
            })
          })
        })
  
        setPosts(list);
  
        if(loading) {
          setLoading(false);
        }
  
      } catch(e) {
        console.log(e);
      }
    }
    
    const getUser = async() => {
      await firebase.firestore()
      db.collection('users')
      .doc(route.params ? route.params.userId : user.uid)
      .get()
      .then((documentSnapshot) => {
          if (documentSnapshot.exists) {
              //console.log("user data", documentSnapshot.data());
              setUserData(documentSnapshot.data());
          }
      })
    }

    useEffect(() => {
      getUser();
      fetchPosts();
      navigation.addListener("focus", () => setLoading(!loading));
    }, [loading, navigation])

    const handleDelete = () => {}


    const addChat = async() => {
       
      // await firebase.firestore()
      // let document = await db.collection("chats").get();
      //   await document.ref.add({
      //     userId: user.uid,
      //     userName: userData.lname,
      //     messageText: "hey i am here",
      //     postTime: firebase.firestore.Timestamp.fromDate(new Date()),
      //     userImg: userData.userImg
      //   });
       
      // else {
      //   await document.ref.set({
      //     userId: user.uid,
      //     userName: userData.lname,
      //     messageText: "hey i am here",
      //     postTime: firebase.firestore.Timestamp.fromDate(new Date()),
      //     userImg: userData.userImg
      //   });
      // }

        firebase.firestore();
        db.collection('chats')
        .doc(user.uid)
        .set({
          userId: user.uid,
          userName: userData.lname,
          messageText: "hey i am here",
          postTime: firebase.firestore.Timestamp.fromDate(new Date()),
          userImg: userData.userImg
        })
        .then(() => {
          console.log("Added chat");
        })
        .catch((error) => {
          console.log('Something went wrong', error);
        })
    } 
    

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
                showsVerticalScrollIndicator={false}
            >
                <Image
                    style={styles.userImg}
                    source={{uri: userData ? userData.userImg || 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg' :
                    'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'}}
                />
                <Text style={styles.userName}>
                  {userData ? userData.fname || 'User' : 'User'} {userData ? userData.lname || 'name' : 'name'} 
                </Text>
                {/* <Text>{route.params ? route.params.userId : user.uid}</Text> */}
                <Text style={styles.aboutUser}>
                    {userData ? userData.email || 'No details added' : ''}
                </Text>

                <View style={styles.userBtnWrapper}>
                  {route.params ? (
                    <>
                     <TouchableOpacity style={styles.userBtn} onPress={addChat}>
                      <Text style={styles.userBtnTxt}>Message</Text>
                     </TouchableOpacity>

                    <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
                        <Text style={styles.userBtnTxt}>Follow</Text>
                    </TouchableOpacity>
                    </>
                  ): (
                    <>
                    <TouchableOpacity style={styles.userBtn} onPress={() => navigation.navigate('EditProfile')}>
                      <Text style={styles.userBtnTxt}>Edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.userBtn} onPress={() => logout()}>
                      <Text style={styles.userBtnTxt}>Logout</Text>
                    </TouchableOpacity>
                    </>
                  )}
                   
                </View>

                <View style={styles.userInfoWrapper}>
                    <View style={styles.userInfoItem}>
                        <Text style={styles.userInfoTitle}>{posts.length}</Text>
                        <Text style={styles.userInfoSubTitle}>Posts</Text>
                    </View>
                    <View style={styles.userInfoItem}>
                        <Text style={styles.userInfoTitle}>1820</Text>
                        <Text style={styles.userInfoSubTitle}>Followers</Text>
                    </View>
                    <View style={styles.userInfoItem}>
                        <Text style={styles.userInfoTitle}>562</Text>
                        <Text style={styles.userInfoSubTitle}>Following</Text>
                    </View>
                </View>

                {posts.map((item) => (
                  <PostCard key={item.id} item={item} onDelete={handleDelete}/>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
    },
    userImg: {
      height: 150,
      width: 150,
      borderRadius: 75,
    },
    userName: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 10,
      marginBottom: 10,
    },
    aboutUser: {
      fontSize: 12,
      fontWeight: '600',
      color: '#666',
      textAlign: 'center',
      marginBottom: 10,
    },
    userBtnWrapper: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
      marginBottom: 10,
    },
    userBtn: {
      borderColor: '#2e64e5',
      borderWidth: 2,
      borderRadius: 3,
      paddingVertical: 8,
      paddingHorizontal: 12,
      marginHorizontal: 5,
    },
    userBtnTxt: {
      color: '#2e64e5',
    },
    userInfoWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginVertical: 20,
    },
    userInfoItem: {
      justifyContent: 'center',
    },
    userInfoTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 5,
      textAlign: 'center',
    },
    userInfoSubTitle: {
      fontSize: 12,
      color: '#666',
      textAlign: 'center',
    },
  });