import React, { useEffect, useContext, useState } from "react";
import { CardGroup, Row, Col, Card, CardImg, CardBody, Button } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import UserProfile from "./UserProfile";
import Swal from 'sweetalert2';
import Moment from 'moment';



const UserProfileDetails = () => {

    const { getById, deactivateUser, reactivateUser, userProfiles } = useContext(UserProfileContext)
    //hook used to access the route param to get id
    const { id } = useParams();
    const navigate = useNavigate()

    const [userProfile, setUserProfile] = useState()
    
    //any time what's in the brackets change it will refresh useEffect (to refresh state). userProfiles is updated in the fetch call
    useEffect(() => {
        getById(id).then(setUserProfile)
    }, [userProfiles]);

    if (!userProfile) {
        return null;
    }

    //Format date using moment library
    let date = userProfile.createDatetime
    let formattedDate = Moment(date).format(`MM-DD-YYYY`)


    const handleDeactivate = () => {
        Swal.fire({
            title: 'Are you sure you want to deactivate this user?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, deactivate it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'User Deactivated!',
                    'Success'
                ).then(deactivateUser(id))
                
            }
        })
    }

    const handleReactivate = () => {
        Swal.fire({
            title: 'Are you sure you want to reactivate this user?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, reactivate it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'User Reactivated!',
                    'Success'
                ).then(reactivateUser(id))
                
            }
        })
    }

    
    
    return (
        <CardGroup>
            <Row>
                <Col>
                    <Card className="profileCard">
                        <CardImg top src={userProfile.imageLocation || "https://avatars.dicebear.com/api/bottts/.svg"} alt={userProfile.fullName} />

                        <CardBody>
                            Name: {userProfile.fullName}<br />
                            Display Name: {userProfile.displayName}<br />
                            
                            User Email: {userProfile.email}<br />
                            Profile Created: {formattedDate}<br />
                            {userProfile.userType.id === 3 ? <text style={{color: 'red'}}>User Type: {userProfile.userType.name}<br /></text> : <text>User Type: {userProfile.userType.name}<br /></text>}

                            {/* font is different color based on the type of user */}
                            
                            {userProfile.userTypeId === 3 ? <Button color="warning" onClick={handleReactivate}>Reactivate User</Button> : <Button color="danger" onClick={handleDeactivate}>Deactivate User</Button>}

                            <Button color="primary" onClick={() => {
                            navigate(`/userprofiles/edit/${userProfile.id}`)
                        }}>Edit User</Button>

                        </CardBody>
                        <Button color="primary" onClick={() => {
                            navigate(`/userprofiles`)
                        }}>Back To User Proflies</Button>
                    </Card>
                </Col>

            </Row>
        </CardGroup>

        
    );
};

export default UserProfileDetails;