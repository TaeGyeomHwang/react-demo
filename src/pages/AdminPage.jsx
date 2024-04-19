import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PAGE_403 } from "../constants/page_constant";
import Header from "../components/Header";

export default function AdminPage() {

  const navigate = useNavigate();

  useEffect(() => {
    const authority = localStorage.getItem("authority");
    if (authority !== "ROLE_ADMIN") {
      // 403 커스텀 페이지로 이동
      navigate(PAGE_403);
    }
  }, []);

  return (
    <>
    <Header/>
      <h1>어드민 메인 페이지 입니다.</h1>
    </>
  );
}