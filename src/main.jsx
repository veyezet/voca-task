import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "./components/ui/provider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage.jsx";
import TaskPage from "./components/pages/TaskPage.jsx";
import EditProfilePage from "./components/pages/EditProfilePage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/tasks",
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
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
