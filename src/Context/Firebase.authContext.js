import React, { createContext, useState, useContext, useMemo } from 'react';
// import { getFirestore } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, updateProfile, GoogleAuthProvider, signInWithPopup, TwitterAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import FirebaseErrors from '../Firebase/FirebaseErrors';
import { useLanguageContext } from './LanguageContext';
import { FirebaseApp } from '../Firebase/FirebaseApp';
import { useFirebaseDatabaseContext } from './Firebase.databaseContext';

const FirebaseAuthContext = createContext(undefined);

export function FirebaseAuthProvider(props) {
    const { userLanguage } = useLanguageContext();
    const [changeUsernameAlert, setchangeUsernameAlert] = useState(false);
    const [wrongPasswordAlert, setWrongPasswordAlert] = useState(false);
    const [loading, setLoading] = useState(false);

    const firebaseApp = FirebaseApp;
    const { setUserDB } = useFirebaseDatabaseContext();

    const auth = getAuth(firebaseApp);
    const googleProvider = new GoogleAuthProvider();
    const twitterProvider = new TwitterAuthProvider();
    auth.languageCode = userLanguage;

    const [user, setUser] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
            setUser(currentUser);
            if (currentUser.providerData[0].providerId === 'password') {
                updateProfile(auth.currentUser, { displayName: currentUser.email.split('@')[0] });
            }
        }
    });

    const signInWithGoogle = async () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                console.log('GOOGLE USER', user);
                setUser(user);
            }).catch((error) => {
                console.log(error);
            });
    };

    //* FIX TWITTER LOGIN.
    // You currently have Essential access which includes access to Twitter API v2 endpoints only.
    // If you need access to this endpoint, you’ll need to apply for Elevated access via the Developer Portal
    const signInWithTwitter = async () => {
        signInWithPopup(auth, twitterProvider)
            .then((result) => {
                const user = result.user;
                console.log('TWITTER USER', user);
                setUser(user);
            }).catch((error) => {
                console.log(error);
            });
    };

    const mySignInWithEmailAndPassword = async (email, password) => {
        try {
            setLoading(true);
            await createUserWithEmailAndPassword(auth, email, password)
                .then(
                    async () => {
                        updateProfile(auth.currentUser, {
                            displayName: email.split('@')[0]
                        }).then(() => {
                            setUserDB(auth.currentUser);
                        })
                            .then(() => {
                                setLoading(false);
                            });
                    });
        } catch (error) {
            if (error.code === FirebaseErrors.emailInUse) {
                try {
                    await signInWithEmailAndPassword(auth, email, password);
                } catch (error) {
                    console.log(error);
                    if (error.code === FirebaseErrors.wrongPassword) {
                        setWrongPasswordAlert(true);
                        setTimeout(() => { // Se borra la alerta después de 5 segundos
                            setWrongPasswordAlert(false);
                        }, 5000);
                    }
                }
            } else {
                console.log(error);
            }
        }
    };

    const logOut = async () => {
        await auth.signOut();
        setUser({});
        console.log('logged out');
    };

    const changeDisplayName = async (displayName) => {
        console.log(auth.currentUser.uid);
        await updateProfile(auth.currentUser, {
            displayName: displayName
        }).then(() => {
            setUser({ ...user, displayName: displayName });
            setUserDB(auth.currentUser);
        });
        if (!changeUsernameAlert) {
            setchangeUsernameAlert(true);
            setTimeout(() => { // Se borra la alerta después de 5 segundos
                setchangeUsernameAlert(false);
            }, 5000);
        }
    };

    const value = useMemo(() => {
        return ({
            firebaseApp,
            mySignInWithEmailAndPassword,
            auth,
            user,
            logOut,
            signInWithGoogle,
            signInWithTwitter,
            changeDisplayName,
            changeUsernameAlert,
            setchangeUsernameAlert,
            wrongPasswordAlert,
            setWrongPasswordAlert,
            loading
        });
    }, [auth, logOut, user, changeUsernameAlert, wrongPasswordAlert, loading]);
    return <FirebaseAuthContext.Provider value={value} {...props} />;
}

export function useFirebaseAuthContext() {
    const context = useContext(FirebaseAuthContext);
    if (!context) {
        throw new Error('useFirebaseAuthContext must be used within a FirebaseAuthProvider');
    }
    return context;
}
