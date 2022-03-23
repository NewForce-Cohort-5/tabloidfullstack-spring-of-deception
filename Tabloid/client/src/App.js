import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { CategoryProvider } from "./providers/CategoryProvider";
import { PostProvider } from './providers/PostProvider';

function App() {
  return (
    <Router>
      <CategoryProvider>
        <UserProfileProvider>
          <PostProvider>
            <Header />
            <ApplicationViews />
          </PostProvider>
        </UserProfileProvider>
      </CategoryProvider>
    </Router>
  );
}

export default App;
