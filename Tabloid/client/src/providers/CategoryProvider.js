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
        }).then(r => {
            if(r.ok){
                getAllCategories()
            }
            else{
                alert("There's too much information in this category to delete it!")
            }
        })
    }

    const updateCategory = cat => {
        return fetch(`https://localhost:44360/api/Category/${cat.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cat)
        }).then(getAllCategories)
    }


    const getCategoryById = (id) => {
        return fetch (`https://localhost:44360/api/Category/${id}`)
        .then(res => res.json())
    }

    return (
        <CategoryContext.Provider value={{categories, getAllCategories, addCategory, deleteCategory, updateCategory, getCategoryById}}>
            {props.children}
        </CategoryContext.Provider>
    );
};