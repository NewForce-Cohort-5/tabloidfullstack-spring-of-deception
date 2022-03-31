import React, { useState, useContext, useEffect } from "react";
import {
    Form,
    FormGroup,
    Card,
    CardBody,
    Label,
    Input,
    Button,
} from "reactstrap";
import { PostContext } from "../../providers/PostProvider";
import { useNavigate } from "react-router-dom";
import { CategoryContext } from "../../providers/CategoryProvider";

const PostForm = () => {
    const { addPost } = useContext(PostContext);
    const { categories, getAllCategories } = useContext(CategoryContext)
    // const [userProfileId, setUserProfileId] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageLocation, setImageLocation] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const user = JSON.parse(sessionStorage.getItem("userProfile"))

    // Use this hook to allow us to programatically redirect users
    const navigate = useNavigate();


    const submit = (e) => {
        const post = {
            title,
            content,
            imageLocation,
            isApproved: true,
            categoryId,
            userProfileId: +user.id
        };
        if (post.title === "" || post.content === "") {
            alert("Please make sure title and content are filled out");
        } else {
            addPost(post).then((p) => {
                // Navigate the user back to the posts list
                navigate("/posts");
            });
        }
    };
    useEffect(() => {
        getAllCategories()
    }, []);


    return (
        <div className="container pt-4">
            <div className="row justify-content-center">
                <Card className="col-sm-12 col-lg-6">
                    <CardBody>
                        <Form>
                            {/* <FormGroup>
                                <Label for="userId">User Id (For Now...)</Label>
                                <Input
                                    id="userId"
                                    onChange={(e) => setUserProfileId(e.target.value)}
                                />
                            </FormGroup> */}
                            <FormGroup>
                                <Label for="imageLocation">Image URL</Label>
                                <Input
                                    id="imageLocation" required autoFocus
                                    onChange={(e) => setImageLocation(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input required id="title" onChange={(e) => setTitle(e.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="content">Content</Label>
                                <Input
                                    id="content" required
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="categoryId">Category</Label>
                                <br />
                                <select id="categoryId" onChange={(e) => setCategoryId(e.target.value)}>
                                    {/* <option value="0">Select a Category</option> */}
                                    {categories.map(c => (
                                        <option key={c.id} value={c.id}>
                                            {c.name}
                                        </option>))}
                                </select>
                            </FormGroup>
                        </Form>
                        <Button color="info" onClick={submit}>
                            SUBMIT
                        </Button>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default PostForm;