import "./App.css";
import { AuthProvider } from "../src/utils/AuthContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreatePost from "./components/CreatePost";
import Community from "./components/Community";
import Main from "./components/Main";
import { CollectionProvider } from "./utils/CollectionContext";
import { PostProvider } from "./utils/PostContext";
import { CommunityProvider } from "./utils/CommunityContext";
import { SortProvider, VotesProvider } from "./utils/SortContext";
import { SignInMethod } from "firebase/auth";
import SinglePostPage from "./components/SinglePostPage";

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
  {
    path: "/Post/:id",
    element: <SinglePostPage />,
  },
]);

function App() {
  return (
    <AuthProvider>
      <CollectionProvider>
        <PostProvider>
          <CommunityProvider>
            <SortProvider>
              <div className="App">
                <RouterProvider router={appRouter} />
              </div>
            </SortProvider>
          </CommunityProvider>
        </PostProvider>
      </CollectionProvider>
    </AuthProvider>
  );
}

export default App;
