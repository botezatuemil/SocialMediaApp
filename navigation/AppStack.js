import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import AddPostScreen from '../screens/AddPostScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MessagesScreen from '../screens/MessagesScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { Lato_400Regular, Lato_700Bold_Italic, Lato_700Bold } from '@expo-google-fonts/lato';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const NavigateStack = ({navigation}) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="RN Social"
                component={HomeScreen}
                options={{
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        color: '#2e64e5',
                        fontFamily: 'Lato_700Bold_Italic',
                        fontSize: 22,
                    },
                    headerStyle: {
                        shadowColor: '#fff',
                        elevation: 0,
                    },
                    
                    headerRight: () => (
                        <View style={{marginRight: 10}}>
                            <FontAwesome5.Button
                                name="plus"
                                size={22}
                                backgroundColor="#fff"
                                color="#2e64e5"
                                onPress={() => navigation.navigate('AddPostScreen')}
                            />
                        </View>
                    ),
                }}
            />

            <Stack.Screen
                name="AddPostScreen"
                component={AddPostScreen}
                options={{
                    title: '',
                    headerTitleAlign: 'center',
                    headerStyle: {
                      backgroundColor: '#2e64e515',
                      shadowColor: '#2e64e515',
                      elevation: 0,
                    },
                    headerBackTitleVisible: false,
                    headerBackImage: () => (
                      <View style={{marginLeft: 15}}>
                        <Ionicons name="arrow-back" size={25} color="#2e64e5" />
                      </View>
                    ),
                    headerRight: () => (
                        <TouchableOpacity>
                            <Text style={styles.textHeaderRight}>Post</Text>
                        </TouchableOpacity>
                        
                    )
                  }}
            />
        </Stack.Navigator>
    )
}

const MessageStack = ({navigation}) => ( 
    <Stack.Navigator>
        <Stack.Screen name="Messages" component={MessagesScreen} options={{headerTitleAlign: 'center'}}/>
        <Stack.Screen 
            name="Chat" 
            component={ChatScreen} 
            options={({route}) => ({
                title: route.params.userName,
                headerTitleAlign: 'center',
                headerBackTitleVisible: false,
                headerBackImage: () => (
                    <View style={{marginLeft: 15}}>
                        <Ionicons name="arrow-back" size={25} color="#2e64e5" />
                    </View>
                ),
            })}
    />
    </Stack.Navigator>
)

const ProfileStack = ({navigation}) => (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          headerTitle: 'Edit Profile',
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#fff',
            shadowColor: '#fff',
            elevation: 0,
          },
        }}
      />
    </Stack.Navigator>
  );

const AppStack = () => {
    
    const getTabBarVisibility = (route) => {
        const routeName = route.state ? route.state.routes[route.state.index].name : '';

        if (routeName === 'Chat') {
            return false;
        }
        return true;
    }
    
    let [fontsLoaded, error] = useFonts ({
        Lato_400Regular,
        Lato_700Bold_Italic,
        Lato_700Bold
    });
  
    if (!fontsLoaded) {
        return <AppLoading/>
    } 

    return (
       <Tab.Navigator labeled={false}>
           <Tab.Screen
                name="HomeScreen"
                component={NavigateStack}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons
                            name="home-outline"
                            color={color}
                            size={size}
                        />
                    ),
                    
                }}
           />
           <Tab.Screen
                name="MessageStack"
                component={MessageStack}
                options={({route}) => ({
                    tabBarVisible: getTabBarVisibility(route),
                    tabBarShowLabel: false,
                    headerTitleAlign: 'center',
                    headerShown: false,
                    tabBarIcon: ({color, size}) => (
                        <Ionicons
                            name="chatbox-ellipses-outline"
                            color={color}
                            size={size}
                        />
                    )
                })}
           />
           <Tab.Screen
                name="ProfileScreen"
                component={ProfileStack}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({color, size}) => (
                        <Ionicons
                            name="person-outline"
                            color={color}
                            size={size}
                        />
                    )
                }}
           />  
       </Tab.Navigator>
    );
}

export default AppStack;

const styles = StyleSheet.create({
    textHeaderRight: {
        color: "#2e64e5", 
        marginRight: 15, 
        fontSize: 17,
        marginBottom: 10, 
        fontWeight: 'bold'
    }
});