import React, { useState, useEffect, useContext } from "react"
import { UserProfileContext } from "../../providers/UserProfileProvider"
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "reactstrap";
import Swal from 'sweetalert2';



export const UserProfileForm = () => {
    const { getById, updateUser, userProfiles, getUserTypes, userTypes, admins, getAdmins } = useContext(UserProfileContext)
    const navigate = useNavigate()
    let numberAdmins = admins.length
    const [userProfile, setUserProfile] = useState({})

    //wait for data before button is active
    const [isLoading, setIsLoading] = useState(true)

    const { id } = useParams()


    //get logged in local storage userTypeId
    const userId = JSON.parse(sessionStorage.getItem("userProfile")).userTypeId
    //any time what's in the brackets change it will refresh useEffect (to refresh state). userProfiles is updated in the fetch call
    useEffect(() => {
        getById(id)
            .then(setUserProfile)
            .then(getUserTypes)
            .then(getAdmins)

    }, [userProfiles]);

    //make a copy of state to manipulate
    const handleControlledInputChange = (event) => {
        //...product make a copy of current state
        const newUserProfile = { ...userProfile }

        //Change copy. name tells which property to change
        newUserProfile[event.target.id] = event.target.value

        //update corrent copy state
        setUserProfile(newUserProfile)
    }

    //Saves/updates user profiles
    //Make sure to add the e.preventDefault
    //has conditional to not allow all admins to be removed
    const handleSaveProfile = (e) => {
        e.preventDefault()
        if (numberAdmins <= 1 && userProfile.userTypeId != 1 && userId !==1) {
            debugger
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You need at least one admin! Make someone admin before changing user type!',
                footer: '<a href="">Why do I have this issue?</a>'
            })
        } else (

            updateUser({
                id: userProfile.id,
                displayName: userProfile.displayName,
                firstName: userProfile.firstName,
                lastName: userProfile.lastName,
                email: userProfile.email,
                imageLocation: userProfile.imageLocation,
                userTypeId: userProfile.userTypeId
            })
                .then(() => navigate(`/userprofile/${userProfile.id}`)))
    }

    return (
        <form className="userForm">
            <h2 className="userForm_title">New user</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="user-name">User Name: </label>

                    <input className="form-control" type="text" value={userProfile.displayName} id="displayName" onChange={handleControlledInputChange} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="first-name">First Name: </label>

                    <input className="form-control" type="text" value={userProfile.firstName} id="firstName" onChange={handleControlledInputChange} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="last-name">Last Name: </label>

                    <input className="form-control" type="text" value={userProfile.lastName} id="lastName" onChange={handleControlledInputChange} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="email">Email: </label>

                    <input className="form-control" type="text" value={userProfile.email} id="email" onChange={handleControlledInputChange} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="email">Image Location: </label>

                    <input className="form-control" type="text" value={userProfile.imageLocation} id="imageLocation" onChange={handleControlledInputChange} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="userTypeId">User Type: </label><br></br>
                    <select
                        onChange={handleControlledInputChange}
                        id="userTypeId" className="userTypeDropDown" >
                        {/* map through userprofiletypes and by default select the type that matches the userprofile.usertypeID */}
                        {userTypes.map(u => {
                            if (userProfile.userTypeId === u.id) {
                                return (
                                    <option selected key={u.id} value={u.id}>
                                        {u.name}
                                    </option>
                                )
                            }
                            else {
                                return (<option key={u.id} value={u.id}>
                                    {u.name}
                                </option>
                                )
                            }
                        })}
                    </select>
                </div>
            </fieldset>


            <div>
                <button className="btn btn-primary" type="submit" onClick={handleSaveProfile}>Update User</button>

                <Button color="dark" onClick={() => {
                    navigate(-1)
                }}>Cancel</Button>
            </div>


        </form>
    )

}