import React, { useContext, useEffect, useState} from "react";
import { Navigate } from "react-router-dom";
import { CategoryContext } from "../../providers/CategoryProvider";
import  Category from "./CategoryCard"
import { useNavigate } from "react-router-dom";

export const CategoryList = () => {
    const { categories, getAllCategories } = useContext(CategoryContext);

const navigate = useNavigate();

useEffect(() => {
    getAllCategories();
}, []);

return (

<div className="container">
    <h3 className="category-header">Categories</h3>

    <button id="addCategory" onClick={() => {
        navigate("/category/add")
    }}>Add new category</button>

    <div className="category-column">
    {categories.map((singleCatInLoop) => (
        <Category key={singleCatInLoop.id} category={singleCatInLoop} />
    ))}

    </div>
</div>




)



}