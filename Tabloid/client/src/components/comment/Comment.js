import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import Moment from "moment";

const Comment = ({ commentProp }) => {
    
    //Format comment date using moment library
    let commentDate = commentProp.createDateTime
    let formattedCommentDate = Moment(commentDate).format(`MM-DD-YYYY, h:mm a`)
    
    return (
        <Card className="container m-4">
            <CardBody>
            <h6>User: {commentProp.userProfile.displayName}</h6>
            <div>{formattedCommentDate}</div> <br/>
            <p className="text-left px-2">
                <div className="commentSubject">Subject: <br/>{commentProp.subject}</div><br/>
                <div className="commentContent">Comment: <br/>{commentProp.content}</div>
                </p>
            
                
                
            </CardBody>
        </Card>
    );
};

export default Comment;