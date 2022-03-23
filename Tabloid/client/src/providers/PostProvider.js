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

    const getUsersPosts = (id) => {
        return fetch(`${apiUrl}/api/post/user/${id}`)
            .then((res) => res.json())
            .then(setPosts);
    };

    return (
        <PostContext.Provider value={{ posts, getAllPosts, getPost, getUsersPosts }}>
            {props.children}
        </PostContext.Provider>
    );
}