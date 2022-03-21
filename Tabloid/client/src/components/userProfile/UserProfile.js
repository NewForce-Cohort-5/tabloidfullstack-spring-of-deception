import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const UserProfile = ({ userProfileProp }) => {
  
  return (
    <>
    
    <Card className="m-4">
    
      <p className="text-left px-2">
        <Link to={`/users/${userProfileProp.Id}`}>
        Posted by: {userProfileProp.fullName}
        </Link>  
      </p>
      
      <CardImg top src={userProfileProp.imageLocation} alt={userProfileProp.fullName} />
      <CardBody>

        
      </CardBody>
      
    </Card>
    </>
  );
};

export default UserProfile;