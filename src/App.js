import "./App.css";
import { AuthProvider } from "../src/utils/AuthContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreatePost from "./components/CreatePost";
import Community from "./components/Community";
import Main from "./components/Main";
import { CollectionProvider } from "./utils/CollectionContext";
import { PostProvider } from "./utils/PostContext";
import { CommunityProvider } from "./utils/CommunityContext";
import { VotesProvider } from "./utils/VotesContext";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/Home",
    element: <Main />,
  },
  {
    path: "/:id",
    element: <Community />,
  },
  {
    path: "/submit",
    element: <CreatePost />,
  },
]);

function App() {
  return (
    <AuthProvider>
      <CollectionProvider>
        <PostProvider>
          <CommunityProvider>
            <div className="App">
              <RouterProvider router={appRouter} />
            </div>
          </CommunityProvider>
        </PostProvider>
      </CollectionProvider>
    </AuthProvider>
  );
}

export default App;
