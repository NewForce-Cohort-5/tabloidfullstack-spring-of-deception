import React, { useState } from "react";

export const PostContext = React.createContext();

export const PostProvider = (props) => {
    const [posts, setPosts] = useState([]);
    const apiUrl = "https://localhost:44360";

    const getAllPosts = () => {
        return fetch(`${apiUrl}/api/post`)
            .then((res) => res.json())
            .then(setPosts);
    };

    const getPost = (id) => {
        return fetch(`${apiUrl}/api/Post/${id}`).then((res) => res.json());
    };

    return (
        <PostContext.Provider value={{ posts, getAllPosts, getPost }}>
            {props.children}
        </PostContext.Provider>
    );
}