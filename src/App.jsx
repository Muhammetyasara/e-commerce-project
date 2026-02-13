import { useEffect } from "react";
import { useDispatch } from "react-redux";
import PageContent from "./router/PageContent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { verifyToken } from "./store/actions/clientActions";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (token) {
      dispatch(verifyToken());
    }
  }, [dispatch]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <PageContent />
    </>
  );
}