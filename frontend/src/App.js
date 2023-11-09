import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Detail from "./pages/Detail";
import Register from "./pages/Register";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import "./style.scss"

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

const router = createBrowserRouter([
  {
    parh: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },

      {
        path: "/detail/:id",
        element: <Detail />
      },

      {
        path: "/login",
        element: <Login />
      },

      {
        path: "/register",
        element: <Register />
      },
    ]
  },
]);

function App() {
  return (
    <div className="app">
      <div className='container'>
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
