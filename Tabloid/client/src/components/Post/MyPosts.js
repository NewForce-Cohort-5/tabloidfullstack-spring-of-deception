import React, { useContext, useEffect } from "react";
import { PostContext } from "../../providers/PostProvider";
import Post from "./Post";

const MyPosts = () => {
    const { posts, getAllPosts } = useContext(PostContext);

    useEffect(() => {
        getAllPosts();
    }, []);

    const user = JSON.parse(sessionStorage.getItem("userProfile"))
    return (
        <div className="container">
            <div className="row justify-content-center">
                <h2>My Posts</h2>
                <div className="cards-column">
                    <br />
                    {posts.filter(p => p.userProfileId === user.id).map((post) => (
                        <Post key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyPosts;