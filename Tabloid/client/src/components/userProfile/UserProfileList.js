import React, { useContext, useEffect, useState } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import UserProfile from "./UserProfile";
import { CardGroup, Row } from 'reactstrap';


const UserProfileList = () => {

    //get context from userprofileprovider
    const {userProfiles, setUserProfiles, getAllUsers} = useContext(UserProfileContext)
    
    //get all profiles
    useEffect(() => {
        getAllUsers()
    })

  

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