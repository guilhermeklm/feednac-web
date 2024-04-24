import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Home from "./components/Home"
import ErrorPage from "./error-page";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import StudentLogin from "./components/StudentLogin";
import StudentHome from "./components/StudentHome";
import TeacherLogin from "./components/TeacherLogin";
import TeacherHome from "./components/TeacherHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/student",
    element: <StudentLogin />,
  },
  {
    path: "/student/:id",
    element: <StudentHome />,
  },
  {
    path: "/teacher",
    element: < TeacherLogin />
  },
  {
    path: "/teacher/:id",
    element: <TeacherHome />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
