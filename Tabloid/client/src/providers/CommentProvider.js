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

    const updateComment = comment => {
        debugger
        return fetch(`https://localhost:44360/api/Comment/${comment.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comment)
        })
    }

    return (
        <CommentContext.Provider value={{ comments, getAllCommentsByPostId, addComment, deleteComment, updateComment }}>
            {props.children}
        </CommentContext.Provider>
    );
}