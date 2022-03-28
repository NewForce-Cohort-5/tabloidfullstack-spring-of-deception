import React, { useState } from "react";

export const CommentContext = React.createContext();

export const CommentProvider = (props) => {
    const [comments, setComments] = useState([]);
    const apiUrl = "https://localhost:44360";

    const getAllCommentsByPostId = (id) => {
        return fetch(`${apiUrl}/api/Comment/${id}`)
            .then((res) => res.json())
            .then(setComments);
    };

    

    return (
        <CommentContext.Provider value={{ comments, getAllCommentsByPostId }}>
            {props.children}
        </CommentContext.Provider>
    );
}