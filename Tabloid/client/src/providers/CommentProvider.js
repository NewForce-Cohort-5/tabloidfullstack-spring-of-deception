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

    const addComment = (comment) => {
        return fetch("https://localhost:44360/api/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      })
    };

    const deleteComment = commentId => {
        return fetch(`https://localhost:44360/api/comment/${commentId}`, {
            method: "DELETE"
        })
    }

    return (
        <CommentContext.Provider value={{ comments, getAllCommentsByPostId, addComment, deleteComment }}>
            {props.children}
        </CommentContext.Provider>
    );
}