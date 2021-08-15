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

import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { Lato_400Regular, Lato_700Bold_Italic, Lato_700Bold } from '@expo-google-fonts/lato';

import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const NavigateStack = ({navigation}) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HomeScreen"
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

const AppStack = ({navigation}) => {
    
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
                name="RN Social"
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
                name="ChatScreen"
                component={ChatScreen}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({color, size}) => (
                        <Ionicons
                            name="chatbox-ellipses-outline"
                            color={color}
                            size={size}
                        />
                    )
                }}
           />
           <Tab.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{
                    tabBarShowLabel: false,
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