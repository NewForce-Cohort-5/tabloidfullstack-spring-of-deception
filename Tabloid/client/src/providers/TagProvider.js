import React, { useState, createContext } from "react"

export const TagContext = createContext()

export const TagProvider = (props) => {

    const [tags, setTags] = useState([])

    const getAllTags = () => {
        return fetch(`https://localhost:44360/api/Tag
        `)
        .then((res) => res.json())
        .then(setTags);
    }

    return (
        <TagContext.Provider value={{tags, getAllTags}}>
            {props.children}
        </TagContext.Provider>
    )
}