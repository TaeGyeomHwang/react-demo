import axios from "axios";
import { TOKEN_REFRESH_API } from "./constants/api_constant";
import { LOGIN } from "./constants/page_constant";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const fetcher = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
})

// 요청 보낼 때 전처리
fetcher.interceptors.request.use(
  (request) => {
    const accessToken = localStorage.getItem("access_token");
    request.headers.Authentication = `Bearer ${accessToken}`;

    return request;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
)

fetcher.interceptors.response.use(
  // 응답번호가 200번(정상)일때
  (response) => {
    return response;
  },
  // 에러 발생 경우
  async (error) =>{
    // 401이 들어왔을 때(비동기)
    if(error.response.status === 401){
      await tokenRefresh();
      const accessToken = localStorage.getItem("access_token");
      error.config.headers['Authentication'] = `Bearer ${accessToken}`;
      const response = await axios.request(error.config);
      return response;
    }
    // 403이 들어왔을 때 (권한이 없을 경우)
    if(error.response.status === 403){
      alert("해당 페이지 권한이 없습니다.");
    }
    // 그 이외는 버리도록 함
    return Promise.reject(error);
  } 
)

const tokenRefresh = async () => {
  const refreshToken = localStorage.getItem("refresh_token");

  try {
    const formData = new FormData();
    formData.append("refreshToken", refreshToken);

    const response = await axios.post(
      API_BASE_URL + TOKEN_REFRESH_API,
      formData
    )

    localStorage.setItem("access_token", response.data.accessToken);
    localStorage.setItem("refresh_token", response.data.refreshToken);
    localStorage.setItem("authority", response.data.authority);
  } catch (error) {
    // 리프레시 토큰까지 만료되었을 경우 로그인 화면으로 이동
    window.location.href = LOGIN;
  }
}

export default fetcher;