import React, { useState, useEffect, useContext } from "react"
import { UserProfileContext } from "../../providers/UserProfileProvider"
import { useNavigate, useParams } from "react-router-dom";


export const UserProfileForm = () => {
    const { getById } = useContext(UserProfileContext)
    const navigate = useNavigate()

    const [userProfile, setUserProfile] = useState({})

    //wait for data before button is active
    const [isLoading, setIsLoading] = useState(true)

    const { profileId } = useParams()

    //make a copy of state to manipulate
    const handleControlledInputChange = (event) => {
        //...product make a copy of current state
        const newUserProfile = { ...userProfile }

        //Change copy. name tells which property to change
        newUserProfile[event.target.name] = event.target.value

        //update corrent copy state
        setUserProfile(newUserProfile)
    }

    //Saves/updates user profiles
    const handleSaveProfile = () => {
        if (profileId){
            
        }
    }

}