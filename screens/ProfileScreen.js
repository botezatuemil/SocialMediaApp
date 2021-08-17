import React, { useContext } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native'

import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';

const ProfileScreen = () => {
    const {user, logout} = useContext(AuthContext);
    // useEffect(() => {
    //     const fetchPosts = async() => {
    //       try {
    //         const list = [];
    //         await firebase.firestore();
    //         db.collection('posts')
    //         .get()
    //         .then((querySnapshot) => {
    //            querySnapshot.forEach((doc) => {
    //              const {userId, post, postImg, postTime, likes, comments} = doc.data();
    //              list.push({
    //               id: doc.id,
    //               userId,
    //               userName: 'Test name',
    //               userImg: require('../assets/users/user-7.jpg'),
    //               postTime: postTime,
    //               post,
    //               postImg,
    //               liked: false,
    //               likes,
    //               comments,
    //             })
    //            })
    //         })
  
    //         setPosts(list);
  
    //         if(loading) {
    //           setLoading(false);
    //         }
  
    //         console.log('Posts', list);
    //       } catch(e) {
    //         console.log(e);
    //       }
    //     }
    //     fetchPosts();
    //     navigation.addListener("focus", () => setLoading(!loading))
    //   }, [loading, navigation]);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
                showsVerticalScrollIndicator={false}
            >
                <Image
                    style={styles.userImg}
                    source={require('../assets/users/user-8.jpg')}
                />
                <Text style={styles.userName}>Jenny Doe</Text>
                <Text style={styles.aboutUser}>
                    Making self sustaining marketing solutions empowering software modern solutions
                </Text>

                <View style={styles.userBtnWrapper}>
                    <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
                        <Text style={styles.userBtnTxt}>Message</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
                        <Text style={styles.userBtnTxt}>Follow</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.userInfoWrapper}>
                    <View style={styles.userInfoItem}>
                        <Text style={styles.userInfoTitle}>22</Text>
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