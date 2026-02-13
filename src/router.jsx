import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
import Home from "./components/Home"
import TextGenerator from "./components/TextGenerator"

export const router = createBrowserRouter([
    {path: "/", element: <Home />},
    {path: "/signup", element: <SignUp />},
    {path: "/signin", element: <SignIn />},
    {path: "/test", element: <TextGenerator />},

    {
        element: <ProtectedRoute />,
        children: [
            {
                path: "/chat",
               element: <TextGenerator />
            },

        ]
    }
])
