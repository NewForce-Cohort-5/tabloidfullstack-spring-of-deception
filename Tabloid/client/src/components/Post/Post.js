import React, { useState, useContext} from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import Swal from "sweetalert2";
import { PostContext } from "../../providers/PostProvider";
import { Button } from "reactstrap";

const Post = ({ post }) => {

    const { deletePost } = useContext(PostContext)
    const user = JSON.parse(sessionStorage.getItem("userProfile"))
    // const [reloadState, setState] = useState();

    const handleClickDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deletePost(post.id).then(window.location.reload(false))
                Swal.fire(
                    'Deleted!',
                    'Post has been deleted.',
                    'success'
                )
            }
        })

    }

    return (
        <Card className="container m-4">
            <p className="text-left px-2">Posted by: {post.userProfile.fullName}</p>
            <CardBody>
                <p>
                    <Link to={`/posts/${post.id}`}>
                        <strong>{post.title}</strong>
                    </Link>
                </p>
                <p>Category: {post.category.name}</p>
                {post.userProfile.id === user.id || user.userTypeId === 1 ? <Button color="danger" onClick={handleClickDelete}>Delete Post</Button> : ""}
            </CardBody>
        </Card>
    );
};

export default Post;