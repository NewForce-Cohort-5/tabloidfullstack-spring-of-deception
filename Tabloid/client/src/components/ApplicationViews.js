import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import {
  UserProfileContext,
  UserProfileProvider,
} from "../providers/UserProfileProvider";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Hello from "./Hello";
import { CategoryList} from "./category/CategoryList"
import { CategoryProvider } from "../providers/CategoryProvider";
import { CategoryForm } from "./category/CategoryForm";
import UserProfileList from "./userProfile/UserProfileList";
import PostList from "./Post/PostList";
import PostDetails from "./Post/PostDetails";
import UserProfileDetails from "./userProfile/UserProfileDetails";
import MyPosts from "./Post/MyPosts";
import { UserProfileForm } from "./userProfile/UserProfileForm";
import { TagList } from "./tag/TagList";
import { TagForm } from "./tag/TagForm";
import PostForm from "./Post/PostForm";


export default function ApplicationViews() {
  const { isLoggedIn, userProfile } = useContext(UserProfileContext);

  
  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  } 
  else{
   return(
      <Routes>
        <Route path="/" element={<Hello />} />

        <Route path="/userProfiles" element={<UserProfileList />} />
        <Route path="/userProfile/:id" element={<UserProfileDetails />} />

        <Route path="/userProfiles/edit/:id" element={<UserProfileForm />} />

        <Route path="/posts" element={<PostList />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/posts/add" element={<PostForm />} />

        <Route path="/myposts" element={<MyPosts />} />

        <Route path="/category" element={<CategoryList />} />

        <Route path="/category/add" element={<CategoryForm />} />

        <Route path="/category/edit/:categoryId" element={<CategoryForm />} />

        <Route path="/tag" element={<TagList />} />

        <Route path="/tag/add" element={<TagForm />} />

        <Route path="/tag/edit/:tagId" element={<TagForm />} />
      </Routes>
   );
  }
}
