import React from "react";
import { Card, CardImg, CardBody, Col } from "reactstrap";
import { Link } from "react-router-dom";


const UserProfile = ({ userProfileProp }) => {
  
  return (
    <>
    <Col sm="3">
    <Card className="profileCard">
        <CardImg top src={userProfileProp.imageLocation} alt={userProfileProp.fullName} />
      
      <CardBody>
        <Link to={`/users/${userProfileProp.id}`}>
        Posted by: {userProfileProp.displayName}<br />
        Name: {userProfileProp.fullName}<br />
        User Type: {userProfileProp.userType.name}
        
        </Link>  
      </CardBody>
        
    </Card>
    </Col>
    </>
  );
};

export default UserProfile;