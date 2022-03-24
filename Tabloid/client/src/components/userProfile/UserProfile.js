import React from "react";
import { Card, CardImg, CardBody, Col, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";


const UserProfile = ({ userProfileProp }) => {
  const navigate = useNavigate()
  
  //Added a default image location in case the image location comes back as null
  return (
    <>
      <Col sm="2">
        <Card className="profileCard">
          <CardImg top src={userProfileProp.imageLocation || "https://avatars.dicebear.com/api/bottts/.svg"} alt={userProfileProp.name} />

          <CardBody>
            <Link to={`/userprofile/${userProfileProp.id}`}>
              User Name: {userProfileProp.displayName}<br />


            </Link>
            
          </CardBody>

        </Card>
      </Col>
    </>
  );
};

export default UserProfile;