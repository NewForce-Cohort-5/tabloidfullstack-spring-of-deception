import React, { useEffect, useContext, useState } from "react";
// import { ListGroup, ListGroupItem } from "reactstrap";
import { PostContext } from "../../providers/PostProvider";
import { useParams } from "react-router-dom";
import { Card, CardBody, CardImg, Button, CardGroup, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { CommentContext } from "../../providers/CommentProvider";
import Comment from "../comment/Comment";
import Swal from 'sweetalert2';
import {CommentForm} from "../comment/CommentForm"
import swal from '@sweetalert/with-react'


const PostDetails = () => {
    const [post, setPost] = useState();
    const { getPost } = useContext(PostContext);
    const {comments, getAllCommentsByPostId, addComment} = useContext(CommentContext)
    const { id } = useParams();
    const navigate = useNavigate();
    const [swalProps, setSwapProps] = useState()

    //get current user
    const user = JSON.parse(sessionStorage.getItem("userProfile"))

    useEffect(() => {
       
        getPost(id).then(setPost)
        .then(getAllCommentsByPostId(id));
        
    }, []);

    if (!post) {
        return null;
    }

    let date = new Date(post.publishDateTime);
    let formattedDate = date.toLocaleDateString('en-US')

    const handleCommentModal = () => {
        Swal.fire({
            title: 'Comment',
            html: `<input type="text" id="subject" class="swal2-input" placeholder="Subject">
            <textarea cols="30" rows="5" id="content" class="swal2-input" placeholder="Content">`,
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
            addComment(`
                postId: ${id}
                userProfileId: ${user.id}
                subject: ${result.value.subject}
                content: ${result.value.content}
            `)
        // .then(getAllCommentsByPostId(id))
        
        // .then((result) => {
        //     addComment({
        //         postId: id,
        //         userProfileId: user.id,
        //         subject: result.value.subject,
        //         content: result.value.content
        //     })
        // .then(getAllCommentsByPostId(id))

    })

    

    return (
        <>
        <Card className="container m-4">
            <CardImg top src={post.imageLocation} alt={post.title} />
            <CardBody>
                <p>
                    <strong>{post.title}</strong>
                </p>
                <p>{post.content}</p>
                <p>Published on: {formattedDate}</p>
                <p>User: {post.userProfile.displayName}</p>
            </CardBody>
            <Button onClick={() => navigate(-1)}>Go back</Button>
        </Card>

        <br/><br/><br/><br/>
        <div className="container m-4">
            <h4>Comments</h4>
            <Button onClick={handleCommentModal} >Add Comment</Button>
        <CardGroup>
      <Row>
        {comments.map((c) => (
          <Comment key={c.id} commentProp={c} />
        ))}
      </Row>
    </CardGroup>
        </div>
        </>
    );
};

export default PostDetails;