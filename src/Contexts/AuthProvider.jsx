import React, { useEffect, useState } from "react";
import { Authcontext } from "./Authcontext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //Registration user
  const registration = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //login user
  const singIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //logout user
  const logout = () => {
    return signOut(auth)
      .then(() => {
        console.log("sing out done");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,currentUser => {
      setUser(currentUser);
      console.log(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const userInfo = { registration, singIn, logout,user,loading };

  return <Authcontext value={userInfo}>{children}</Authcontext>;
};

export default AuthProvider;
