import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from "./pages/client/Home";
import Login from "./pages/client/Login";
import Detail from "./pages/client/Detail";
import Register from "./pages/client/Register";
import Cart from "./pages/client/Cart";
import Profile from "./pages/client/Profile";
import Mobile from "./pages/admin/Mobile";
import Order from "./pages/admin/Order";
import User from "./pages/admin/User";
import Statistics from "./pages/admin/Statistics";
import AddUser from "./pages/admin/AddUser";
import UpdateUser from "./pages/admin/UpdateUser";
import NotFound from "./components/NotFound";
import AdminLayout from "./pages/admin/AdminLayout";
import UserLayout from './pages/client/UserLayout';
import "./style.scss";
import { Provider } from 'react-redux';
import store from "./redux/Store";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "detail",
        children: [
          {
            path: ":id",
            element: <Detail />,
          },
          {
            path: "*",
            element: <NotFound />
          }
        ]
      },
      {
        path: "login",
        element: <Login />
      },

      {
        path: "register",
        element: <Register />
      },
      {
        path: "cart",
        element: <Cart />
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }, {
    path: "admin",
    element: <AdminLayout />,
    children: [
      {
        path: 'stats',
        element: <Statistics />
      },
      {
        path: 'user',
        element: <User />,
      },
      {
        path: 'user/add',
        element: <AddUser />
      },
      {
        path: 'user/update/:id',
        element: <UpdateUser />
      },
      {
        path: 'mobile',
        element: <Mobile />
      },
      {
        path: 'order',
        element: <Order />
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
]);

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
        />
      </div>
    </Provider>
  );
}

export default App;