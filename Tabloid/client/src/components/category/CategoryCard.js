import React from "react";


const Category = ({category}) => {
    return (
        <>
        <p className="category-list">{category.name}</p>
        </>
    )
}
export default Category;