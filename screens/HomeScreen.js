import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';

import { Container } from '../styles/FeedStyles';

import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { Lato_400Regular, Lato_700Bold_Italic, Lato_700Bold } from '@expo-google-fonts/lato';

import Ionicons from 'react-native-vector-icons/Ionicons';

import PostCard from '../components/PostCard';

import { db, app } from '../firebase';
import firebase from 'firebase';


const Posts = [
    {
      id: '1',
      userName: 'Jenny Doe',
      userImg: require('../assets/users/user-3.jpg'),
      postTime: '4 mins ago',
      post:
        'Hey there, this is my test for a post of my social app in React Native.',
      postImg: require('../assets/posts/post-img-3.jpg'),
      liked: true,
      likes: '14',
      comments: '5',
    },
    {
      id: '2',
      userName: 'John Doe',
      userImg: require('../assets/users/user-1.jpg'),
      postTime: '2 hours ago',
      post:
        'Hey there, this is my test for a post of my social app in React Native.',
      postImg: 'none',
      liked: false,
      likes: '8',
      comments: '0',
    },
    {
      id: '3',
      userName: 'Ken William',
      userImg: require('../assets/users/user-4.jpg'),
      postTime: '1 hours ago',
      post:
        'Hey there, this is my test for a post of my social app in React Native.',
      postImg: require('../assets/posts/post-img-2.jpg'),
      liked: true,
      likes: '1',
      comments: '0',
    },
    {
      id: '4',
      userName: 'Selina Paul',
      userImg: require('../assets/users/user-6.jpg'),
      postTime: '1 day ago',
      post:
        'Hey there, this is my test for a post of my social app in React Native.',
      postImg: require('../assets/posts/post-img-4.jpg'),
      liked: true,
      likes: '22',
      comments: '4',
    },
    {
      id: '5',
      userName: 'Christy Alex',
      userImg: require('../assets/users/user-7.jpg'),
      postTime: '2 days ago',
      post: 'Hey there, this is my test for a post of my social app in React Native.',
      postImg: 'none',
      liked: false,
      likes: '0',
      comments: '0',
    },
];

const HomeScreen = ({ navigation }) => {
    
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
    
  const fetchPosts = async() => {
    try {
      const list = [];
      await firebase.firestore();
      await db.collection('posts')
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
  
  useEffect(() => {
    fetchPosts();
    navigation.addListener("focus", () => setLoading(!loading));
  }, [loading, navigation])

  useEffect(() => {
    fetchPosts();
    setDeleted(false); 
  }, [deleted])

  const handleDelete = (postId) => {
    Alert.alert(
      'Delete post',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed!'),
          style: 'cancel'
        },
        {
          text: 'Confirm',
          onPress: () => deletePost(postId),
        },
      ],
      {cancelable: false}
    )
  }

  const deletePost = (postId) => {
    console.log('Current post id: ', postId);

    firebase.firestore();
    firebase.firestore()
    db.collection('posts')
    .doc(postId)
    .get()
    .then(documentSnapshot => {
      if (documentSnapshot.exists) {
        const {postImg} = documentSnapshot.data();

        if (postImg != null) {
          const storageRef = app.storage().refFromURL(postImg);
          const imageRef = app.storage().ref(storageRef.fullPath);
          
          imageRef
          .delete()
          .then(() => {
            console.log('Deleted');
            deleteFirestoreData(postId);
            setDeleted(false);
          })
          .catch((e) => {
            console.log('error');
          })
        } else {
          deleteFirestoreData(postId);
        }

      }
    })
  }
      
  const deleteFirestoreData = (postId) => {
    firebase.firestore();
    db.collection('posts')
    .doc(postId)
    .delete()
    .then(() => {
      Alert.alert(
        "Post deleted!",
        "Your image was successfully deleted to the Firebase Storage"
      );
    })
    .catch(e => console.log("error deleting post", e))
  }
    return (
        <Container>
            <FlatList
                data={posts}
                renderItem={({item}) => <PostCard item={item} onDelete={handleDelete}/>}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
            />
        </Container>
    );
}

export default HomeScreen;