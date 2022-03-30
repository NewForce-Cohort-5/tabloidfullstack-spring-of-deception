import React, {useContext} from "react";
import { Link, useInRouterContext } from "react-router-dom";
import { Card, CardBody, Button } from "reactstrap";
import Moment from "moment";
import Swal from 'sweetalert2';
import { CommentContext } from "../../providers/CommentProvider";


//Pulling swalProp from post detail to be able to update state in the post detail when comment is deleted

const Comment = ({ commentProp, swalProp, postId }) => {
    
    //Format comment date using moment library
    let commentDate = commentProp.createDateTime
    let formattedCommentDate = Moment(commentDate).format(`MM-DD-YYYY, h:mm a`)
    // console.log(formattedCommentDate)
    // console.log(commentProp.createDateTime)
    //get current user
    const user = JSON.parse(sessionStorage.getItem("userProfile"))

    const {deleteComment, updateComment} = useContext(CommentContext)

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
              deleteComment(commentProp.id).then(swalProp)
                Swal.fire(
                'Deleted!',
                'Comment has been deleted.',
                'success'
            )
        }})
    }

    const handleEdit = () => {
        Swal.fire({
            title: `Edit Comment`,
            width: 600,
            html: `<div>Subject<textarea type="text" id="subject" class="swal2-input" cols="30" rows="1">${commentProp.subject}</textarea></div>
            Content<textarea cols="30" rows="5" id="content" class="swal2-input">${commentProp.content}</textarea>`,
            confirmButtonText: 'Save',
            focusConfirm: false,
            showCancelButton: true,
            preConfirm: () => {
              const subject = Swal.getPopup().querySelector('#subject').value
              const content = Swal.getPopup().querySelector('#content').value
              if (!subject || !content) {
                Swal.showValidationMessage(`Please enter subject and content`)
              }
              return { subject: subject, content: content }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                updateComment({
                    id: commentProp.id,
                    postId: postId,
                    userProfileId: user.id,
                    subject: result.value.subject,
                    content: result.value.content,
                    createDateTime : commentProp.createDateTime
                }).then(swalProp)
            }
        })

        
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

                {commentProp.userProfileId === user.id ? <Button color="warning" onClick={handleEdit}>Edit Comment</Button> : ""}
                <br/>
                {commentProp.userProfileId === user.id ? <Button color="danger" onClick={handleDelete}>Delete Comment</Button> : ""}
                
                
                    
            
            </CardBody>
        </Card>
    );
};

export default Comment;