import React, { useEffect, useContext, useState } from "react";
// import { ListGroup, ListGroupItem } from "reactstrap";
import { PostContext } from "../../providers/PostProvider";
import { useParams } from "react-router-dom";
import { Card, CardBody, CardImg, Button, CardGroup, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { CommentContext } from "../../providers/CommentProvider";
import Comment from "../comment/Comment";
import Swal from 'sweetalert2';


const PostDetails = () => {
    const [post, setPost] = useState();
    const { getPost } = useContext(PostContext);
    const { comments, getAllCommentsByPostId, addComment } = useContext(CommentContext)
    const { id } = useParams();
    const navigate = useNavigate();
    //added this just to be able to update state
    //Added swalProps to useEffect and setSwalProps to add comment
    //When addComment set swalProps useEffect updates stat and refreshes comments
    const [swalProps, setSwalProps] = useState()

    //State is for view more. slice your map to state "visible"
    //Change number in state for initial number of cards
    const [visible, setVisible] = useState(5)

    //function that adds a number to state visible to increase the number of cards seen
    //this is called on the button
    //change the number to adjust how many cards you want added
    const showMorePosts = () => {
        setVisible((prevValue) => prevValue + 5)
    }

    //get current user
    const user = JSON.parse(sessionStorage.getItem("userProfile"))

    //swalProps in brackets is just to update state when new comment is added
    useEffect(() => {

        getPost(id).then(setPost)
            .then(getAllCommentsByPostId(id));

    }, [swalProps]);

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
            if (result.isConfirmed) {
                addComment({
                    postId: id,
                    userProfileId: user.id,
                    subject: result.value.subject,
                    content: result.value.content
                })
                    .then(setSwalProps) //setSwalProps just to update state to refresh comments

            }
        })


    }





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

            <br /><br /><br /><br />
            <div className="container m-4">
                <h4>Comments</h4>
                <Button onClick={handleCommentModal} >Add Comment</Button>
                <CardGroup>
                    <Row>
                        {comments.slice(0, visible).map((c) => (
                            <Comment key={c.id} commentProp={c} swalProp={setSwalProps} postId={id} />
                        ))}
                    </Row>
                </CardGroup>
                <Button
                    onClick={showMorePosts}
                >View More Comments</Button>
            </div>
        </>
    );
};

export default PostDetails;