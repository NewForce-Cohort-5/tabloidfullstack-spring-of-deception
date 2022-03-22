import React, { useContext, useEffect, useState } from "react";
import { CategoryContext } from "../../providers/CategoryProvider";
import Category from "./CategoryCard";
import { useNavigate} from "react-router-dom";

export const CategoryForm = () => {

    const { addCategory, getAllCategories} = useContext(CategoryContext)

    const [category, setCategory] = useState({})

    const navigate = useNavigate();

    useEffect(() => {
        getAllCategories()
    }, [])

    const handleControlledInputChange = (event) => {
        const newCategory = {...category}
        newCategory[event.target.id] = event.target.value
        setCategory(newCategory)
    }

    const handleSaveCategory = (event) => {
        event.preventDefault()
        addCategory(category)
        .then(navigate("/category"))
    }

    return (
        <form className="categoryForm">
            <h2 className="categoryForm_title">New Category</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="category-name">Name: </label>
                    <input className="form-control" type="text" id="name" onChange={handleControlledInputChange} />
                    <button className="btn btn-primary" type="submit" onClick={handleSaveCategory}>Save Category</button>
                </div>
            </fieldset>
        </form>
    )



}