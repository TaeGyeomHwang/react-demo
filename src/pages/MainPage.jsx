// import axios from "axios";
import { useEffect, useState } from "react";
import {
  MAIN_INIT_DATA_API
} from "../constants/api_constant";
import fetcher from "../fetcher";
import { Link } from "react-router-dom";
import { ADMIN_MAIN, USER_MAIN } from "../constants/page_constant";
import Header from "../components/Header";

export default function MainPage() {

  const [initData, setInitData] = useState("서버 통신 불가");

  // const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  //  최초에 실행할 함수
  // const fetchInitData = async () => {
  //   try{

  //     // 서버로부터 get 요청으로 데이터 받아옴
  //     const response = await axios.get(
  //       API_BASE_URL + MAIN_INIT_DATA_API
  //     )

  //     // 받아온 데이터를 사용해서 initData(State)값 변경
  //     setInitData(response.data);

  //   }catch(error){
  //     console.error("데이터 가져오기 오류", error);
  //   }
  // };

  const fetchInitData = async () => {
    try {
      const response = await fetcher.get(MAIN_INIT_DATA_API);
      setInitData(response.data);
    } catch (error) {
      console.error("데이터 가져오기 오류", error);
    }
  }

  useEffect(() => {
    // 서버로부터 받아온 데이터를 initData(State)에 set
    fetchInitData();
  }, [])

  return (
    <>
      <Header/>
      <h1>메인 페이지 입니다.</h1>
      <h3>{initData}</h3>
      <div><Link to={USER_MAIN}>유저 페이지로 이동</Link></div>
      <div><Link to={ADMIN_MAIN}>관리자 페이지로 이동</Link></div>
    </>
  );
}