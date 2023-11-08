import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./css/app.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from "./components/notFound"
import SideBar from "./components/sideBar";
import HomeAdmin from "./components/homeAdmin";
import MobileAdmin from "./components/mobileAdmin";

function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <SideBar />
          <div className="content">
            <Routes>
              <Route path="/admin" element={<HomeAdmin />}>
                <Route path="mobile" element={<MobileAdmin />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </div>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
        />
      </BrowserRouter>
    </>
  );
}

export default App;
