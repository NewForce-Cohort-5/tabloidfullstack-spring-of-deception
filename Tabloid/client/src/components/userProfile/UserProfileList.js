import React, { useContext, useEffect, useState } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import UserProfile from "./UserProfile";
import { CardGroup, Row } from 'reactstrap';


const UserProfileList = () => {
  // const []
  //get context from userprofileprovider
  const { userProfiles, getAllUsers, getAdmins, admins } = useContext(UserProfileContext)

  

  //get all profiles
  useEffect(() => {
    getAllUsers()
  }, [])

  useEffect(() => {
    getAdmins()
  }, [])

  
  // useEffect(() => {
  //   let adminUserProfiles = []

  //     userProfiles.forEach(userProfile => {

  //       if (userProfile.userTypeId === 1) {
  //         adminUserProfiles.push(userProfile)
  //         // console.log(userProfile.id)
  //       }
  //     })
  // }, [userProfiles])
 
  console.log(admins.length)

  if (!userProfiles) {
    return null;
  }

  return (


    <CardGroup>
      <Row>
        {userProfiles.map((p) => (
          <UserProfile key={p.id} userProfileProp={p} />
        ))}
      </Row>
    </CardGroup>


  );
};

export default UserProfileList;