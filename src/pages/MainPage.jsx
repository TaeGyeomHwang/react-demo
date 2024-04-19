import axios from "axios";
import { useEffect, useState } from "react";
import{
  MAIN_INIT_DATA_API
} from "../constants/api_constant";

export default function MainPage() {
  
  const [initData, setInitData] = useState("서버 통신 불가");

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const fetchInitData = async () => {
    try{

      // 서버로부터 get 요청으로 데이터 받아옴
      const response = await axios.get(
        API_BASE_URL + MAIN_INIT_DATA_API
      )

      // 받아온 데이터를 사용해서 initData(State)값 변경
      setInitData(response.data);

    }catch(error){
      console.error("데이터 가져오기 오류", error);
    }
  };

  useEffect(() => {
    // 서버로부터 받아온 데이터를 initData(State)에 set
    fetchInitData();
  }, [])

  return (
    <>
      <h1>메인 페이지 입니다.</h1>
      <h3>{initData}</h3>
    </>
  );
}