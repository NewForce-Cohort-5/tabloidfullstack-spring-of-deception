import React from "react";
import { Card, CardImg, CardBody, Col } from "reactstrap";
import { Link } from "react-router-dom";


const UserProfile = ({ userProfileProp }) => {
  
  
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