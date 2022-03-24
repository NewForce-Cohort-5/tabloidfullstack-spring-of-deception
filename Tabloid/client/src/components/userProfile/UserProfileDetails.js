import React, { useEffect, useContext, useState } from "react";
import { CardGroup, Row, Col, Card, CardImg, CardBody, Button } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import UserProfile from "./UserProfile";
import Swal from 'sweetalert2';



const UserProfileDetails = () => {

    const { getById, deactivateUser, reactivateUser } = useContext(UserProfileContext)
    //hook used to access the route param to get id
    const { id } = useParams();
    const navigate = useNavigate()

    const [userProfile, setUserProfile] = useState()

    useEffect(() => {
        getById(id).then(setUserProfile)
    }, []);

    if (!userProfile) {
        return null;
    }


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
                    'success'
                ).then(deactivateUser(id))
                window.location.reload(false);
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
                    'User Deactivated!',
                    'success'
                ).then(reactivateUser(id))
                window.location.reload(false);
            }
        })
    }

    //Format date
    let date = userProfile.createDatetime
    let formattedDate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(date)
    return (
        <CardGroup>
            <Row>
                <Col>
                    <Card className="profileCard">
                        <CardImg top src={userProfile.imageLocation} alt={userProfile.fullName} />

                        <CardBody>
                            Posted by: {userProfile.fullName}<br />
                            Display Name: {userProfile.displayName}<br />
                            User Type: {userProfile.userType.name}<br />
                            User Email: {userProfile.email}<br />
                            Profile Created: {formattedDate}<br />


                            {userProfile.userTypeId === 3 ? <Button color="warning" onClick={handleReactivate}>Reactivate User</Button> : <Button color="danger" onClick={handleDeactivate}>Deactivate User</Button>}

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