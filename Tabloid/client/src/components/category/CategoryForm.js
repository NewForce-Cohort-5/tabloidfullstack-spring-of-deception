import React, { useContext, useEffect, useState } from "react";
import { CategoryContext } from "../../providers/CategoryProvider";
import { useNavigate, useParams} from "react-router-dom";

export const CategoryForm = () => {

    const { addCategory, getAllCategories, updateCategory, getCategoryById} = useContext(CategoryContext)

    const [category, setCategory] = useState({})
    const [isLoading, setIsLoading] = useState(true);

    const { categoryId } = useParams();

    const navigate = useNavigate();


    useEffect(() => {
        getAllCategories().then(() => {
            if (categoryId) {
                getCategoryById(categoryId)
                .then(category => {
                    setCategory(category)
                    setIsLoading(false)
                })
            } else {
                setIsLoading(false)
            }
        })

        
    }, [])

    const handleControlledInputChange = (event) => {
        const newCategory = {...category}
        newCategory[event.target.id] = event.target.value
        setCategory(newCategory)
    }

    const handleSaveCategory = (e) => {
        e.preventDefault()
        if (categoryId) {
        
            updateCategory({
                id: category.id,
                name: category.name
            })
            .then(() => navigate(`/category`))
        } else {
          
            addCategory({
                name: category.name
            })
            .then(() => navigate(`/category`))
        }
    }

    return (
        <form className="categoryForm">
            <h2 className="categoryForm_title">New Category</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="category-name">Name: </label>
                    <input className="form-control" type="text" value={category.name} id="name" onChange={handleControlledInputChange} />
                    <button className="btn btn-primary" type="submit" onClick={handleSaveCategory}>Save Category</button>
                </div>
            </fieldset>
        </form>
    )



}