import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage.jsx";
import TaskPage from "./components/pages/TaskPage.jsx";
import EditProfilePage from "./components/pages/EditProfilePage.jsx";
import { ChakraProvider } from "@chakra-ui/react";

const router = createBrowserRouter([

  {
    path: "/",
    element: <TaskPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/edit-profile",
    element: <EditProfilePage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </StrictMode>
);
