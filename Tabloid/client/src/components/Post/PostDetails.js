import React, { useEffect, useContext, useState } from "react";
// import { ListGroup, ListGroupItem } from "reactstrap";
import { PostContext } from "../../providers/PostProvider";
import { useParams } from "react-router-dom";
import { Card, CardBody, CardImg, Button, CardGroup, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { CommentContext } from "../../providers/CommentProvider";
import Comment from "../comment/Comment";

const PostDetails = () => {
    const [post, setPost] = useState();
    const { getPost } = useContext(PostContext);
    const {comments, getAllCommentsByPostId} = useContext(CommentContext)
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
       
        getPost(id).then(setPost)
        .then(getAllCommentsByPostId(id));
        
    }, []);

    if (!post) {
        return null;
    }

    let date = new Date(post.publishDateTime);
    let formattedDate = date.toLocaleDateString('en-US')

    

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