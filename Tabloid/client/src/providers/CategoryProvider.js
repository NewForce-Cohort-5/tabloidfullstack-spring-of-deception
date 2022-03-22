import React, { useState } from "react";

export const CategoryContext = React.createContext();

export const CategoryProvider = (props) => {
    const [categories, setCategories] = useState([])


    const getAllCategories = () => {
        return fetch("https://localhost:44360/api/Category")
        .then((res) => res.json())
        .then(setCategories);
    };


    const addCategory = (category) => {
        return fetch("https://localhost:44360/api/Category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      }).then(getAllCategories)
    }

    const deleteCategory = catId => {
        return fetch(`https://localhost:44360/api/Category/${catId}`, {
            method: "DELETE"
        }).then(getAllCategories)
    }

    return (
        <CategoryContext.Provider value={{categories, getAllCategories, addCategory, deleteCategory}}>
            {props.children}
        </CategoryContext.Provider>
    );
};