import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TagContext } from "../../providers/TagProvider";

const Tag = ({tag}) => {

    const navigate = useNavigate();

return (

    <>
    <p className="tag-list">{tag.name}</p>

  
    
    </>

)
}

export default Tag;