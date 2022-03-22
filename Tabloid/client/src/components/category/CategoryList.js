import React, { useContext, useEffect, useState} from "react";
import { CategoryContext } from "../../providers/CategoryProvider";
import  Category from "./CategoryCard"

export const CategoryList = () => {
    const { categories, getAllCategories } = useContext(CategoryContext);

useEffect(() => {
    getAllCategories();
}, []);

return (

<div className="container">
    <h3 className="category-header">Categories</h3>

    <div className="category-column">
    {categories.map((singleCatInLoop) => (
        <Category key={singleCatInLoop.id} category={singleCatInLoop} />
    ))}

    </div>
</div>




)



}