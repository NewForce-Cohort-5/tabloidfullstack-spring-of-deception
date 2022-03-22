import React from "react";
import { Card, CardImg, CardBody, Col } from "reactstrap";
import { Link } from "react-router-dom";


const UserProfile = ({ userProfileProp }) => {
  
  return (
    <>
    <Col sm="2">
    <Card className="profileCard">
        <CardImg top src={userProfileProp.imageLocation} alt={userProfileProp.fullName} />
      
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