import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams} from "react-router-dom";
import { CommentContext } from "../../providers/CommentProvider";
import Swal from 'sweetalert2';


export const CommentForm = () => {
    const { addComment, getAllCommentsByPostId} = useContext(CommentContext)
    //Make state to set comment
    const [comment, setComment] = useState({})
    //Only push button once
    const [isLoading, setIsLoading] = useState(true);
    //get postId for comment
    const { postId } = useParams();

    const navigate = useNavigate();

    //get current user
    const user = JSON.parse(sessionStorage.getItem("userProfile"))

    useEffect(() => {
        

        
    }, [])

    const handleControlledInputChange = (event) => {
        const newComment = {...comment}
        newComment[event.target.id] = event.target.value
        setComment(newComment)
    }

    const handleSaveComment = (e) => {
        e.preventDefault()
        // if (comment.Id) {
        
        //     updateCategory({
        //         id: category.id,
        //         name: category.name
        //     })
        //     .then(() => navigate(`/category`))
        // } else {
          
            addComment({
                postId: postId,
                userProfileId: user.id,
                subject: comment.subject,
                content: comment.content                
            })
            .then(getAllCommentsByPostId(postId))
        // }
    }

    return (
        <form className="commentForm">
            <h2 className="commentForm">New Comment</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="comment-subject">Subject: </label>
                    <input className="form-control" type="text" value={comment.subject} id="subject" onChange={handleControlledInputChange} />
                    
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="comment-content">Content: </label>
                    <textarea cols="40" rows="5" className="form-control" type="text" value={comment.content} id="name" onChange={handleControlledInputChange} />
                </div>
            </fieldset>

            <button className="btn btn-primary" type="submit" onClick={handleSaveComment}>Save Category</button>
        </form>
    )



}