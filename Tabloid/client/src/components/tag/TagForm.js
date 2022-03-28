import React, { useContext, useEffect, useState } from "react";
import { TagContext } from "../../providers/TagProvider";
import { useNavigate, useParams} from "react-router-dom";

export const TagForm =() => {

    const {addTag, getAllTags, deleteTag, updateTag, getTagById} = useContext(TagContext)

    const [isLoading, setIsLoading] = useState(true);
    const [tag, setTag] = useState({});

    const { tagId } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        getAllTags().then(() => {
            if (tagId) {
                getTagById(tagId)
                .then(tag => {
                    setTag(tag)
                    setIsLoading(false)
                })
            } else {
                setIsLoading(false)
            }
        })
    }, [])

 
    const handleControlledInputChange = (event) => {
        const newTag = {...tag}
        newTag[event.target.id] = event.target.value
        setTag(newTag)
    }

    const handleSaveTag = (e) => {
        e.preventDefault()
        if (tagId) {
        
            updateTag({
                id: tag.id,
                name: tag.name
            })
            .then(() => navigate(`/tag`))
        } else {
          
            addTag({
                name: tag.name
            })
            .then(() => navigate(`/tag`))
        }
    }

    return (

        <form className="tagForm">
            <h2 className="tagForm_title">New Tag</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="tag-name">Name: </label>
                    <input className="form-control" type="text" value={tag.name} id="name" onChange={handleControlledInputChange} />
                    <button className="btn btn-primary" type="submit" onClick={handleSaveTag}>Save Tag</button>
                </div>
            </fieldset>
        </form>

    )

}