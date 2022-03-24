import React, { useEffect, useContext, useState } from "react";
// import { ListGroup, ListGroupItem } from "reactstrap";
import { PostContext } from "../../providers/PostProvider";
import { useParams } from "react-router-dom";
import { Card, CardBody, CardImg, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

const PostDetails = () => {
    const [post, setPost] = useState();
    const { getPost } = useContext(PostContext);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getPost(id).then(setPost);
    }, []);

    if (!post) {
        return null;
    }

    let date = new Date(post.publishDateTime);
    let formattedDate = date.toLocaleDateString('en-US')

    return (
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
    );
};

export default PostDetails;