import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../../providers/PostProvider";
import Post from "./Post";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

const PostList = () => {
  const { posts, getAllPosts } = useContext(PostContext);
  const [reload, setReload] = useState();
  
  useEffect(() => {
    getAllPosts();
  }, [reload])
  
  const navigate = useNavigate();

  //State is for view more. slice your map to state "visible"
  //Change number in state for initial number of cards
  const [visible, setVisible] = useState(5)
  
  //function that adds a number to state visible to increase the number of cards seen
  //this is called on the button
  //change the number to adjust how many cards you want added
  const showMorePosts = () => {
    setVisible((prevValue) => prevValue + 5)
  }

  // const user = JSON.parse(sessionStorage.getItem("userProfile"))
  // if (user.userTypeId === 1) {
  return (
    <div className="container">
      <button id="addPost" onClick={() => {
        navigate("/posts/add")
    }}>Add new post</button>
      <div className="row justify-content-center">
        <h2>All Posts</h2>
        <div className="cards-column">
          <br />

          {posts.slice(0, visible).map((post) => (
            <Post key={post.id} post={post} reloadProp={setReload} />
          ))}
          
          <Button
          onClick={showMorePosts}
          >View More Posts</Button>
        </div>
      </div>
    </div>
  );
  // } else {
  //   return "";
  // }
};

export default PostList;