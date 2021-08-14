import React, { createContext, useState } from 'react';

import {auth, provider} from '../firebase';

import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer'])

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    return (
        <AuthContext.Provider
            value={{
                user, 
                setUser,
                login: async (email, password) => {
                    try {
                        await auth.signInWithEmailAndPassword(email, password);
                    } catch(e) {
                        console.log(e);
                    }
                },
                register: async (email, password) => {
                    try {
                        await auth.createUserWithEmailAndPassword(email, password);
                    } catch(e) {
                        console.log(e);
                    }
                },
                logout: async () => {
                    try {
                        await auth.signOut();
                    } catch(e) {
                        console.log(e);
                    }
                },
                signinWithGoogle: async () => {
                    
                    await auth.signInWithPopup(provider).catch((error) => alert(error.message));
                    
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}