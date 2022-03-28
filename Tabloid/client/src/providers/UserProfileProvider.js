import React, { useState, useEffect, createContext } from "react";
import { Spinner } from "reactstrap";
import Swal from 'sweetalert2';




export const UserProfileContext = createContext();

export function UserProfileProvider(props) {
  //user state holds list of users from API
  const [userProfiles, setUserProfiles] = useState([])
  const [userTypes, setUserTypes] = useState([])

  const apiUrl = "https://localhost:44360";

  const userProfile = sessionStorage.getItem("userProfile");
  const [isLoggedIn, setIsLoggedIn] = useState(userProfile != null);


  const login = (userObject) => {
    return fetch(`${apiUrl}/api/userprofile/getbyemail?email=${userObject.email}`)
      .then((r) => r.json())
      .then((userProfile) => {
        if(userProfile.userTypeId === 3){
          Swal.fire('Any fool can use a computer')
        }else if (userProfile.id !==3) {
          sessionStorage.setItem("userProfile", JSON.stringify(userProfile));
          setIsLoggedIn(true);
          return userProfile
        }
        else {
          return undefined
        }
      });
  };

  const logout = () => {
    sessionStorage.clear()
    setIsLoggedIn(false);
  };

  const register = (userObject, password) => {
    return fetch(`${apiUrl}/api/userprofile`, {
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

  const getUserTypes = () => {
    return fetch(`${apiUrl}/api/userprofile/usertypes`)
      .then((res) => res.json())
      .then(setUserTypes);
  }

  const getById = (id) => {
    return fetch(`${apiUrl}/api/userprofile/${id}`)
      .then((res) => res.json())
  }

  const deactivateUser = (id) => {
    return fetch(`${apiUrl}/api/userprofile/deactivate/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
    }).then(getAllUsers)
  }

  const reactivateUser = (id) => {
    return fetch(`${apiUrl}/api/userprofile/reactivate/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
    }).then(getAllUsers)
  }

  const updateUser = user => {
    return fetch(`https://localhost:44360/api/UserProfile/${user.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }).then(getAllUsers)
}

  return (
    <UserProfileContext.Provider value={{ isLoggedIn, login, logout, register, getAllUsers, setUserProfiles, userProfiles, getById, deactivateUser, reactivateUser, updateUser, getUserTypes, userTypes }}>
      {props.children}
    </UserProfileContext.Provider>
  );
}