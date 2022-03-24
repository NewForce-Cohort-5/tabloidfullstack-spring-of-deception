import React, { useContext, useEffect, useState} from "react";
import { TagContext } from "../../providers/TagProvider";
import { useNavigate } from "react-router-dom";
import Tag from "./TagCard"

export const TagList = () => {
    const {tags, getAllTags } = useContext(TagContext);

    const navigate = useNavigate();

    useEffect(() => {
        getAllTags();
    }, [])

return (

<div className="container">
    <h3 className="tag-header">Tags</h3>

    <div className="tags-column">
        {tags.map((singleTagInLoop) => (<Tag key={singleTagInLoop.id} tag={singleTagInLoop} />))}
    </div>
</div>

)
}