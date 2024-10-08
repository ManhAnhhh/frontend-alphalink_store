import axios from "axios";
import { PopUp } from "../share/utilities";
import { store } from "../redux/store";
import { setLoading } from "../redux/reducers/loading";

// tạo một axios client mới, đặt baseURL và vớiCredentials: true để có thể đăng nhập cookie
const Http = axios.create({
  baseURL: process.env.REACT_APP_BASE_API,
  withCredentials: true,
});

// interceptors nhận vào 2 tham số,
// tham số thứ nhất xử lý phản hồi thành công. (nếu để undefined thì bỏ qua xử lý phản hồi thành công)
// tham số thứ 2: Hàm xử lý lỗi, dùng để log lỗi hoặc thực hiện các biện pháp khắc phục khi gặp sự cố.
Http.interceptors.response.use(
  (res) => {
    store.dispatch(setLoading(false));
    return res;
  },
  (error) => {
    // console.log(error);
    if (error.message === "Network Error") {
      PopUp({
        type: "error",
        content: error.message,
      });
      store.dispatch(setLoading(true));
    }
    return Promise.reject(error);
  }
);

export default Http;
