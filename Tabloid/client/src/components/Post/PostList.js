import React, { useContext, useEffect } from "react";
import { PostContext } from "../../providers/PostProvider";
import Post from "./Post";

const PostList = () => {
  const { posts, getAllPosts } = useContext(PostContext);

  useEffect(() => {
    getAllPosts();
  }, []);

  // const user = JSON.parse(sessionStorage.getItem("userProfile"))
  // if (user.userTypeId === 1) {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <h2>All Posts</h2>
          <div className="cards-column">
            <br />
            {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    );
  // } else {
  //   return "";
  // }
};

export default PostList;