import React, {useContext} from "react";
import { Link, useInRouterContext } from "react-router-dom";
import { Card, CardBody, Button } from "reactstrap";
import Moment from "moment";
import Swal from 'sweetalert2';
import { CommentContext } from "../../providers/CommentProvider";


//Pulling swalProp from post detail to be able to update state in the post detail when comment is deleted

const Comment = ({ commentProp, swalProp }) => {
    
    //Format comment date using moment library
    let commentDate = commentProp.createDateTime
    let formattedCommentDate = Moment(commentDate).format(`MM-DD-YYYY, h:mm a`)

    //get current user
    const user = JSON.parse(sessionStorage.getItem("userProfile"))

    const {deleteComment} = useContext(CommentContext)

    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to undelete this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Deleted!',
                'Comment has been deleted.',
                'success'
            ).then(deleteComment(commentProp.id))
            .then(swalProp)
            
        }})
    }
            
    
    return (
        <Card className="container m-4">
            <CardBody>
            <h6>User: {commentProp.userProfile.displayName}</h6>
            <div>{formattedCommentDate}</div> <br/>
            <p className="text-left px-2">
                <div className="commentSubject">Subject: <br/>{commentProp.subject}</div><br/>
                <div className="commentContent">Comment: <br/>{commentProp.content}</div>
                </p>

                {commentProp.userProfileId === user.id ? <Button color="danger" onClick={handleDelete}>Delete Comment</Button> : ""}
                    
            
            </CardBody>
        </Card>
    );
};

export default Comment;