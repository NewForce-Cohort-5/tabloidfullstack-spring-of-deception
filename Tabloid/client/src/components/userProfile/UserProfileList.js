import React, { useContext, useEffect, useState } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import UserProfile from "./UserProfile";


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
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-lg-6">
            <div>
            {userProfiles.map((p) => (
              <UserProfile key={p.id} userProfileProp={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileList;