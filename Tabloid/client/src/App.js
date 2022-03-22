import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { CategoryProvider} from "./providers/CategoryProvider";

function App() {
  return (
    <Router>
      <CategoryProvider>
      <UserProfileProvider>
        <Header />
        <ApplicationViews />
      </UserProfileProvider>
      </CategoryProvider>
    </Router>
  );
}

export default App;
