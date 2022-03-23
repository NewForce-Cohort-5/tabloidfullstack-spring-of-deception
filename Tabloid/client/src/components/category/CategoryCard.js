import React from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CategoryContext } from "../../providers/CategoryProvider";
import { useContext } from "react";
import { Alert } from "reactstrap";
import Swal from "sweetalert2";


const Category = ({category}) => {

    const { deleteCategory} = useContext(CategoryContext)

    const navigate = useNavigate();

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
              deleteCategory(category.id)
            }
          })
      
    }

    return (
        <>
        <p className="category-list">{category.name}</p>
        <button className="deleteCategory" onClick={event => {
            event.preventDefault()
            handleClickDelete()
        }}>Delete</button>
        </>
    )
}
export default Category;