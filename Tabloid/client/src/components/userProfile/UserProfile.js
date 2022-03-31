import React from "react";
import { Card, CardImg, CardBody, Col, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";


const UserProfile = ({ userProfileProp }) => {
  const navigate = useNavigate()

  //Added a default image location in case the image location comes back as null
  return (
    <>
      <Col sm="2">
        <Link to={`/userprofile/${userProfileProp.id}`}>
          
          <Card className="profileCard">
            {userProfileProp.userTypeId === 3 ? <h5 style={{color : 'red'}} >Deactivated User</h5> : <h5> <br/> </h5>}
            <CardImg top src={userProfileProp.imageLocation || "https://avatars.dicebear.com/api/bottts/.svg"} alt={userProfileProp.name} />

            <CardBody>

              User Name: {userProfileProp.displayName}<br />
              
            </CardBody>
            
          </Card>
        </Link>
        
      </Col>
    </>
  );
};

export default UserProfile;