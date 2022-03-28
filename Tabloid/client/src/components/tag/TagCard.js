import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TagContext } from "../../providers/TagProvider";
import Swal from "sweetalert2";

const Tag = ({tag}) => {

    const navigate = useNavigate();

    const {deleteTag } = useContext(TagContext)

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
          deleteTag(tag.id)
        }
      })
      deleteTag(tag)
  }

return (

    <>
    <p className="tag-list">{tag.name}</p>

    <button className="updateTag" onClick={() => {
        navigate(`/tag/edit/${tag.id}`)
    }}>Edit</button>

    <button className="deleteTag" onClick={event => {
        event.preventDefault()
        handleClickDelete()
    }}>Delete</button>

  
    
    </>

)
}

export default Tag;