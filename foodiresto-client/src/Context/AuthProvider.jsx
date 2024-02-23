import React, { useState, createContext, useEffect } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext;
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = (children) => {
  const [user, setUser] = useState(null);
  const [losding, setLoading] = useState(true);

  // create an account
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)   
  };

//   sign up with gmail account
  const signUpWithGmail = () =>{
    return signInWithPopup(auth, googleProvider)
  } 

// login using email and password
const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
}

// logout
const logout = () =>{
    return signOut(auth)
}

// update user profile
const updateUserProfile = ({name, photoURL}) => {
    return updateProfile(auth.currentUser, {
        displayName: name, photoURL: photoURL
      })
}

// check signed-in user
useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          setUser(currentUser);
          setLoading(false);
        } else {
          // User is signed out
          // ...
        }
      })
      return () => {
        return unsubcribe();
      }
  
}, [])


  const AuthInfo = {user, createUser, signUpWithGmail, login, logout, updateUserProfile};
  return (
    <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
