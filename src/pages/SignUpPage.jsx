import { useState } from "react";
import { TextField } from "../components/TextField";
import axios from "axios";
import { SIGN_UP_API } from "../constants/api_constant";
import { useNavigate } from "react-router-dom";
import{
  LOGIN
} from "../constants/page_constant";

export default function SignUpPage() {

  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const handleSignUp = async (e) => {
    e.preventDefault();

    try{
      const formData = new FormData;
      formData.append("id", id);
      formData.append("name", name);
      formData.append("password", password);

      const response = await axios.post(
          API_BASE_URL + SIGN_UP_API,
          formData
      )

      alert(response.data);
      // 로그인 페이지로 보내주기
      navigate(LOGIN);


    }catch(error){
      setError(error.response.data);
    }
  }

  return (
    <>
      <form onSubmit={handleSignUp}>
        <TextField
          label="아이디"
          type="text"
          name="id"
          required
          value={id}
          onChange={(e) => setID(e.target.value)}
        />
        <TextField
          label="이름"
          type="text"
          name="id"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="비밀번호"
          type="password"
          name="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button>회원가입</button>
      </form>
    </>
  )
}