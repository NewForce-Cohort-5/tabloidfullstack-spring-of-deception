import React, { useState, useEffect, createContext } from "react";
import { Spinner } from "reactstrap";


export const UserProfileContext = createContext();

export function UserProfileProvider(props) {
  //user state holds list of users from API
  const [userProfiles, setUserProfiles] = useState([])

  const apiUrl = "https://localhost:44360";

  const userProfile = sessionStorage.getItem("userProfile");
  const [isLoggedIn, setIsLoggedIn] = useState(userProfile != null);


  const login = (userObject) => {
    return fetch(`${apiUrl}/api/userprofile/getbyemail?email=${userObject.email}`)
    .then((r) => r.json())
      .then((userProfile) => {
        if(userProfile.id){
          sessionStorage.setItem("userProfile", JSON.stringify(userProfile));
          setIsLoggedIn(true);
          return userProfile
        }
        else{
          return undefined
        }
      });
  };

  const logout = () => {
        sessionStorage.clear()
        setIsLoggedIn(false);
  };

  const register = (userObject, password) => {
    return  fetch(`${apiUrl}/api/userprofile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObject),
    })
    .then((response) => response.json())
      .then((savedUserProfile) => {
        sessionStorage.setItem("userProfile", JSON.stringify(savedUserProfile))
        setIsLoggedIn(true);
      });
  };

  const getAllUsers = () => {
    return fetch(`${apiUrl}/api/userprofile`)
    .then((res) => res.json())
    .then(setUserProfiles);
  }


  return (
    <UserProfileContext.Provider value={{ isLoggedIn, login, logout, register, getAllUsers }}>
       {props.children}
    </UserProfileContext.Provider>
  );
}