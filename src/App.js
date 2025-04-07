import router from "./routes";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import { Provider, useSelector } from "react-redux";
import { store, persistor } from "./redux/store";
import { useEffect } from "react";

const Loading = () => {
  return (
    <div
      className="position-fixed top-0 end-0 start-0 bottom-0 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
    >
      <div
        className="spinner-border"
        style={{ width: "3rem", height: "3rem" }}
        role="status"
      >
        <span className="visually-hidden">Đang tải...</span>
      </div>
    </div>
  );
};

const App = () => {
  const isLoading = useSelector((state) => state.Loading.isLoading);
  useEffect(() => {
    // Set overflow hidden khi bắt đầu loading
    if (isLoading) {
      document.body.style.overflowY = "hidden";
    }
    // Cleanup function để khôi phục lại overflow
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLoading]);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router} />
        <ToastContainer pauseOnFocusLoss={false} closeOnClick />
        {isLoading && <Loading />}
      </PersistGate>
    </Provider>
  );
};

export default App;
